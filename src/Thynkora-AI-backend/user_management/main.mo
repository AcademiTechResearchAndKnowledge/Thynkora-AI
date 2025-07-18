import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Iter "mo:base/Iter";


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
