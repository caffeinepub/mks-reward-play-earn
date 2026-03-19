import { useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout();
    queryClient.clear();
  };

  return (
    <header className="bg-navy/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/mks-reward-logo.dim_400x400.png"
            alt="MKS Reward"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-white">MKS Reward</h1>
            <p className="text-xs text-cyan">Play & Earn</p>
          </div>
        </div>

        {isAuthenticated && (
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </header>
  );
}
