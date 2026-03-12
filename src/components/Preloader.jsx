import { useEffect, useMemo } from "react";

const Preloader = ({ onComplete }) => {
  const durationMs = useMemo(() => 900, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      onComplete?.();
    }, durationMs);

    return () => window.clearTimeout(id);
  }, [durationMs, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-6">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        <div className="text-center">
          <div className="font-heading text-3xl tracking-tight">Loading</div>
          <div className="mt-1 text-sm text-white/60">Preparing the portfolio</div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
