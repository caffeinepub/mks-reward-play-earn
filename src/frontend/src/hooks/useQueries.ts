import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { LeaderboardEntry, LiveStatus, UserProfile } from "../backend";
import { useActor } from "./useActor";
import { useAuth } from "./useAuth";

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();
  const { gmail, isAuthenticated } = useAuth();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile", gmail],
    queryFn: async () => {
      if (!actor || !gmail) throw new Error("Actor or Gmail not available");
      return actor.getCallerUserProfile(gmail);
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!gmail,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && !!gmail && query.isFetched,
  };
}

export function useCreateUserProfile() {
  const { actor } = useActor();
  const { gmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      if (!actor || !gmail) throw new Error("Actor or Gmail not available");
      return actor.createUserProfile(gmail, name, email);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      toast.success("Profile created successfully! ✅");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create profile");
    },
  });
}

export function useWatchAd() {
  const { actor } = useActor();
  const { gmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor || !gmail) throw new Error("Actor or Gmail not available");
      const points = await actor.watchAd(gmail);
      const timestamp = BigInt(Date.now() * 1000000);
      await actor.submitAdWatchHistory(timestamp);
      return points;
    },
    onSuccess: (_points) => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["walletStats"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ad watching failed. Please try again.");
    },
  });
}

export function useGetLeaderboard() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LeaderboardEntry[]>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserLeaderboard();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContactForm(name, email, message);
    },
    onSuccess: () => {
      toast.success("Message sent successfully! We will reply soon. 📧");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to send message. Please try again.");
    },
  });
}

export function useClaimReferral() {
  const { actor } = useActor();
  const { gmail } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (referralCode: string) => {
      if (!actor || !gmail) throw new Error("Actor or Gmail not available");
      return actor.claimReferral(gmail, referralCode);
    },
    onSuccess: (_points) => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
      queryClient.invalidateQueries({ queryKey: ["walletStats"] });
      toast.success(
        `Referral claimed! +${_points.toString()} points earned! 🎁`,
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "Failed to claim referral. Please try again.",
      );
    },
  });
}

export function useGetWalletStats() {
  const { actor, isFetching: actorFetching } = useActor();
  const { gmail, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: ["walletStats", gmail],
    queryFn: async () => {
      if (!actor || !gmail) throw new Error("Actor or Gmail not available");
      return actor.getWalletStats(gmail);
    },
    enabled: !!actor && !actorFetching && isAuthenticated && !!gmail,
  });
}

export function useGetLiveStatus() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<LiveStatus>({
    queryKey: ["liveStatus"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getLiveStatus();
    },
    enabled: !!actor && !actorFetching,
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });
}
