import { useEffect, useMemo, useState } from "react";
import { IconHome, IconMenu2, IconUser, IconX, IconFolderSearch, IconMessages } from "@tabler/icons-react";
import TimelineGlobe from "./TimelineGlobe";
import NavTyper from "./NavTyper";



const Navigation = () => {
  const links = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const iconById = useMemo(
    () => ({
      home: IconHome,
      about: IconUser,
      projects: IconFolderSearch,
      contact: IconMessages,
    }),
    []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsOpen(false);
  };

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-40 transition-all",
        scrolled ? "bg-black/70 backdrop-blur border-b border-white/10" : "bg-transparent",
      ].join(" ")}
    >
      <div className="container-x w-full max-w-full">
        <div className="-ml-[15px] flex h-14 items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="group/logo relative flex items-center font-cinzel text-lg tracking-tight text-white/90 transition-colors hover:text-white"
          >
            <TimelineGlobe className="h-[60px] w-[60px] -mr-[8px]" />
            <span className="mt-[10px] font-harmoni text-3xl transition-[filter] duration-300 group-hover/logo:drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
              ER1S
            </span>
          </button>
          <NavTyper />
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="group/navlink relative inline-flex items-center px-2 py-1 text-xs font-kastroo font-bold tracking-[0.28em] text-white/60 transition-colors duration-300 hover:text-white"
              >
                <span className="relative pl-6">
                  <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 blur-[1px] transition-all duration-300 group-hover/navlink:translate-x-0 group-hover/navlink:opacity-100 group-hover/navlink:blur-0">
                    {(() => {
                      const Icon = iconById[link.id];
                      return Icon ? <Icon size={18} className="drop-shadow-[0_0_5px_rgba(255,255,255,1)] text-white/75" /> : null;
                    })()}
                  </span>
                  <span className="transition-[filter] duration-300 group-hover/navlink:drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
                    {link.label}
                  </span>
                </span>
                <span className="pointer-events-none absolute -bottom-1 left-2 right-2 h-px origin-left scale-x-0 bg-white/60 transition-transform duration-300 group-hover/navlink:scale-x-100" />
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="group/navtoggle inline-flex items-center justify-center rounded-full p-2 text-white/80 transition hover:text-white md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <span className="transition-[filter] duration-300 group-hover/navtoggle:drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
              {isOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
            </span>
          </button>
        </div>

        {isOpen && (
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-3 shadow-soft backdrop-blur md:hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-28 -top-28 h-[260px] w-[260px] rounded-full bg-[#6d001a] opacity-25 blur-3xl" />
              <div className="absolute -bottom-28 -right-28 h-[260px] w-[260px] rounded-full bg-[#4b0015] opacity-20 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(109,0,26,0.22),transparent_55%)]" />
            </div>

            <div className="relative z-10 flex flex-col gap-2">
              {links.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="group/navmob relative w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-left text-xs font-kastroo font-bold tracking-[0.28em] text-white/75 transition duration-300 hover:border-white/20 hover:bg-[rgba(109,0,26,0.14)] hover:text-white hover:shadow-[0_0_18px_rgba(109,0,26,0.22)]"
                >
                  <span className="relative block pl-7">
                    <span className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 opacity-0 blur-[1px] transition-all duration-300 group-hover/navmob:translate-x-0 group-hover/navmob:opacity-100 group-hover/navmob:blur-0">
                      {(() => {
                        const Icon = iconById[link.id];
                        return Icon ? <Icon size={18} className="drop-shadow-[0_0_5px_rgba(255,255,255,1)] text-white/75" /> : null;
                      })()}
                    </span>
                    <span className="transition-[filter] duration-300 group-hover/navmob:drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
                      {link.label}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute bottom-2 left-4 right-4 h-px origin-left scale-x-0 bg-white/35 transition-transform duration-300 group-hover/navmob:scale-x-100" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
