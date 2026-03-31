import { useLayoutEffect, useRef } from "react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../animations/gsap";
import { IconHeartHandshake } from "@tabler/icons-react"

const About = () => {
  const sectionRef = useRef(null);
  const skills = [
    "Node",
    "React",
    "Laravel",
    "Next",
    "Vue",
    "Angular",
    "Tailwind",
    "MySQL",
    "MongoDB",
    "Docker",
    "PHP",
    "JS",
    "HTML",
    "CSS",
    "GIT",
  ];

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const left = section.querySelector('[data-anim="about-left"]');
      const right = section.querySelector('[data-anim="about-right"]');

      gsap.set(section, { opacity: 0 });
      gsap.set([left, right], { opacity: 0 });
      if (left) gsap.set(left, { x: -72 });
      if (right) gsap.set(right, { x: 72 });

      const animateIn = () => {
        gsap.to(section, { opacity: 1, duration: 0.35, ease: "power2.out", overwrite: true });
        if (left) {
          gsap.to(left, { opacity: 1, x: 0, duration: 0.75, ease: "power3.out", overwrite: true });
        }
        if (right) {
          gsap.to(right, {
            opacity: 1,
            x: 0,
            duration: 0.75,
            delay: 0.06,
            ease: "power3.out",
            overwrite: true,
          });
        }
      };

      const animateOut = () => {
        gsap.to(section, { opacity: 0, duration: 0.32, ease: "power2.inOut", overwrite: true });
        if (left) gsap.to(left, { opacity: 0, x: -56, duration: 0.32, ease: "power2.inOut", overwrite: true });
        if (right) gsap.to(right, { opacity: 0, x: 56, duration: 0.32, ease: "power2.inOut", overwrite: true });
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
    <section ref={sectionRef} id="about" className="section w-full max-w-full overflow-hidden">
      <div className="container-x w-full max-w-full">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5" data-anim="about-left">
            <div className="font-kastroo font-bold text-xs tracking-[0.88em] text-white/60">Introduction</div>
            <div className="flex items-center animate-pulse">
              <h2 className="text-3xl leading-tight md:text-4xl 
                  mt-3 font-osiris text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)] tracking-[0.18em]">
                WHY HIRE ME?
              </h2>
              <IconHeartHandshake size={35} className="text-white mt-3 ml-2 drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
            </div>
            <p className="text-justify font-kycron uppercase leading-relaxed tracking-[0.05em] text-white/75 mt-4">
              <span className="font-osiris text-white drop-shadow-[0_0_3px_rgba(255,255,255,1)]">ER1S </span>
              is a Junior Full-Stack Web Developer.<br />
              And I am passionate about building modern web applications, continuously improving my technical skills while working on real-world projects.
            </p>
            <p className="text-justify font-kycron uppercase leading-relaxed tracking-[0.05em] text-white/75 mt-3">
              My experience is wide, ranging from e-commerce and eBook platforms to event management systems.
              I am currently exploring cybersecurity and SaaS as the next step in my journey.

            </p>
          </div>

          <div className="md:col-span-7" data-anim="about-right">
            <div className="rounded-2xl border hover:cursor-pointer border-white/10 bg-black shadow-soft relative overflow-hidden p-6 md:p-8 
                 bg-[radial-gradient(circle_at_20%_10%,rgba(109,0,26,0.55),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(109,0,0,0.08),transparent_10%)]
                 transition-all duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]">

              <div className="pointer-events-none absolute inset-0 -z-10">

                {/* main glow */}
                <div className="absolute -left-24 -top-24 h-[340px] w-[340px] rounded-full
                     bg-[radial-gradient(circle_at_30%_30%,rgba(109,0,26,0.85),transparent_70%)]
                     blur-3xl opacity-80" />
                {/* secondary glow */}
                <div className="absolute -right-28 top-10 h-[420px] w-[420px] rounded-full
                     bg-[radial-gradient(circle_at_40%_40%,rgba(255,24,88,0.25),rgba(109,0,26,0.15),transparent_75%)]
                     blur-3xl opacity-90" />
                {/* subtle lighting overlay */}
                <div className="absolute inset-0
                     bg-[radial-gradient(circle_at_20%_10%,rgba(109,0,26,0.25),transparent_55%),
                     radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.05),transparent_60%)]" />
              </div>

              <div className="font-osiris text-sm font-medium text-white">My Skillset</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-boston-caps font-light tracking-[0.12em] text-white/80 transition-all duration-300 will-change-transform hover:-translate-y-1 
                    hover:border-[rgba(109,0,26,0.78)] hover:bg-[rgba(109,0,26,0.32)] hover:text-white hover:cursor-pointer hover:shadow-[0_0_18px_rgba(109,0,26,0.55)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">

                {/* Card 1 */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black p-5 hover:cursor-pointer">

                  <div className="absolute inset-0 bg-gradient-to-br from-[#6d001a]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-0" />

                  <div className="absolute inset-0 bg-gradient-to-tr from-[#6d001a]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3">

                      <div className="font-osiris text-sm font-medium text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)] transition-all duration-500">What I do</div>


                      {/* line container */}
                      <div className="relative h-px flex-1 overflow-hidden bg-white/10">

                        {/* sliding line */}
                        <div className="absolute inset-y-0 right-0 w-full origin-right scale-x-0
                         bg-[rgba(255,255,255,0.78)]
                         transition-transform duration-500 ease-out
                         group-hover:scale-x-100 group-hover:shadow-[0_0_140px_rgba(255,255,255,1)]" />


                      </div>

                    </div>
                    <div className="mt-2 text-sm font-karina text-white/50 group-hover:text-white/80 transition-colors duration-500">
                      I build clean, responsive interfaces and reliable backend systems, turning ideas into functional and user-friendly web applications.
                    </div>
                  </div>

                </div>

                {/* Card 2 */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black p-5 hover:cursor-pointer">

                  <div className="absolute inset-0 bg-gradient-to-br from-[#6d001a]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-0" />

                  <div className="absolute inset-0 bg-gradient-to-tr from-[#6d001a]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-80" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3">

                      <div className="font-osiris text-sm font-medium text-white group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)] transition-all duration-500">What I seek</div>


                      {/* line container */}
                      <div className="relative h-px flex-1 overflow-hidden bg-white/10">

                        {/* sliding line */}
                        <div className="absolute inset-y-0 right-0 w-full origin-right scale-x-0
                         bg-[rgba(255,255,255,0.78)]
                         transition-transform duration-500 ease-out
                         group-hover:scale-x-100 group-hover:shadow-[0_0_140px_rgba(255,255,255,1)]" />


                      </div>

                    </div>
                    <div className="mt-2 text-sm font-karina text-white/50 group-hover:text-white/80 transition-colors duration-500">
                      I’m open to working with clients and businesses who want to bring their ideas to life through modern and reliable web solutions.
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
