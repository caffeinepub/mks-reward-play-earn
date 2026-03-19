import { Tv, Users, Wallet } from "lucide-react";
import { useGetWalletStats } from "../hooks/useQueries";
import { Card, CardContent } from "./ui/card";

export default function WalletCard() {
  const { data: stats } = useGetWalletStats();

  return (
    <Card className="bg-gradient-to-br from-navy/80 to-navy/60 backdrop-blur-md border-white/20 shadow-2xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold/80 flex items-center justify-center shadow-lg shadow-gold/30">
            <Wallet className="w-6 h-6 text-navy" />
          </div>
          <div>
            <h2 className="text-white text-xl font-bold">
              आपका वॉलेट | Your Wallet
            </h2>
            <p className="text-cyan text-sm">Total Earnings | कुल कमाई</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-5 h-5 text-gold" />
              <p className="text-white/70 text-sm">
                Wallet Points | वॉलेट पॉइंट्स
              </p>
            </div>
            <p className="text-3xl font-bold text-gold">
              {stats?.walletPoints?.toString() || "0"}
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Tv className="w-5 h-5 text-cyan" />
              <p className="text-white/70 text-sm">Ads Watched | विज्ञापन देखे</p>
            </div>
            <p className="text-3xl font-bold text-cyan">
              {stats?.totalAdsWatched?.toString() || "0"}
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-purple-400" />
              <p className="text-white/70 text-sm">Referrals | रेफरल</p>
            </div>
            <p className="text-3xl font-bold text-purple-400">
              {stats?.successfulReferrals?.toString() || "0"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
