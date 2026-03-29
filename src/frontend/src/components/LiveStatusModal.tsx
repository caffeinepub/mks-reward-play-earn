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
    if (statusText.includes("ACTIVE"))
      return <CheckCircle2 className="w-6 h-6 text-green-400" />;
    if (statusText.includes("WARNING"))
      return <AlertCircle className="w-6 h-6 text-yellow-400" />;
    return <XCircle className="w-6 h-6 text-red-400" />;
  };

  const getStatusColor = (statusText: string) => {
    if (statusText.includes("ACTIVE")) return "text-green-400";
    if (statusText.includes("WARNING")) return "text-yellow-400";
    return "text-red-400";
  };

  const statusItems = status
    ? [
        {
          label: "Authentication System",
          value: status.authenticationSystem,
          description: "Gmail + Password login system",
        },
        {
          label: "Ad System",
          value: status.adSystem,
          description: "AdMob integration & rewarded ads",
        },
        {
          label: "Leaderboard",
          value: status.leaderboard,
          description: "Weekly rankings & competition",
        },
        {
          label: "Referral System",
          value: status.referralSystem,
          description: "Friend invites & bonus tracking",
        },
        {
          label: "Backend Connection",
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
            🔴 Live Status Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-navy/40 rounded-lg p-4 border border-cyan/20">
            <h3 className="text-sm font-semibold text-cyan mb-2">
              Deployed App URL
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

          {status && (
            <div className="bg-navy/40 rounded-lg p-4 border border-gold/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(status.overallStatus)}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Overall Status
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
                  Refresh
                </Button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-cyan mx-auto mb-2" />
              <p className="text-white">Loading status...</p>
            </div>
          )}

          {!isLoading && statusItems.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white mb-3">
                Active Modules
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

          <div className="bg-navy/40 rounded-lg p-4 border border-gold/30">
            <h3 className="text-lg font-bold text-white mb-3">
              Connected Social Media
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

          <div className="bg-navy/40 rounded-lg p-4 border border-cyan/20">
            <h3 className="text-lg font-bold text-white mb-3">
              Security &amp; Backend
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
                <span>Role-based access control (Admin &amp; User roles)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>
                  Protected user data with Gmail ownership verification
                </span>
              </div>
            </div>
          </div>

          <div className="bg-navy/40 rounded-lg p-4 border border-gold/30">
            <h3 className="text-lg font-bold text-white mb-3">PWA Features</h3>
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

          <div className="bg-navy/40 rounded-lg p-4 border border-cyan/20">
            <h3 className="text-lg font-bold text-white mb-3">
              AdMob Integration
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

          <div className="text-center text-xs text-gray-400 pt-2">
            Last updated:{" "}
            {new Date().toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>

        <div className="mt-4">
          <AdBanner />
        </div>
      </DialogContent>
    </Dialog>
  );
}
