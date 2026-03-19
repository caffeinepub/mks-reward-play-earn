import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy/50 backdrop-blur-md border-t border-white/10 py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/70 text-sm flex items-center justify-center gap-2">
          © 2025. Built with{" "}
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
          using{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan hover:text-cyan/80 transition-colors underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
