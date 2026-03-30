import { Mail, Zap } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../hooks/useAuth";

export default function AuthPage() {
  const [gmail, setGmail] = useState("");
  const { loginWithGmail, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithGmail(gmail.trim().toLowerCase());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c] p-4">
      <Card className="w-full max-w-md bg-[#0f2847] border-white/20 shadow-2xl">
        <CardHeader className="text-center pb-2">
          <img
            src="/assets/generated/mks-reward-logo.dim_400x400.png"
            alt="MKS Rewards"
            className="w-28 h-28 mx-auto mb-3"
          />
          <CardTitle className="text-3xl text-white mb-1">
            MKS Rewards
          </CardTitle>
          <p className="text-cyan-400 text-lg font-medium">Play & Earn 🎮💰</p>
          <p className="text-white/60 mt-2 text-sm">
            Enter your Gmail to continue
          </p>
        </CardHeader>

        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label
                htmlFor="gmail"
                className="text-white flex items-center gap-2 mb-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                Gmail Address
              </Label>
              <Input
                id="gmail"
                data-ocid="auth.input"
                type="email"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                placeholder="your@gmail.com"
                required
                autoComplete="email"
                inputMode="email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-yellow-400 focus:ring-yellow-400 h-12 text-base"
                style={{ touchAction: "manipulation" }}
              />
            </div>

            <Button
              type="submit"
              data-ocid="auth.submit_button"
              disabled={isLoading || !gmail.trim()}
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg h-12 disabled:opacity-50 transition-all"
              style={{ touchAction: "manipulation" }}
            >
              {isLoading ? (
                "Connecting..."
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Enter App
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-white/40 text-xs">
            🔒 Your Gmail is safe & encrypted
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
