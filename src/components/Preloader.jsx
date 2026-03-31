import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";

const Preloader = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const spinnerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.6,
            ease: "power2.inOut",
            onComplete: onComplete
          });
        }
      });

      tl.fromTo(spinnerRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
      )
        .fromTo(textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.4"
        )
        .to(textRef.current, {
          opacity: 0.5,
          duration: 0.4,
          yoyo: true,
          repeat: 2
        })
        .to({}, { duration: 0.4 }); // Pause
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center gap-6">
        <div
          ref={spinnerRef}
          className="relative h-16 w-16"
        >
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/5 border-t-white shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
          <div className="absolute inset-2 animate-spin-reverse rounded-full border border-white/10 border-b-white/40" />
        </div>
        <div ref={textRef} className="text-center">
          <div className="font-harmoni text-4xl tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] uppercase">
            E R 1 S
          </div>
          <div className="mt-2 font-harmoni text-[0.65rem] tracking-[0.25em] text-white/70 uppercase">
            Initializing Core Systems
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
