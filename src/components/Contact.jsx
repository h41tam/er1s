import { useLayoutEffect, useRef, useState } from "react";
import { IconMailPlus, IconSend, IconRocket, IconPhonePlus, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { ensureGsapPlugins, gsap, ScrollTrigger } from "../animations/gsap";
import { ArcaneButton } from "../components/ArcaneButton";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [submitState, setSubmitState] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useLayoutEffect(() => {
    ensureGsapPlugins();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const section = sectionRef.current;
    if (!section) return;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(section, { opacity: 0, y: 24 });

      const animateIn = () => {
        gsap.to(section, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", overwrite: true });
      };

      const animateOut = () => {
        gsap.to(section, { opacity: 0, y: -18, duration: 0.35, ease: "power2.inOut", overwrite: true });
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
    <section ref={sectionRef} id="contact" className="section w-full max-w-full overflow-hidden">
      <div className="container-x w-full max-w-full -mt-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <div className="font-kastroo font-bold text-xs tracking-[0.88em] text-white/60">CONTACT</div>
            <div className="flex items-center animate-pulse">
              <h2 className="text-3xl leading-tight md:text-4xl 
                mt-3 font-osiris text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)] tracking-[0.18em]">
                LET'S BUILD IT
              </h2>
              <IconRocket size={32} className="text-white mt-3 ml-2 drop-shadow-[0_0_5px_rgba(255,255,255,1)]" />
            </div>
            <p className="text-base text-sm leading-relaxed text-white/75 font-kycron mt-5">
              YOU ARE ONE STEP AWAY FROM BRINGING YOUR VISION TO LIFE.
            </p>

            <div className="mt-8 flex items-center gap-4 lg:flex-row justify-center">
              <ArcaneButton href="tel:+21293772445" variant="primary">
                <IconPhonePlus size={24} />
              </ArcaneButton>
              <ArcaneButton href="mailto:h41tam.business@gmail.com" variant="primary">
                <IconMailPlus size={24} />
              </ArcaneButton>
              <ArcaneButton href="https://github.com/h41tam" variant="primary">
                <IconBrandGithub size={24} />
              </ArcaneButton>
              <ArcaneButton href="https://www.linkedin.com/in/h41tam/" variant="primary">
                <IconBrandLinkedin size={24} />
              </ArcaneButton>
            </div>
          </div>

          <div className="md:col-span-7">
            <div
              id="contact-form"
              className="group relative isolate overflow-hidden rounded-2xl border border-white/10 bg-black p-6 md:p-8 shadow-soft transition-shadow duration-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <div className="pointer-events-none absolute inset-0 z-0">
                <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#6d001a] opacity-40 blur-3xl animate-blob" />
                <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#4b0015] opacity-40 blur-3xl animate-blob animation-delay-4000" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(109,0,26,0.35),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_60%)]" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-osiris text-white transition-all duration-500 group-hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
                    Email Me Directly Here
                  </div>
                  <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                    <div
                      className="absolute inset-y-0 right-0 w-full origin-right scale-x-0 bg-[rgba(255,255,255,0.78)] transition-transform duration-500 ease-out
                      group-hover:scale-x-100 group-hover:shadow-[0_0_140px_rgba(255,255,255,1)]"
                    />
                  </div>
                </div>

                <form
                  ref={formRef}
                  className="mt-5 space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

                    if (!serviceId || !templateId || !publicKey) {
                      setSubmitState("error");
                      setSubmitMessage("Missing EmailJS env vars (service, template, public key).");
                      return;
                    }

                    if (!formRef.current) return;

                    setSubmitState("sending");
                    setSubmitMessage("");

                    try {
                      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });
                      setSubmitState("sent");
                      setSubmitMessage("Message sent.");
                      formRef.current.reset();
                    } catch {
                      setSubmitState("error");
                      setSubmitMessage("Failed to send. Please try again.");
                    }
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="from_name"
                      autoComplete="name"
                      required
                      className="w-full placeholder:text-white/70 font-kycron rounded-2xl border border-white/15 bg-[#52041d] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      placeholder="Your Name"
                    />
                    <input
                      name="reply_to"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full placeholder:text-white/70 font-kycron rounded-2xl border border-white/15 bg-[#52041d] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                      placeholder="Your email"
                    />
                  </div>

                  <textarea
                    name="message"
                    rows={6}
                    required
                    className="w-full resize-none placeholder:text-white/70 font-kycron rounded-2xl border border-white/15 bg-[#52041d] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30"
                    placeholder="Write your message here..."
                  />

                  <div className="flex flex-wrap gap-3 pt-1">
                    <ArcaneButton variant="primary" type="submit" disabled={submitState === "sending"}>
                      {submitState === "sending" ? "Sending" : "Send"}
                      <IconSend size={18} />
                    </ArcaneButton>
                    <ArcaneButton
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        formRef.current?.reset();
                        setSubmitState("idle");
                        setSubmitMessage("");
                      }}
                    >
                      Clear
                    </ArcaneButton>
                  </div>

                  {submitMessage ? (
                    <div
                      className={[
                        "text-xs",
                        submitState === "sent" ? "text-white/75" : "text-white/55",
                      ].join(" ")}
                    >
                      {submitMessage}
                    </div>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
