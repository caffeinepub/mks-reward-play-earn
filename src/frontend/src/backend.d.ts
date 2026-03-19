import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LeaderboardEntry {
    name: string;
    rank: Rank;
    points: bigint;
}
export type Time = bigint;
export type Rank = bigint | null;
export interface UserProfile {
    walletPoints: bigint;
    referralCode: string;
    successfulReferrals: bigint;
    name: string;
    lastLeaderboardTimestamp: Time;
    email: string;
    totalAdsWatched: bigint;
}
export interface LiveStatus {
    adSystem: string;
    referralSystem: string;
    leaderboard: string;
    backendConnection: string;
    authenticationSystem: string;
    overallStatus: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkEmailRegistered(gmail: string): Promise<boolean>;
    claimReferral(gmail: string, referralCode: string): Promise<bigint>;
    createGmailAccount(gmail: string, password: string): Promise<void>;
    createUserProfile(gmail: string, name: string, email: string): Promise<void>;
    getCallerUserProfile(gmail: string): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLiveStatus(): Promise<LiveStatus>;
    getMiscStats(): Promise<{
        adWatchCount: bigint;
    }>;
    getUserLeaderboard(): Promise<Array<LeaderboardEntry>>;
    getUserProfile(user: Principal, gmail: string): Promise<UserProfile | null>;
    getWalletStats(gmail: string): Promise<{
        walletPoints: bigint;
        successfulReferrals: bigint;
        totalAdsWatched: bigint;
    }>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(gmail: string, userProfile: UserProfile): Promise<void>;
    submitAdWatchHistory(completionTime: Time): Promise<boolean>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    updateUserProfile(gmail: string, name: string, email: string): Promise<void>;
    verifyGmailPassword(gmail: string, password: string): Promise<boolean>;
    watchAd(gmail: string): Promise<bigint>;
}
