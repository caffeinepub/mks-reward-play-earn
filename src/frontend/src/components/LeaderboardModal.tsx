import { Award, Medal, Trophy } from "lucide-react";
import { useGetLeaderboard } from "../hooks/useQueries";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import AdBanner from "./AdBanner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

interface LeaderboardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LeaderboardModal({
  open,
  onOpenChange,
}: LeaderboardModalProps) {
  const { data: leaderboard, isLoading } = useGetLeaderboard();
  const { data: userProfile } = useGetCallerUserProfile();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-gold fill-gold" />;
    if (rank === 2)
      return <Medal className="w-6 h-6 text-gray-400 fill-gray-400" />;
    if (rank === 3)
      return <Award className="w-6 h-6 text-amber-700 fill-amber-700" />;
    return <span className="text-white/70 font-bold">#{rank}</span>;
  };

  const isCurrentUser = (name: string) => {
    return userProfile?.name === name;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-navy/95 backdrop-blur-md border-white/20 text-white max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <Trophy className="w-7 h-7 text-gold" />
            Weekly Leaderboard | साप्ताहिक लीडरबोर्ड
          </DialogTitle>
          <p className="text-white/70 text-center text-sm">
            Top 100 players | Compete and win! | प्रतिस्पर्धा करो और जीतो!
          </p>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 max-h-[400px]">
          {isLoading ? (
            <div className="space-y-3">
              {[
                "sk-1",
                "sk-2",
                "sk-3",
                "sk-4",
                "sk-5",
                "sk-6",
                "sk-7",
                "sk-8",
                "sk-9",
                "sk-10",
              ].map((id) => (
                <Skeleton key={id} className="h-16 w-full bg-white/10" />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard && leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => {
                  const rank = Number(entry.rank || BigInt(index + 1));
                  const isCurrent = isCurrentUser(entry.name);

                  return (
                    <div
                      key={`entry-${entry.rank}-${entry.name}`}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        isCurrent
                          ? "bg-gold/20 border-gold/50 shadow-lg shadow-gold/20"
                          : rank <= 3
                            ? "bg-white/10 border-white/20"
                            : "bg-white/5 border-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 flex items-center justify-center">
                          {getRankIcon(rank)}
                        </div>
                        <div>
                          <p
                            className={`font-bold ${isCurrent ? "text-gold" : "text-white"}`}
                          >
                            {entry.name}
                            {isCurrent && " (You | आप)"}
                          </p>
                          <p className="text-white/70 text-sm">Rank #{rank}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-2xl font-bold ${isCurrent ? "text-gold" : "text-cyan"}`}
                        >
                          {entry.points.toString()}
                        </p>
                        <p className="text-white/70 text-sm">points</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <p className="text-white/70">
                    Leaderboard is empty. Be the first player! | पहले खिलाड़ी बनो!
                  </p>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Ad Banner at bottom */}
        <div className="pt-4 border-t border-white/10">
          <AdBanner />
        </div>
      </DialogContent>
    </Dialog>
  );
}
