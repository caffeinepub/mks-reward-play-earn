import { AlertCircle, Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// AdMob credentials
const ADMOB_APP_ID = "ca-app-pub-4734392712984503~3542272991";
const AD_UNIT_ID = "ca-app-pub-4734392712984503/7490865096";

export default function AdBanner() {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [adStatus, setAdStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  useEffect(() => {
    const loadAdScript = () => {
      if (document.querySelector('script[src*="adsbygoogle.js"]')) {
        initializeAd();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADMOB_APP_ID}`;
      script.async = true;
      script.crossOrigin = "anonymous";
      script.onload = () => initializeAd();
      script.onerror = () => {
        setAdStatus("error");
        setShowPlaceholder(true);
      };
      document.head.appendChild(script);
    };

    const initializeAd = () => {
      try {
        if (window.adsbygoogle && adContainerRef.current) {
          const ins = adContainerRef.current.querySelector("ins");
          if (ins && !ins.dataset.adsbygoogleStatus) {
            window.adsbygoogle = window.adsbygoogle || [];
            (window.adsbygoogle as unknown[]).push({});
            setAdStatus("loaded");
          }
        }
      } catch (_error) {
        setAdStatus("error");
        setShowPlaceholder(true);
      }
    };

    const timer = setTimeout(() => loadAdScript(), 300);
    const fallbackTimer = setTimeout(() => {
      if (adStatus === "loading") setShowPlaceholder(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [adStatus]);

  if (showPlaceholder || adStatus === "error") {
    return (
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm">
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <span className="bg-gold/90 text-navy px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Demo Ad
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-1.5 transition-colors"
                >
                  <Info className="w-4 h-4 text-white" />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-navy border-gold/30 text-white max-w-xs"
              >
                <p className="text-sm">
                  Real ads will display here once AdMob is activated
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[2/1]">
          <img
            src="/assets/generated/ad-placeholder.dim_800x600.png"
            alt="Ad Placeholder"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white/90 text-sm md:text-base font-medium drop-shadow-lg">
              📢 Advertisement Space
            </p>
            <p className="text-white/70 text-xs md:text-sm mt-1 drop-shadow-lg">
              Support MKS Reward by viewing ads
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gold/20 to-cyan/20 px-4 py-2 border-t border-white/10">
          <p className="text-white/80 text-xs text-center">
            💡 Watch ads and earn points
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border border-gold/20 bg-gradient-to-br from-navy/40 to-navy/20 backdrop-blur-sm">
      {adStatus === "loading" && (
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2">
          <span className="bg-cyan/90 text-navy px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
            Loading Ad...
          </span>
        </div>
      )}
      <div
        ref={adContainerRef}
        className="relative w-full min-h-[250px] md:min-h-[90px] flex items-center justify-center p-4"
      >
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADMOB_APP_ID}
          data-ad-slot={AD_UNIT_ID.split("/").pop()}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      <div className="bg-gradient-to-r from-gold/20 to-cyan/20 px-4 py-2 border-t border-white/10">
        <div className="flex items-center justify-center gap-2">
          <AlertCircle className="w-3 h-3 text-white/60" />
          <p className="text-white/80 text-xs text-center">
            Support MKS Reward
          </p>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
