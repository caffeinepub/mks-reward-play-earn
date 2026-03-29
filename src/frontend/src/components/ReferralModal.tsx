import { Copy, Gift, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import AdBanner from "./AdBanner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ReferralModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReferralModal({
  open,
  onOpenChange,
}: ReferralModalProps) {
  const { data: userProfile } = useGetCallerUserProfile();
  const [_copied, setCopied] = useState(false);

  const referralCode = userProfile?.referralCode || "LOADING...";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    toast.success("Referral code copied! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "MKS Reward - Play & Earn",
        text: `Join MKS Reward and start earning! Use my referral code: ${referralCode}`,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-navy/95 backdrop-blur-md border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Refer &amp; Earn 🎁
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan/20 to-cyan/5 rounded-lg p-6 border border-cyan/30">
            <div className="flex items-center gap-3 mb-4">
              <Gift className="w-8 h-8 text-cyan" />
              <div>
                <h3 className="text-white font-bold">Referral Bonus</h3>
                <p className="text-white/70 text-sm">
                  Earn 1000 points per successful referral!
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-cyan">
                {userProfile?.successfulReferrals.toString() || "0"}
              </p>
              <p className="text-white/70 text-sm mt-1">Successful Referrals</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Your Referral Code</Label>
            <div className="flex gap-2">
              <Input
                value={referralCode}
                readOnly
                className="bg-white/10 border-white/20 text-white font-mono text-lg"
              />
              <Button
                onClick={handleCopy}
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button
            onClick={handleShare}
            className="w-full bg-gradient-to-r from-cyan to-cyan/80 hover:from-cyan/90 hover:to-cyan/70 text-navy font-bold"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share with Friends
          </Button>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-white font-bold mb-2">How it works?</h4>
            <ol className="text-white/70 text-sm space-y-1 list-decimal list-inside">
              <li>Share your referral code with friends</li>
              <li>When they sign up, you get bonus points</li>
              <li>More referrals, more points!</li>
            </ol>
          </div>

          <div className="pt-4">
            <AdBanner />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
