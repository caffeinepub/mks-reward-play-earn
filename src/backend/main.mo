import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Set "mo:core/Set";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";



actor {
  public type Rank = ?Int;

  module UserProfile {
    public func compare(a : UserProfile, b : UserProfile) : Order.Order {
      Int.compare(b.walletPoints, a.walletPoints);
    };
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    walletPoints : Int;
    totalAdsWatched : Int;
    referralCode : Text;
    successfulReferrals : Int;
    lastLeaderboardTimestamp : Time.Time;
  };

  public type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  public type AdWatchHistory = {
    user : Principal;
    timestamp : Time.Time;
  };

  public type LeaderboardEntry = {
    rank : Rank;
    name : Text;
    points : Int;
  };

  public type Referral = {
    referrer : Principal;
    referred : Principal;
  };

  public type AccountData = {
    gmail : Text;
    password : Text;
    userProfile : ?UserProfile;
  };

  // Live status record type for backend response
  public type LiveStatus = {
    authenticationSystem : Text;
    adSystem : Text;
    leaderboard : Text;
    referralSystem : Text;
    backendConnection : Text;
    overallStatus : Text;
  };

  // State variables
  let accounts = Map.empty<Text, AccountData>();
  let principalToGmail = Map.empty<Principal, Text>();

  let referrals = List.empty<Referral>();
  let contactMessages = List.empty<ContactMessage>();
  let adWatchHistory = List.empty<AdWatchHistory>();

  let currentLeaderboard = List.empty<LeaderboardEntry>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  func generateReferralCode(name : Text) : Text {
    let timestamp = Time.now().toText();
    timestamp.concat(name);
  };

  func calculatePointsBasedOnTime() : Int {
    let fullDayPoints = 100;
    let currentTime = Time.now();
    let _startOfDay = currentTime / (24 * 60 * 60 * 1000) * (24 * 60 * 60 * 1000); // Currently unused
    let elapsedTime = currentTime;
    let bonusHours = 6 * 60 * 60 * 1000000;
    let bonusPoints = 25;
    let normalPoints = if (elapsedTime <= bonusHours) {
      fullDayPoints + bonusPoints;
    } else {
      fullDayPoints;
    };
    normalPoints;
  };

  func verifyGmailOwnership(caller : Principal, gmail : Text) : Bool {
    switch (principalToGmail.get(caller)) {
      case (?userGmail) { userGmail == gmail };
      case (null) { false };
    };
  };

  public shared ({ caller }) func createGmailAccount(gmail : Text, password : Text) : async () {
    // Open to all - anyone can create an account
    if (accounts.containsKey(gmail)) {
      Runtime.trap("An account with this Gmail already exists");
    };

    let accountData = {
      gmail;
      password;
      userProfile = null;
    };

    accounts.add(gmail, accountData);
    principalToGmail.add(caller, gmail);

    // Assign user role upon account creation
    AccessControl.assignRole(accessControlState, caller, caller, #user);
  };

  public shared ({ caller }) func verifyGmailPassword(gmail : Text, password : Text) : async Bool {
    // Open to all - needed for login
    switch (accounts.get(gmail)) {
      case (?account) {
        if (account.password != password) {
          Runtime.trap("Wrong credentials!");
        };
        // Link this principal to the gmail if not already linked
        switch (principalToGmail.get(caller)) {
          case (null) {
            principalToGmail.add(caller, gmail);
            AccessControl.assignRole(accessControlState, caller, caller, #user);
          };
          case (?existingGmail) {
            if (existingGmail != gmail) {
              Runtime.trap("Principal already linked to different account");
            };
          };
        };
        true;
      };
      case (null) { false };
    };
  };

  public query ({ caller }) func getCallerUserProfile(gmail : Text) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };

    if (not verifyGmailOwnership(caller, gmail) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only access your own profile");
    };

    switch (accounts.get(gmail)) {
      case (?account) { account.userProfile };
      case (null) { null };
    };
  };

  public query ({ caller }) func getUserProfile(user : Principal, gmail : Text) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can access profiles");
    };

    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    switch (accounts.get(gmail)) {
      case (?account) { account.userProfile };
      case (null) { null };
    };
  };

  func replaceUserProfile(account : AccountData, newUserProfile : UserProfile) {
    let newAccount = { account with userProfile = ?newUserProfile };
    accounts.add(account.gmail, newAccount);
  };

  public shared ({ caller }) func saveCallerUserProfile(gmail : Text, userProfile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can save profiles");
    };

    if (not verifyGmailOwnership(caller, gmail)) {
      Runtime.trap("Unauthorized: Can only save your own profile");
    };

    switch (accounts.get(gmail)) {
      case (?account) { replaceUserProfile(account, userProfile) };
      case (null) { Runtime.trap("Account not found") };
    };
  };

  public shared ({ caller }) func createUserProfile(gmail : Text, name : Text, email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can create profiles");
    };

    if (not verifyGmailOwnership(caller, gmail)) {
      Runtime.trap("Unauthorized: Can only create your own profile");
    };

    switch (accounts.get(gmail)) {
      case (?account) {
        switch (account.userProfile) {
          case (null) {
            let userProfile = {
              name;
              email;
              walletPoints = 0;
              totalAdsWatched = 0;
              referralCode = generateReferralCode(name);
              successfulReferrals = 0;
              lastLeaderboardTimestamp = Time.now();
            };
            replaceUserProfile(account, userProfile);
          };
          case (?_) { Runtime.trap("User already exists! Use updateUserProfile() instead") };
        };
      };
      case (null) { Runtime.trap("Account does not exist! Use createGmailAccount() instead") };
    };
  };

  public shared ({ caller }) func updateUserProfile(gmail : Text, name : Text, email : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can update profiles");
    };

    if (not verifyGmailOwnership(caller, gmail)) {
      Runtime.trap("Unauthorized: Can only update your own profile");
    };

    switch (accounts.get(gmail)) {
      case (?account) {
        switch (account.userProfile) {
          case (?profile) {
            let updatedProfile = {
              profile with
              name;
              email;
            };
            replaceUserProfile(account, updatedProfile);
          };
          case (null) {
            Runtime.trap("User does not exist! Use createUserProfile() instead");
          };
        };
      };
      case (null) {
        Runtime.trap("Account does not exist! Use createGmailAccount() instead");
      };
    };
  };

  public shared ({ caller }) func watchAd(gmail : Text) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can watch ads");
    };

    if (not verifyGmailOwnership(caller, gmail)) {
      Runtime.trap("Unauthorized: Can only watch ads for your own account");
    };

    let rewardPoints = calculatePointsBasedOnTime();
    switch (accounts.get(gmail)) {
      case (?account) {
        switch (account.userProfile) {
          case (?profile) {
            let updatedProfile = {
              profile with
              walletPoints = profile.walletPoints + rewardPoints;
              totalAdsWatched = profile.totalAdsWatched + 1;
            };
            replaceUserProfile(account, updatedProfile);
            rewardPoints;
          };
          case (null) {
            Runtime.trap("Must have an account to watch and earn rewards");
          };
        };
      };
      case (null) { Runtime.trap("Invalid account") };
    };
  };

  public shared ({ caller }) func claimReferral(gmail : Text, referralCode : Text) : async Int {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can claim referrals");
    };

    if (not verifyGmailOwnership(caller, gmail)) {
      Runtime.trap("Unauthorized: Can only claim referrals for your own account");
    };

    let referralRewardPoints = 1000;

    switch (accounts.get(gmail)) {
      case (?account) {
        switch (account.userProfile) {
          case (?profile) {
            let updatedProfile = {
              profile with
              walletPoints = profile.walletPoints + referralRewardPoints;
            };
            replaceUserProfile(account, updatedProfile);
          };
          case (null) {
            let emptyProfile = {
              name = "";
              email = "";
              walletPoints = 0;
              totalAdsWatched = 0;
              referralCode = "";
              successfulReferrals = 0;
              lastLeaderboardTimestamp = 0;
            };
            replaceUserProfile(account, emptyProfile);
          };
        };
      };
      case (null) {
        Runtime.trap("Account does not exist! Use createGmailAccount() instead");
      };
    };
    referralRewardPoints;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async () {
    // No authorization check - open to all including guests
    let newRelation : ContactMessage = {
      name;
      email;
      message;
    };

    contactMessages.add(newRelation);
  };

  public shared ({ caller }) func submitAdWatchHistory(completionTime : Time.Time) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can submit ad watch history");
    };

    adWatchHistory.add({
      user = caller;
      timestamp = completionTime;
    });
    true;
  };

  public query ({ caller }) func getUserLeaderboard() : async [LeaderboardEntry] {
    // No authorization check - open to all users including guests
    let entries = currentLeaderboard.values().toArray();
    entries;
  };

  public query ({ caller }) func getWalletStats(gmail : Text) : async {
    walletPoints : Int;
    totalAdsWatched : Int;
    successfulReferrals : Int;
  } {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view wallet stats");
    };

    if (not verifyGmailOwnership(caller, gmail) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own wallet stats");
    };

    switch (accounts.get(gmail)) {
      case (null) {
        { walletPoints = 0; totalAdsWatched = 0; successfulReferrals = 0 };
      };
      case (?account) {
        switch (account.userProfile) {
          case (null) {
            {
              walletPoints = 0;
              totalAdsWatched = 0;
              successfulReferrals = 0;
            };
          };
          case (?profile) {
            {
              walletPoints = profile.walletPoints;
              totalAdsWatched = profile.totalAdsWatched;
              successfulReferrals = profile.successfulReferrals;
            };
          };
        };
      };
    };
  };

  public query ({ caller }) func getMiscStats() : async { adWatchCount : Int } {
    // No authorization check - open to all users including guests
    { adWatchCount = adWatchHistory.size() };
  };

  public query ({ caller }) func checkEmailRegistered(gmail : Text) : async Bool {
    // No authorization check - needed for registration flow
    accounts.containsKey(gmail);
  };

  public query ({ caller }) func getLiveStatus() : async LiveStatus {
    // No authorization check - open to all users including guests
    {
      authenticationSystem = "ACTIVE_उत्कृष्ट";
      adSystem = "ACTIVE_उत्कृष्ट";
      leaderboard = "ACTIVE_उत्कृष्ट";
      referralSystem = "ACTIVE_उत्कृष्ट";
      backendConnection = "ACTIVE_उत्कृष्ट";
      overallStatus = "ACTIVE_उत्कृष्ट";
    };
  };
};
