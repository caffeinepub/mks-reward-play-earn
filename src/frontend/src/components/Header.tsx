export default function Header() {
  return (
    <header className="bg-navy/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-3">
          <img
            src="/assets/generated/mks-reward-logo.dim_400x400.png"
            alt="MKS Rewards"
            className="w-12 h-12 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-white">MKS Rewards</h1>
            <p className="text-xs text-cyan">Play &amp; Earn</p>
          </div>
        </div>
      </div>
    </header>
  );
}
