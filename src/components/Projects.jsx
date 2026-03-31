import { IconEyeSearch, IconDeviceDesktopCode, IconSourceCode } from "@tabler/icons-react";
import { useLayoutEffect, useRef } from "react";
import { ArcaneButton } from "../components/ArcaneButton";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../animations/gsap";
import project01 from "../assets/images/project-00.png";
import project02 from "../assets/images/project-01.png";
import project03 from "../assets/images/project-03.png";
import project04 from "../assets/images/project-04.png";

const Projects = () => {
  const sectionRef = useRef(null);
  const projects = [
    {
      title: "NumberOne",
      description: "e-commerce website for clothing and accessories.",
      image: project03,
      tags: ["React", "Tailwindcss", "Laravel", "MongoDB", "GSAP"],
      link: "https://number1one.store/",
      github: "https://github.com/h41tam/numberone-store",
    },
    {
      title: "Arena Star",
      description: "exclusive clothing e-commerce boutique for women.",
      image: project04,
      tags: ["React", "Laravel", "MongoDB", "GSAP", "Tailwindcss"],
      link: "https://arena-star.shop/",
      github: "https://github.com/h41tam/arena-star",
    },
    {
      title: "Golden Wings",
      description: "website for appointment management and advertising.",
      image: project01,
      tags: ["React", "GSAP", "Tailwindcss", "MySQL", "ExpressJS"],
      link: "#",
      github: "https://github.com/h41tam/golden-wings-custom",
    },
    {
      title: "Portfolio V1",
      description: "my old, simple and basic portfolio.",
      image: project02,
      tags: ["React", "Tailwindcss", "GSAP"],
      link: "https://my-portfolio-8q7.pages.dev/",
      github: "https://github.com/h41tam/my-portfolio",
    },
  ];

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('[data-anim="project-card"]');

      gsap.set(section, { opacity: 0 });
      gsap.set(cards, { opacity: 0, y: 36, rotateX: 10, transformPerspective: 800 });

      const animateIn = () => {
        gsap.to(section, { opacity: 1, duration: 0.35, ease: "power2.out", overwrite: true });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          overwrite: true,
        });
      };

      const animateOut = () => {
        gsap.to(cards, {
          opacity: 0,
          y: -18,
          duration: 0.35,
          ease: "power2.inOut",
          stagger: 0.06,
          overwrite: true,
        });
        gsap.to(section, { opacity: 0, duration: 0.35, ease: "power2.inOut", overwrite: true });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: animateIn,
        onLeave: animateOut,
        onEnterBack: animateIn,
        onLeaveBack: animateOut,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="section w-full max-w-full overflow-hidden">
      <div className="container-x w-full max-w-full -mt-[100px]">
        <div className="font-kastroo font-bold text-xs tracking-[0.88em] text-white/60">Gallery</div>
        <div className="flex items-center animate-pulse">
          <h2 className="text-3xl leading-tight md:text-4xl 
                mt-3 font-osiris text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] tracking-[0.18em]">
            MY PROJECTS
          </h2>
          <IconDeviceDesktopCode size={32} className="text-white mt-3 ml-2 drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
        </div>
        <p className="text-justify font-kycron text-sm font-light leading-relaxed tracking-[0.05em] text-white/75 mt-4">
          FROM SERVICES I PROVIDED DOWN TO THE PERSONAL ARTWORKS I CRAFTED. EVERYTHING IS LISTED HERE.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              data-anim="project-card"
              className="group overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-soft backdrop-blur hover:cursor-pointer hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow duration-500"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover filter grayscale saturate-0 transition-[filter] duration-700 ease-out group-hover:grayscale-0 group-hover:saturate-100"
                />
                <div className="absolute inset-0 bg-[rgba(109,0,26,0.32)] transition-transform duration-700 ease-out group-hover:-translate-y-full" />
              </div>

              <div className="space-y-4 p-6">

                {/* title + animated line */}
                <div className="flex items-center gap-3">

                  <h3 className="font-cinzel-decorative font-bold text-2xl tracking-[0.10em] text-white transition-all duration-500 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)] whitespace-nowrap">
                    {project.title}
                  </h3>

                  {/* line container */}
                  <div className="relative h-px flex-1 overflow-hidden bg-white/10">

                    {/* sliding line */}
                    <div className="absolute inset-y-0 right-0 w-full origin-right scale-x-0
                         bg-[rgba(255,255,255,0.78)]
                         transition-transform duration-500 ease-out
                         group-hover:scale-x-100 group-hover:shadow-[0_0_140px_rgba(255,255,255,1)]" />


                  </div>

                </div>

                <p className="text-sm font-osiris tracking-[0.05em] text-white/70 transition-all duration-500 group-hover:text-white/85">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-boston-caps font-light tracking-[0.12em] text-white/80 transition-all duration-300 will-change-transform hover:-translate-y-1 
                      hover:border-[rgba(109,0,26,0.78)] hover:bg-[rgba(109,0,26,0.32)] hover:text-white hover:cursor-pointer group-hover:text-white hover:shadow-[0_0_18px_rgba(109,0,26,0.55)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                  <ArcaneButton
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                  >
                    Preview
                    <IconEyeSearch size={16} />
                  </ArcaneButton>

                  <ArcaneButton
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    variant="ghost"
                  >
                    SourceCode
                    <IconSourceCode size={16} />
                  </ArcaneButton>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
