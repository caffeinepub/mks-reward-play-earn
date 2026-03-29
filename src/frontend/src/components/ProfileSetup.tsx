import { useState } from "react";
import { useCreateUserProfile } from "../hooks/useQueries";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ProfileSetup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const createProfile = useCreateUserProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      createProfile.mutate({ name: name.trim(), email: email.trim() });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c] p-4">
      <Card className="w-full max-w-md bg-navy/80 backdrop-blur-md border-white/20">
        <CardHeader className="text-center">
          <img
            src="/assets/generated/mks-reward-logo.dim_400x400.png"
            alt="MKS Reward"
            className="w-32 h-32 mx-auto mb-4"
          />
          <CardTitle className="text-2xl text-white">
            Welcome to MKS Reward! 🎉
          </CardTitle>
          <p className="text-white/70 mt-2">
            Set up your profile and start earning
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-white">
                Your Name
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Button
              type="submit"
              disabled={createProfile.isPending}
              className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-navy font-bold"
            >
              {createProfile.isPending ? "Setting up..." : "Start Earning 🚀"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
