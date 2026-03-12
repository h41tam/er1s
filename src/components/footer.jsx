import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../animations/gsap";
import { IconHome, IconMessages, IconUser, IconFolderSearch } from "@tabler/icons-react";

const Footer = () => {
    const footerRef = useRef(null);

    useLayoutEffect(() => {
        ensureGsapPlugins();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const footer = footerRef.current;
        if (!footer) return;
        if (reduceMotion) return;

        const ctx = gsap.context(() => {
            gsap.set(footer, { opacity: 0, y: 18 });

            const animateIn = () => {
                gsap.to(footer, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", overwrite: true });
            };

            const animateOut = () => {
                gsap.to(footer, { opacity: 0, y: -14, duration: 0.32, ease: "power2.inOut", overwrite: true });
            };

            ScrollTrigger.create({
                trigger: footer,
                start: "top 90%",
                end: "bottom 15%",
                onEnter: animateIn,
                onLeave: animateOut,
                onEnterBack: animateIn,
                onLeaveBack: animateOut,
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (!element) return;
        element.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <footer ref={footerRef} className="relative overflow-hidden border-t border-white/10 bg-black/40 py-10 backdrop-blur">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 -top-32 h-[360px] w-[360px] rounded-full bg-[#6d001a] opacity-25 blur-3xl" />
                <div className="absolute -bottom-32 -right-32 h-[360px] w-[360px] rounded-full bg-[#4b0015] opacity-20 blur-3xl" />
            </div>

            <div className="container-x relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="w-full text-center text-sm text-white/60 tracking-[0.2em] font-brites md:w-auto md:text-left">
                    © {new Date().getFullYear()} <span className="text-white font-osiris drop-shadow-[0_0_5px_rgba(255,255,255,1)] animate-pulse transition-all duration-300">ER1S</span> ALL RIGHTS RESERVED.
                </div>
                <div className="flex flex-col items-center justify-center gap-3 text-sm md:flex-row md:flex-wrap md:gap-x-7 md:gap-y-3">
                    {[
                        { id: "home", label: "Home", Icon: IconHome },
                        { id: "about", label: "About", Icon: IconUser },
                        { id: "projects", label: "Projects", Icon: IconFolderSearch },
                        { id: "contact", label: "Contact", Icon: IconMessages },
                    ].map(({ id, label, Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => scrollToSection(id)}
                            className="group/footerlink relative inline-flex items-center px-2 py-1 text-xs font-kastroo font-bold tracking-[0.28em] text-white/60 transition-colors duration-300 hover:text-white"
                        >
                            <span className="relative pl-6">
                                <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 blur-[1px] transition-all duration-300 group-hover/footerlink:translate-x-0 group-hover/footerlink:opacity-100 group-hover/footerlink:blur-0">
                                    <Icon size={18} className="text-white/75 drop-shadow-[0_0_3px_rgba(255,255,255,1)]" />
                                </span>
                                <span className="transition-[filter] duration-300 group-hover/footerlink:drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
                                    {label}
                                </span>
                            </span>
                            <span className="pointer-events-none absolute -bottom-1 left-2 right-2 h-px origin-left scale-x-0 bg-white/60 transition-transform duration-300 group-hover/footerlink:scale-x-100" />
                        </button>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
