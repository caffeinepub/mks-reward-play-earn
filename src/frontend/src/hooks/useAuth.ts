import { useState } from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useActor } from "./useActor";

// Internal token — never shown to user
const INTERNAL_TOKEN = "mks_secure_2025";

interface AuthState {
  gmail: string | null;
  isAuthenticated: boolean;
  setAuth: (gmail: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      gmail: null,
      isAuthenticated: false,
      setAuth: (gmail: string) => set({ gmail, isAuthenticated: true }),
      clearAuth: () => set({ gmail: null, isAuthenticated: false }),
    }),
    {
      name: "mks-auth-storage",
    },
  ),
);

export function useAuth() {
  const { gmail, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const { actor } = useActor();
  const [isLoading, setIsLoading] = useState(false);

  // Gmail-only login: auto create account if not exists, then log in
  const loginWithGmail = async (email: string) => {
    if (!actor) {
      toast.error("System not ready. Please try again.");
      return;
    }

    setIsLoading(true);
    try {
      const exists = await actor.checkEmailRegistered(email);

      if (!exists) {
        // Auto-create account
        await actor.createGmailAccount(email, INTERNAL_TOKEN);
      }

      // Log in
      const verified = await actor.verifyGmailPassword(email, INTERNAL_TOKEN);
      if (verified) {
        setAuth(email);
        toast.success("Welcome to MKS Reward! 🎮");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    toast.success("Logged out successfully. See you soon! 👋");
  };

  return {
    gmail,
    isAuthenticated,
    isLoading,
    loginWithGmail,
    logout,
  };
}
