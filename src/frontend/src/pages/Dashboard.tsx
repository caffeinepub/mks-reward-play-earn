import { Activity, MessageCircle, Trophy, Tv, Users } from "lucide-react";
import { useState } from "react";
import ActionCard from "../components/ActionCard";
import AdBanner from "../components/AdBanner";
import ContactModal from "../components/ContactModal";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LeaderboardModal from "../components/LeaderboardModal";
import LiveStatusModal from "../components/LiveStatusModal";
import ReferralModal from "../components/ReferralModal";
import SocialLinks from "../components/SocialLinks";
import WalletCard from "../components/WalletCard";
import WatchAdModal from "../components/WatchAdModal";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { useGetCallerUserProfile } from "../hooks/useQueries";

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { data: userProfile } = useGetCallerUserProfile();
  const [watchAdOpen, setWatchAdOpen] = useState(false);
  const [referralOpen, setReferralOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [liveStatusOpen, setLiveStatusOpen] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            स्वागत है, {userProfile?.name || "Champion"}! 🎮
          </h1>
          <p className="text-cyan text-lg">
            Welcome! खेलो, जीतो, और कमाओ! | Play, Win & Earn! 💰
          </p>
        </div>

        {/* Wallet Card */}
        <WalletCard />

        {/* Ad Banner - Positioned below wallet stats */}
        <div className="mt-8">
          <AdBanner />
        </div>

        {/* Social Links - Positioned below ad banner */}
        <div className="mt-8">
          <SocialLinks
            youtubeUrl="https://www.youtube.com/@mksreward"
            instagramUrl="https://www.instagram.com/mksreward"
          />
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ActionCard
            icon={<Tv className="w-8 h-8" />}
            title="विज्ञापन देखें | Watch Ads"
            description="Watch ads and earn points | विज्ञापन देखो और पॉइंट्स कमाओ"
            gradient="from-gold/20 to-gold/5"
            onClick={() => setWatchAdOpen(true)}
          />
          <ActionCard
            icon={<Users className="w-8 h-8" />}
            title="रेफर करें | Refer & Earn"
            description="Invite friends, get bonus | दोस्तों को आमंत्रित करो, बोनस पाओ"
            gradient="from-cyan/20 to-cyan/5"
            onClick={() => setReferralOpen(true)}
          />
          <ActionCard
            icon={<Trophy className="w-8 h-8" />}
            title="लीडरबोर्ड | Leaderboard"
            description="View top players and compete | टॉप खिलाड़ी देखो और प्रतिस्पर्धा करो"
            gradient="from-purple-500/20 to-purple-500/5"
            onClick={() => setLeaderboardOpen(true)}
          />
          <ActionCard
            icon={<MessageCircle className="w-4 h-4" />}
            title="संपर्क करें | Contact Us"
            description="Any questions? Send us a message | कोई सवाल? हमें संदेश भेजें"
            gradient="from-blue-500/20 to-blue-500/5"
            onClick={() => setContactOpen(true)}
          />
        </div>

        {/* Live Status Button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={() => setLiveStatusOpen(true)}
            className="w-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border-2 border-green-500/40 rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20"
          >
            <div className="flex items-center justify-center gap-3">
              <Activity className="w-6 h-6 text-green-400 animate-pulse" />
              <div className="text-left">
                <h3 className="text-white font-bold text-lg">
                  🔴 Live Status Report | लाइव स्थिति रिपोर्ट
                </h3>
                <p className="text-green-400 text-sm">
                  View real-time app status | वास्तविक समय ऐप स्थिति देखें
                </p>
              </div>
            </div>
          </button>
        </div>
      </main>

      <Footer />

      {/* Floating Leaderboard Button */}
      <Button
        onClick={() => setLeaderboardOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 shadow-2xl shadow-gold/50 z-50 p-0 transition-transform hover:scale-110"
        aria-label="Open Leaderboard"
      >
        <Trophy className="w-6 h-6 text-navy" />
      </Button>

      {/* Modals */}
      <WatchAdModal open={watchAdOpen} onOpenChange={setWatchAdOpen} />
      <ReferralModal open={referralOpen} onOpenChange={setReferralOpen} />
      <LeaderboardModal
        open={leaderboardOpen}
        onOpenChange={setLeaderboardOpen}
      />
      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
      <LiveStatusModal open={liveStatusOpen} onOpenChange={setLiveStatusOpen} />
    </div>
  );
}
