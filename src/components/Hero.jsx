import { IconFolderSearch, IconDownload, IconMessages } from "@tabler/icons-react";
import { ArcaneButton } from "./ArcaneButton";
import { useLayoutEffect, useRef } from "react";
import heroImage from "../assets/1111.png";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../animations/gsap";

const Hero = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const left = section.querySelector('[data-anim="hero-left"]');
      const right = section.querySelector('[data-anim="hero-right"]');

      gsap.set(section, { opacity: 0 });
      if (left) gsap.set(left, { opacity: 0, y: 16 });
      if (right) gsap.set(right, { opacity: 0, y: 16, scale: 0.98 });

      const animateIn = () => {
        gsap.to(section, { opacity: 1, duration: 0.35, ease: "power2.out", overwrite: true });
        if (left) gsap.to(left, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", overwrite: true });
        if (right) {
          gsap.to(right, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            delay: 0.05,
            ease: "power3.out",
            overwrite: true,
          });
        }
      };

      const animateOut = () => {
        gsap.to(section, { opacity: 0, duration: 0.32, ease: "power2.inOut", overwrite: true });
        if (left) gsap.to(left, { opacity: 0, y: -12, duration: 0.32, ease: "power2.inOut", overwrite: true });
        if (right) gsap.to(right, { opacity: 0, y: -12, duration: 0.32, ease: "power2.inOut", overwrite: true });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 100%", // Start immediately as it's the first section
        end: "bottom 30%", // Fade out when the bottom of the section is 30% from the top
        onToggle: (self) => {
          if (self.isActive) {
            animateIn();
          } else {
            animateOut();
          }
        },
        onRefresh: (self) => {
          if (self.isActive) animateIn();
        }
      });

      // Immediate reveal for initial load at the top
      if (window.scrollY < 100) {
        animateIn();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="pt-28 md:pt-32 w-full max-w-full overflow-hidden" style={{ scrollMarginTop: 80 }}>
      <div className="container-x w-full max-w-full">
        <div className="relative rounded-2xl -mt-10 border border-white/10 bg-black shadow-soft grain items-center justify-center overflow-hidden w-full max-w-full">
          <div
            data-anim="hero-right"
            className="pointer-events-none absolute bottom-0 right-0 hidden select-none md:block"
          >
            <img
              src={heroImage}
              alt=""
              className="h-[560px] w-auto max-w-none origin-bottom-right scale-[1.06] object-contain opacity-30 lg:h-[620px]"
              draggable="false"
            />
          </div>
          <img
            src={heroImage}
            alt=""
            className="pointer-events-none absolute right-0 bottom-0 w-[290px] select-none rounded-3xl object-contain opacity-25 blur-[0.35px] md:hidden"
            draggable="false"
          />

          <div className="relative z-10 px-6 py-14 md:px-12 md:py-20">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-28 -top-28 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(109,0,26,0.95),rgba(109,0,26,0.35),transparent_70%)] blur-3xl opacity-80" />
              <div className="absolute -right-28 top-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_30%_40%,rgba(255,255,255,0.25),rgba(109,0,26,0.24),transparent_72%)] blur-3xl opacity-80 md:opacity-100" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(109,0,26,0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_55%)]" />
            </div>

            <div className="grid gap-10 md:grid-cols-12 md:items-center">
              <div className="md:col-span-7" data-anim="hero-left">
                <div className="tracking-[0.55em] text-white/65 font-osiris font-light text-[0.52rem] lg:text-[0.86rem]">
                  JUNIOR FULL-STACK WEB DEVELOPER
                </div>
                <h1 className="text-[2.7rem] drop-shadow-[0_0_5px_rgba(255,255,255,1)] lg:text-7xl headline-track mt-3 max-w-3xl font-tan-pearl leading-tight">
                  I Build Clean Interfaces & Reliable Systems.
                </h1>
                <p className="text-base leading-relaxed text-white/75 mt-6 max-w-2xl text-[0.8rem] tracking-[0.13em]">
                  USE{" "}
                  <span className="font-cinzel-decorative animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,1)] font-bold text-white">My Services</span>{" "}
                  TO BRING YOUR{" "}
                  <span className="font-cinzel-decorative animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,1)] font-bold text-white">
                    Vision
                  </span>{" "}
                  INTO REALITY
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ArcaneButton href="#projects" variant="ghost">
                    <IconFolderSearch size={17} />
                    View Gallery
                  </ArcaneButton>
                  <ArcaneButton href="#contact" variant="ghost">
                    <IconMessages size={17} />
                    Hire me
                  </ArcaneButton>
                  <ArcaneButton href="/my-resume.pdf" download variant="primary">
                    <IconDownload size={17} />
                    Resume
                  </ArcaneButton>
                </div>
              </div>

              <div className="md:col-span-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
