import { SiInstagram, SiYoutube } from "react-icons/si";
import { Card, CardContent } from "./ui/card";

interface SocialLinksProps {
  youtubeUrl: string;
  instagramUrl: string;
}

export default function SocialLinks({
  youtubeUrl,
  instagramUrl,
}: SocialLinksProps) {
  return (
    <Card className="bg-gradient-to-br from-cyan/20 to-gold/10 border-cyan/30 backdrop-blur-sm shadow-xl shadow-cyan/20">
      <CardContent className="p-6">
        <h2 className="text-white text-xl font-bold mb-4 text-center">
          हमसे जुड़ें 🌟
        </h2>
        <p className="text-white/70 text-sm text-center mb-6">
          हमारे सोशल मीडिया चैनल्स पर फॉलो करें
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* YouTube Link */}
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/5 rounded-lg p-4 border border-white/10 hover:border-gold/50 transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/50 group-hover:shadow-red-500/70 transition-all">
                <SiYoutube className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold group-hover:text-gold transition-colors">
                  YouTube
                </p>
                <p className="text-white/60 text-sm">हमारा चैनल देखें</p>
              </div>
            </div>
          </a>

          {/* Instagram Link */}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/5 rounded-lg p-4 border border-white/10 hover:border-cyan/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/30 hover:scale-105"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 flex items-center justify-center shadow-lg shadow-pink-500/50 group-hover:shadow-pink-500/70 transition-all">
                <SiInstagram className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold group-hover:text-cyan transition-colors">
                  Instagram
                </p>
                <p className="text-white/60 text-sm">हमें फॉलो करें</p>
              </div>
            </div>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
