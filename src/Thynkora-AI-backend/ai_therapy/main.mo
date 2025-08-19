import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Int "mo:base/Int";
import Char "mo:base/Char";
import Blob "mo:base/Blob";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Debug "mo:base/Debug";
import Cycles "mo:base/ExperimentalCycles";

// ---- Management canister HTTP types (per IC interface spec) ----
// https://internetcomputer.org/docs/building-apps/network-features/using-http/https-outcalls/overview
module {
  public type HttpHeader = { name : Text; value : Text };
  public type HttpMethod = { #get; #head; #post };
  public type HttpRequestArgs = {
    url : Text;
    max_response_bytes : ?Nat64;
    headers : [HttpHeader];
    body : ?Blob;
    method : HttpMethod;
    transform : ?{
      function : shared query (args : { context : Blob; response : HttpResponse }) -> async HttpResponse;
      context : Blob;
    };
  };
  public type HttpResponse = { status : Nat; headers : [HttpHeader]; body : Blob };
};

// Bind the IC management canister
let IC : actor {
  http_request : (HttpRequestArgs) -> async HttpResponse;
} = actor ("aaaaa-aa");

// =====================  AITherapy (actor class captures owner) =====================
shared ({ caller }) actor class AITherapy() = this {

  // ===== Your types =====
  public type Message = {
    id: Nat;
    userId: Principal;
    content: Text;
    isUser: Bool;
    timestamp: Int;
    riskLevel: ?Nat; // 1-10 scale
    supportActions: [Text];
  };

  public type TherapySession = {
    userId: Principal;
    messages: [Message];
    startTime: Int;
    lastActivity: Int;
    sessionId: Text;
  };

  // ===== State =====
  private stable var messageCounter : Nat = 0;
  private var sessions = Buffer.Buffer<TherapySession>(0);

  // Owner (deployer) may set API key and options
  private stable var owner : Principal = caller;

  // ⚠️ Storing keys on-chain is not fully secure. Use at your own risk.
  private stable var openAIKey : Text = "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";
  private stable var openAIModel : Text = "gpt-4o-mini"; // change if you prefer another model
  private stable var openAIURL  : Text = "https://api.openai.com/v1/chat/completions";

  // Tune this after measuring. Excess cycles are refunded by the IC.
  // https://internetcomputer.org/docs/building-apps/network-features/using-http/https-outcalls/overview
  private stable var HTTPS_OUTCALL_CYCLES : Nat = 250_000_000_000;

  // ====== Admin methods (lock these down in production) ======
  public shared (msg) func setOpenAIKey(key : Text) : async Result.Result<(), Text> {
    if (msg.caller != owner) return #err("unauthorized");
    openAIKey := key;
    #ok(())
  };

  public shared (msg) func setModel(model : Text) : async Result.Result<(), Text> {
    if (msg.caller != owner) return #err("unauthorized");
    openAIModel := model;
    #ok(())
  };

  public shared (msg) func setOutcallCycles(cycles : Nat) : async Result.Result<(), Text> {
    if (msg.caller != owner) return #err("unauthorized");
    HTTPS_OUTCALL_CYCLES := cycles;
    #ok(())
  };

  // ====== Transform: normalize/strip headers to keep replicas in consensus ======
  public query func transform(args : { context : Blob; response : HttpResponse }) : async HttpResponse {
    // Just pass through body & status; drop headers entirely
    { status = args.response.status; headers = []; body = args.response.body }
  };

  // ====== Session APIs ======
  public shared (msg) func startSession() : async Result.Result<Text, Text> {
    let userId = msg.caller;
    let sessionId = Principal.toText(userId) # "-" # Int.toText(Time.now());
    let session : TherapySession = {
      userId = userId;
      messages = [];
      startTime = Time.now();
      lastActivity = Time.now();
      sessionId = sessionId;
    };
    sessions.add(session);
    #ok(sessionId)
  };

  public shared (msg) func sendMessage(_sessionId : Text, _content : Text) : async Result.Result<Message, Text> {
    if (openAIKey == "") return #err("OpenAI key not set");

    let userId = msg.caller;
    let content = _content;

    // Append user msg
    messageCounter += 1;
    let userMessage : Message = {
      id = messageCounter;
      userId = userId;
      content = content;
      isUser = true;
      timestamp = Time.now();
      riskLevel = null;
      supportActions = [];
    };

    // Risk heuristic
    let riskLevel = await analyzeRiskLevel(content);

    // Call OpenAI directly
    let aiResponse = await generateAIResponse(content, riskLevel);

    messageCounter += 1;
    let aiMessage : Message = {
      id = messageCounter;
      userId = userId;
      content = aiResponse.content;
      isUser = false;
      timestamp = Time.now();
      riskLevel = ?riskLevel;
      supportActions = aiResponse.supportActions;
    };

    // Store into session
    for (i in Iter.range(0, sessions.size() - 1)) {
      let s = sessions.get(i);
      if (s.sessionId == _sessionId and s.userId == userId) {
        let updated : TherapySession = {
          userId = s.userId;
          messages = Array.append<Message>(s.messages, [userMessage, aiMessage]);
          startTime = s.startTime;
          lastActivity = Time.now();
          sessionId = s.sessionId;
        };
        sessions.put(i, updated);
      };
    };

    #ok(aiMessage)
  };

  // ====== Risk heuristic ======
  private func analyzeRiskLevel(_content: Text) : async Nat {
    let riskKeywords = ["suicide", "kill myself", "end it all", "hopeless", "can't go on"];
    let lowerContent = Text.map(_content, func(c: Char) : Char {
      if (c >= 'A' and c <= 'Z') { Char.fromNat32(Char.toNat32(c) + 32) } else { c }
    });

    var risk : Nat = 1;
    for (keyword in riskKeywords.vals()) {
      if (Text.contains(lowerContent, #text keyword)) { risk := 9 };
    };
    risk
  };

  // ====== OpenAI call (direct HTTPS outcall) ======
  private func generateAIResponse(userText: Text, riskLevel: Nat) : async { content: Text; supportActions: [Text] } {
    // Compose messages as per OpenAI Chat Completions API
    // https://platform.openai.com/docs/api-reference/introduction
    // https://platform.openai.com/docs/guides/text
    let systemPrompt =
      "You are a supportive, empathetic mental health companion. " #
      "Be warm, validating, and practical. Do not diagnose. " #
      "If user seems in immediate danger, encourage contacting local emergency services or crisis hotlines. " #
      "Keep replies concise and actionable.";
    let riskLine = " User risk level (1-10): " # Nat.toText(riskLevel) # " (do not show numeric score to user).";

    let jsonBody =
      "{"
        # "\"model\":\"" # openAIModel # "\","
        # "\"messages\":["
          # "{\"role\":\"system\",\"content\":" # toJsonString(systemPrompt # riskLine) # "},"
          # "{\n\"role\":\"user\",\n\"content\":" # toJsonString(userText) # "\n}"
        # "]"
      # "}";

    let headers : [HttpHeader] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer " # openAIKey }
    ];

    let req : HttpRequestArgs = {
      url = openAIURL;
      max_response_bytes = null; // or ?(2_000_000 : Nat64) if you want a cap
      headers = headers;
      body = ?Text.encodeUtf8(jsonBody);
      method = #post;
      transform = ?{ function = transform; context = Blob.fromArray([]) };
    };

    // Attach cycles (excess refunded). Start high; tune down later.
    // https://internetcomputer.org/docs/building-apps/network-features/using-http/https-outcalls/overview
    Cycles.add<system>(HTTPS_OUTCALL_CYCLES);

    let resp = await IC.http_request(req);

    if (resp.status >= 200 and resp.status < 300) {
      let bodyText = switch (Text.decodeUtf8(resp.body)) { case (?t) t; case null "" };

      // Parse the assistant text out of the JSON the simplest possible way (string search)
      // For production, consider a tiny JSON parser, but keep it small to save cycles.
      let extracted = extractAssistantContent(bodyText);

      if (riskLevel >= 7) {
        { content = extracted; supportActions = ["crisis_hotline", "emergency_contact", "breathing_exercise"] }
      } else if (riskLevel >= 4) {
        { content = extracted; supportActions = ["coping_strategies", "mindfulness_exercise", "journal_prompt"] }
      } else {
        { content = extracted; supportActions = ["active_listening", "emotional_validation"] }
      }
    } else {
      Debug.print("OpenAI HTTP error status=" # Nat.toText(resp.status));
      {
        content = "Sorry, I couldn’t reach the assistant right now.";
        supportActions = [];
      }
    }
  };

  // --- minimal JSON string escaper ---
  private func toJsonString(t: Text) : Text {
    var out = "";
    for (c in t.chars()) {
      switch c {
        case ('\\') { out #= "\\\\" };
        case ('"')  { out #= "\\\"" };
        case ('\n') { out #= "\\n" };
        case ('\r') { out #= "\\r" };
        case ('\t') { out #= "\\t" };
        case (_)    { out #= Text.fromChar(c) };
      }
    };
    "\"" # out # "\""
  };

  // --- naive extractor for choices[0].message.content from OpenAI response ---
  // Expected shape per docs: { choices: [ { message: { role, content } } ] }
  // https://platform.openai.com/docs/api-reference/introduction
  private func extractAssistantContent(json: Text) : Text {
    // This is a very naïve string search to keep code size/cycles low.
    // It assumes that `"content":"...text..."` appears and quotes are escaped normally.
    let needle = "\"content\":";
    let startIx = Text.find(json, #text needle);
    switch (startIx) {
      case null { return "I'm here with you."; };
      case (?ix) {
        let after = Text.substr(json, ix + Text.size(needle));
        // after starts with (probably) a quote
        // find the first quote and the closing quote while handling simple escapes
        var i : Nat = 0;
        let n = Text.size(after);
        // skip whitespace
        label skip while (i < n) {
          let ch = Text.substr(after, i, 1);
          if (ch == " " or ch == "\n" or ch == "\r" or ch == "\t") { i += 1 } else { break skip };
        };
        if (i >= n or Text.substr(after, i, 1) != "\"") { return "I'm here with you."; };
        i += 1; // skip opening quote
        var out = "";
        var escaped = false;
        while (i < n) {
          let ch = Text.substr(after, i, 1);
          if (escaped) {
            // keep simple escapes
            out #= ch;
            escaped := false;
          } else {
            if (ch == "\\") { escaped := true }
            else if (ch == "\"") { break }
            else { out #= ch };
          };
          i += 1;
        };
        return out;
      };
    };
  };

  // ===== Emergency response =====
  public shared(msg) func triggerEmergencyResponse(_sessionId: Text) : async Result.Result<Text, Text> {
    let _userId = msg.caller;
    #ok("Emergency response initiated")
  };
}
