import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1628] via-[#0f2847] to-[#1a3a5c] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6">
        {/* Brand text */}
        <div
          className={`text-white text-2xl font-bold bg-white/10 backdrop-blur-sm px-8 py-3 rounded-full border border-white/20 transition-all duration-1000 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="italic">Mks lagendry, 🔥🦅</span>
        </div>

        {/* Logo */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            animate
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-75 rotate-12"
          }`}
        >
          <img
            src="/assets/generated/mks-reward-logo.dim_400x400.png"
            alt="MKS Rewards Logo"
            className="w-80 h-80 object-contain drop-shadow-2xl animate-float"
          />
        </div>

        {/* Coming soon text */}
        <div
          className={`text-white text-2xl font-medium bg-white/10 backdrop-blur-sm px-10 py-4 rounded-full border border-white/20 transition-all duration-1000 delay-700 ${
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="italic">Coming soon.....application</span>
        </div>

        {/* Tagline */}
        <div
          className={`text-gold text-sm font-medium transition-all duration-1000 delay-1000 ${
            animate ? "opacity-100" : "opacity-0"
          }`}
        >
          More than the dedication 🔥🦅
        </div>
      </div>

      {/* Loading indicator */}
      <div
        className={`absolute bottom-12 flex gap-2 transition-all duration-1000 delay-1000 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="w-2 h-2 bg-gold rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-gold rounded-full animate-bounce delay-150" />
        <div className="w-2 h-2 bg-gold rounded-full animate-bounce delay-300" />
      </div>
    </div>
  );
}
