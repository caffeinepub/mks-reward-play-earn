import { AlertCircle, CheckCircle2, RefreshCw, XCircle } from "lucide-react";
import { useGetLiveStatus } from "../hooks/useQueries";
import AdBanner from "./AdBanner";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface LiveStatusModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LiveStatusModal({
  open,
  onOpenChange,
}: LiveStatusModalProps) {
  const { data: status, isLoading, refetch, isFetching } = useGetLiveStatus();

  const getStatusIcon = (statusText: string) => {
    if (statusText.includes("ACTIVE")) {
      return <CheckCircle2 className="w-6 h-6 text-green-400" />;
    }
    if (statusText.includes("WARNING")) {
      return <AlertCircle className="w-6 h-6 text-yellow-400" />;
    }
    return <XCircle className="w-6 h-6 text-red-400" />;
  };

  const getStatusColor = (statusText: string) => {
    if (statusText.includes("ACTIVE")) {
      return "text-green-400";
    }
    if (statusText.includes("WARNING")) {
      return "text-yellow-400";
    }
    return "text-red-400";
  };

  const statusItems = status
    ? [
        {
          label: "Authentication System | प्रमाणीकरण प्रणाली",
          value: status.authenticationSystem,
          description: "Gmail + Password login system",
        },
        {
          label: "Ad System | विज्ञापन प्रणाली",
          value: status.adSystem,
          description: "AdMob integration & rewarded ads",
        },
        {
          label: "Leaderboard | लीडरबोर्ड",
          value: status.leaderboard,
          description: "Weekly rankings & competition",
        },
        {
          label: "Referral System | रेफरल प्रणाली",
          value: status.referralSystem,
          description: "Friend invites & bonus tracking",
        },
        {
          label: "Backend Connection | बैकएंड कनेक्शन",
          value: status.backendConnection,
          description: "Motoko backend on Internet Computer",
        },
      ]
    : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c] border-2 border-gold/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-gold via-cyan to-gold bg-clip-text text-transparent">
            🔴 Live Status Report | लाइव स्थिति रिपोर्ट
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* App URL Section */}
          <div className="bg-navy/40 rounded-lg p-4 border border-cyan/20">
            <h3 className="text-sm font-semibold text-cyan mb-2">
              Deployed App URL | तैनात ऐप URL
            </h3>
            <a
              href="https://balanced-amber-3yc-draft.caffeine.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/80 underline break-all text-sm"
            >
              https://balanced-amber-3yc-draft.caffeine.xyz
            </a>
          </div>

          {/* Overall Status */}
          {status && (
            <div className="bg-navy/40 rounded-lg p-4 border border-gold/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status.overallStatus)}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Overall Status | समग्र स्थिति
                    </h3>
                    <p
                      className={`text-sm font-semibold ${getStatusColor(status.overallStatus)}`}
                    >
                      {status.overallStatus}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => refetch()}
                  disabled={isFetching}
                  size="sm"
                  className="bg-cyan/20 hover:bg-cyan/30 text-cyan border border-cyan/40"
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${isFetching ? "animate-spin" : ""}`}
                  />
                  Refresh | रिफ्रेश
                </Button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-cyan mx-auto mb-2" />
              <p className="text-white">
                Loading status... | स्थिति लोड हो रही है...
              </p>
            </div>
          )}

          {/* Status Items */}
          {!isLoading && statusItems.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white mb-3">
                Active Modules | सक्रिय मॉड्यूल
              </h3>
              {statusItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-navy/40 rounded-lg p-4 border border-cyan/20 hover:border-gold/40 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {getStatusIcon(item.value)}
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">
                        {item.label}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        {item.description}
                      </p>
                      <p
                        className={`text-sm font-semibold ${getStatusColor(item.value)}`}
                      >
                        Status: {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Social Media Links Section */}
          <div className="bg-navy/40 rounded-lg p-4 border border-gold/30">
            <h3 className="text-lg font-bold text-white mb-3">
              Connected Social Media | जुड़े सोशल मीडिया
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <a
                  href="https://www.youtube.com/@mksreward"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold/80 underline"
                >
                  YouTube: @mksreward
                </a>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <a
                  href="https://www.instagram.com/mksreward"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold/80 underline"
                >
                  Instagram: @mksreward
                </a>
              </div>
            </div>
          </div>

          {/* Security & Backend Section */}
          <div className="bg-navy/40 rounded-lg p-4 border border-cyan/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Security & Backend | सुरक्षा और बैकएंड
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Motoko backend running on Internet Computer blockchain
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Secure password encryption with salted hashing</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Role-based access control (Admin & User roles)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Protected user data with Gmail ownership verification
                </span>
              </div>
            </div>
          </div>

          {/* PWA Features Section */}
          <div className="bg-navy/40 rounded-lg p-4 border border-gold/30">
            <h3 className="text-lg font-bold text-white mb-3">
              PWA Features | PWA सुविधाएं
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Service worker for offline functionality</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>"Add to Home Screen" installation support</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Android App Bundle (AAB) ready for Play Store</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Mobile-optimized responsive design</span>
              </div>
            </div>
          </div>

          {/* App Responsiveness */}
          <div className="bg-navy/40 rounded-lg p-4 border border-cyan/20">
            <h3 className="text-lg font-bold text-white mb-3">
              App Responsiveness | ऐप प्रतिक्रिया
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Optimized for mobile devices (Android & iOS)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Fast loading with service worker caching</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Bilingual support (Hindi & English)</span>
              </div>
            </div>
          </div>

          {/* AdMob Integration Details */}
          <div className="bg-navy/40 rounded-lg p-4 border border-gold/30">
            <h3 className="text-lg font-bold text-white mb-3">
              AdMob Integration | AdMob एकीकरण
            </h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>App ID: ca-app-pub-4734392712984503~3542272991</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Banner Ad Unit: ca-app-pub-4734392712984503/7490865096
                </span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Rewarded Ad Unit: ca-app-pub-4734392712984503/9742721395
                </span>
              </div>
            </div>
          </div>

          {/* Timestamp */}
          <div className="text-center text-xs text-gray-400 pt-2">
            Last updated:{" "}
            {new Date().toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>

        {/* Ad Banner at bottom */}
        <div className="mt-4">
          <AdBanner />
        </div>
      </DialogContent>
    </Dialog>
  );
}
