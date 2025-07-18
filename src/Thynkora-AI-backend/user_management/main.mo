import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Result "mo:base/Result";

actor UserManagement {
    
    type UserId = Principal;
    type Profile = {
        id: UserId;
        createdAt: Int;
        language: Text;
        timezone: Text;
        isAnonymous: Bool;
        emergencyContact: ?Text;
    };
    
    private stable var userEntries : [(UserId, Profile)] = [];
    private var users = HashMap.HashMap<UserId, Profile>(0, Principal.equal, Principal.hash);
    
    system func preupgrade() {
        userEntries := users.entries() |> Iter.toArray(_);
    };
    
    system func postupgrade() {
        users := HashMap.fromIter<UserId, Profile>(userEntries.vals(), userEntries.size(), Principal.equal, Principal.hash);
        userEntries := [];
    };
    
    public shared(msg) func createProfile(language: Text, timezone: Text, emergencyContact: ?Text) : async Result.Result<Profile, Text> {
        let userId = msg.caller;
        
        switch (users.get(userId)) {
            case (?existing) { #err("Profile already exists") };
            case null {
                let profile: Profile = {
                    id = userId;
                    createdAt = Time.now();
                    language = language;
                    timezone = timezone;
                    isAnonymous = true;
                    emergencyContact = emergencyContact;
                };
                users.put(userId, profile);
                #ok(profile)
            };
        };
    };
    
    public shared query(msg) func getProfile() : async ?Profile {
        users.get(msg.caller)
    };
    
    public shared(msg) func updateProfile(language: ?Text, timezone: ?Text, emergencyContact: ?Text) : async Result.Result<Profile, Text> {
        let userId = msg.caller;
        
        switch (users.get(userId)) {
            case null { #err("Profile not found") };
            case (?existing) {
                let updated: Profile = {
                    id = existing.id;
                    createdAt = existing.createdAt;
                    language = switch(language) { case (?l) l; case null existing.language };
                    timezone = switch(timezone) { case (?t) t; case null existing.timezone };
                    isAnonymous = existing.isAnonymous;
                    emergencyContact = switch(emergencyContact) { case (?e) ?e; case null existing.emergencyContact };
                };
                users.put(userId, updated);
                #ok(updated)
            };
        };
    };
}
2.2 AI Therapy Canister (Motoko)
// src/backend/ai_therapy/main.mo
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";

actor AITherapy {
    
    type Message = {
        id: Nat;
        userId: Principal;
        content: Text;
        isUser: Bool;
        timestamp: Int;
        riskLevel: ?Nat; // 1-10 scale
        supportActions: [Text];
    };
    
    type TherapySession = {
        userId: Principal;
        messages: [Message];
        startTime: Int;
        lastActivity: Int;
        sessionId: Text;
    };
    
    private stable var messageCounter: Nat = 0;
    private var sessions = Buffer.Buffer<TherapySession>(0);
    
    // HTTP Outcall types for OpenAI integration
    type HttpRequest = {
        url: Text;
        method: Text;
        body: [Nat8];
        headers: [Text];
    };
    
    type HttpResponse = {
        body: [Nat8];
        headers: [Text];
        status: Nat;
    };
    
    public shared(msg) func startSession() : async Result.Result<Text, Text> {
        let userId = msg.caller;
        let sessionId = Principal.toText(userId) # "-" # Int.toText(Time.now());
        
        let session: TherapySession = {
            userId = userId;
            messages = [];
            startTime = Time.now();
            lastActivity = Time.now();
            sessionId = sessionId;
        };
        
        sessions.add(session);
        #ok(sessionId)
    };
    
    public shared(msg) func sendMessage(sessionId: Text, content: Text) : async Result.Result<Message, Text> {
        let userId = msg.caller;
        
        // Create user message
        messageCounter += 1;
        let userMessage: Message = {
            id = messageCounter;
            userId = userId;
            content = content;
            isUser = true;
            timestamp = Time.now();
            riskLevel = null;
            supportActions = [];
        };
        
        // Analyze risk level
        let riskLevel = await analyzeRiskLevel(content);
        
        // Generate AI response
        let aiResponse = await generateAIResponse(content, riskLevel);
        
        messageCounter += 1;
        let aiMessage: Message = {
            id = messageCounter;
            userId = userId;
            content = aiResponse.content;
            isUser = false;
            timestamp = Time.now();
            riskLevel = ?riskLevel;
            supportActions = aiResponse.supportActions;
        };
        
        // Update session (simplified for demo)
        // In production, you'd update the specific session
        
        #ok(aiMessage)
    };
    
    private func analyzeRiskLevel(content: Text) : async Nat {
        // Simple keyword-based risk analysis
        let riskKeywords = ["suicide", "kill myself", "end it all", "hopeless", "can't go on"];
        let lowerContent = Text.map(content, func(c: Char) : Char {
            if (c >= 'A' and c <= 'Z') {
                Char.fromNat32(Char.toNat32(c) + 32)
            } else { c }
        });
        
        var risk = 1;
        for (keyword in riskKeywords.vals()) {
            if (Text.contains(lowerContent, #text keyword)) {
                risk := 9; // High risk
            };
        };
        
        risk
    };
    
    private func generateAIResponse(content: Text, riskLevel: Nat) : async {content: Text; supportActions: [Text]} {
        // In production, this would make HTTP outcalls to OpenAI
        // For demo purposes, we'll use rule-based responses
        
        if (riskLevel >= 7) {
            {
                content = "I'm really concerned about what you're going through. You're not alone, and there are people who want to help. Would you like me to connect you with a crisis counselor?";
                supportActions = ["crisis_hotline", "emergency_contact", "breathing_exercise"];
            }
        } else if (riskLevel >= 4) {
            {
                content = "It sounds like you're having a tough time. That's completely understandable. Let's work through this together. What's one small thing that usually helps you feel a bit better?";
                supportActions = ["coping_strategies", "mindfulness_exercise", "journal_prompt"];
            }
        } else {
            {
                content = "Thank you for sharing that with me. I'm here to listen and support you. How are you feeling right now?";
                supportActions = ["active_listening", "emotional_validation"];
            }
        }
    };
    
    // Emergency response trigger
    public shared(msg) func triggerEmergencyResponse(sessionId: Text) : async Result.Result<Text, Text> {
        let userId = msg.caller;
        // This would integrate with emergency response canister
        #ok("Emergency response initiated")
    };
}
