import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if user has dismissed the prompt before
      const dismissed = localStorage.getItem("pwa-install-dismissed");
      if (!dismissed) {
        // Show prompt after 5 seconds
        setTimeout(() => {
          setShowPrompt(true);
        }, 5000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 duration-500">
      <div className="mx-auto max-w-md rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-4 shadow-2xl shadow-gold/20">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-2">
            <Download className="h-5 w-5 text-white" />
          </div>

          <div className="flex-1 space-y-2">
            <h3 className="font-bold text-white">Install MKS Reward App</h3>
            <p className="text-sm text-gray-300">
              होम स्क्रीन पर ऐप इंस्टॉल करें और बेहतर अनुभव पाएं!
            </p>
            <p className="text-xs text-gray-400">
              Install app on home screen for better experience!
            </p>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleInstall}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-white hover:from-blue-700 hover:to-cyan-600"
              >
                Install Now
              </Button>
              <Button
                onClick={handleDismiss}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Later
              </Button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 rounded-full p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
