import { CheckCircle, Coins, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useWatchAd } from "../hooks/useQueries";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Progress } from "./ui/progress";

// AdMob Configuration
const _ADMOB_APP_ID = "ca-app-pub-4734392712984503~3542272991";
const _REWARDED_AD_UNIT_ID = "ca-app-pub-4734392712984503/9742721395";

interface WatchAdModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function WatchAdModal({
  open,
  onOpenChange,
}: WatchAdModalProps) {
  const [isWatching, setIsWatching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showRewardAnimation, setShowRewardAnimation] = useState(false);
  const watchAd = useWatchAd();

  useEffect(() => {
    if (!open) {
      setIsWatching(false);
      setProgress(0);
      setCompleted(false);
      setShowRewardAnimation(false);
    }
  }, [open]);

  useEffect(() => {
    if (isWatching && progress < 100) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setCompleted(true);
            setShowRewardAnimation(true);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isWatching, progress]);

  const handleStartWatching = () => {
    // In production, this would trigger the AdMob rewarded ad
    // using the REWARDED_AD_UNIT_ID: ca-app-pub-4734392712984503/9742721395
    // For now, we simulate the ad experience
    setIsWatching(true);
    toast.info("Ad शुरू हो रहा है... | Ad starting...", {
      duration: 2000,
    });
  };

  const handleClaimReward = () => {
    watchAd.mutate(undefined, {
      onSuccess: (points) => {
        toast.success(
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-gold" />
            <div>
              <p className="font-bold">Reward Earned! 🎉</p>
              <p className="text-sm">
                +{points.toString()} points added to wallet
              </p>
            </div>
          </div>,
          {
            duration: 4000,
          },
        );
        onOpenChange(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-navy/95 backdrop-blur-md border-white/20 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
            {completed ? (
              <>
                <Sparkles className="w-6 h-6 text-gold animate-pulse" />
                <span>Ad Complete! 🎉</span>
                <Sparkles className="w-6 h-6 text-gold animate-pulse" />
              </>
            ) : (
              <>Watch Ad & Earn | विज्ञापन देखें और कमाएं</>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!isWatching && !completed && (
            <div className="text-center space-y-4">
              <div className="relative">
                <img
                  src="/assets/generated/ad-placeholder.dim_800x600.png"
                  alt="Ad Preview"
                  className="w-full rounded-lg border border-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent rounded-lg" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-lg font-bold drop-shadow-lg">
                    🎬 Rewarded Ad Ready
                  </p>
                  <p className="text-white/80 text-sm drop-shadow-lg">
                    Watch full ad to earn points
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-gold/20 to-gold/5 rounded-lg p-4 border border-gold/30">
                <p className="text-white/90 text-sm">
                  📺 <strong>Ad dekho aur points kamao!</strong> Har ad ke liye
                  rewards milenge.
                </p>
                <p className="text-white/70 text-xs mt-2">
                  Watch the complete ad to earn your reward | पूरा विज्ञापन देखें
                </p>
              </div>
              <Button
                onClick={handleStartWatching}
                className="bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-navy font-bold text-lg py-6 px-8"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Watching | शुरू करें
              </Button>
            </div>
          )}

          {isWatching && !completed && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src="/assets/generated/ad-placeholder.dim_800x600.png"
                  alt="Ad Playing"
                  className="w-full rounded-lg border border-white/20"
                />
                <div className="absolute top-4 right-4 bg-navy/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gold/30">
                  <span className="text-gold font-bold text-sm">
                    {progress}%
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-navy/80 backdrop-blur-sm rounded-full p-6 border border-cyan/30">
                    <Play className="w-12 h-12 text-cyan animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">
                    Ad chal raha hai... | Ad playing...
                  </span>
                  <span className="text-gold font-bold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <p className="text-white/60 text-xs text-center">
                  Please wait until the ad completes | कृपया विज्ञापन पूरा होने तक
                  प्रतीक्षा करें
                </p>
              </div>
            </div>
          )}

          {completed && (
            <div className="text-center space-y-6">
              {showRewardAnimation && (
                <div className="relative">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center animate-pulse border-4 border-gold/50">
                    <CheckCircle className="w-20 h-20 text-gold" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-gold animate-ping absolute top-8 left-1/4" />
                    <Sparkles className="w-6 h-6 text-cyan animate-ping absolute top-12 right-1/4" />
                    <Sparkles className="w-7 h-7 text-gold animate-ping absolute bottom-12 left-1/3" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-2xl md:text-3xl text-white font-bold">
                  Congratulations! बधाई हो! 🎊
                </p>
                <p className="text-white/80 text-lg">
                  Ad successfully completed!
                </p>
                <p className="text-white/70">
                  Ab apne points claim karo aur earning karo!
                </p>
              </div>

              <div className="bg-gradient-to-br from-gold/20 to-cyan/20 rounded-lg p-6 border border-gold/30">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <Coins className="w-8 h-8 text-gold" />
                  <p className="text-3xl font-bold text-gold">+100 Points</p>
                </div>
                <p className="text-white/70 text-sm">
                  Reward ready to claim | रिवॉर्ड क्लेम करने के लिए तैयार
                </p>
              </div>

              <Button
                onClick={handleClaimReward}
                disabled={watchAd.isPending}
                className="w-full bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 text-navy font-bold text-lg py-6"
              >
                {watchAd.isPending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin mr-2" />
                    Claiming...
                  </>
                ) : (
                  <>
                    <Coins className="w-6 h-6 mr-2" />
                    Claim Reward 💰 | रिवॉर्ड क्लेम करें
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
