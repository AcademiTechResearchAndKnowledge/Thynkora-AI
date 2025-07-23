
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import List "mo:base/List";
import Time "mo:base/Time";

actor WellMindAI {

  type Mood = {
    #Happy;
    #Sad;
    #Angry;
    #Anxious;
    #Depressed;
    #Neutral
  };

  type JournalEntry = {
    timestamp : Time.Time;
    content : Text;
    mood : Mood;
    dangerTag : Bool;
  };

  stable var entries : List.List<JournalEntry> = List.nil<JournalEntry>();

  public func addEntry(content : Text) : async Text {
    let mood = detectMood(content);
    let danger = isAtRisk(content);

    let entry : JournalEntry = {
      timestamp = Time.now();
      content = content;
      mood = mood;
      dangerTag = danger;
    };

    entries := List.push(entry, entries);
    return "Entry added with mood: " # debug_show(mood) # ", danger: " # debug_show(danger);
  };

  public func getEntries() : async [JournalEntry] {
    return List.toArray(entries);
  };

  // Naive mood detection
  func detectMood(text : Text) : Mood {
    if (Text.contains(text, #text "sad") or Text.contains(text, #text "depressed")) {
      #Depressed
    } else if (Text.contains(text, #text "angry") or Text.contains(text, #text "mad")) {
      #Angry
    } else if (Text.contains(text, #text "anxious") or Text.contains(text, #text "worried")) {
      #Anxious
    } else if (Text.contains(text, #text "happy") or Text.contains(text, #text "grateful")) {
      #Happy
    } else {
      #Neutral
    }
  };

  // Danger detection based on keywords
  func isAtRisk(text : Text) : Bool {
    Text.contains(text, #text "end it all") or Text.contains(text, #text "suicide") or Text.contains(text, #text "kill myself")
  };
};
