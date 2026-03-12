import { motion } from "framer-motion";

export function ArcaneButton({
  variant = "primary",
  className,
  href,
  target,
  rel,
  onClick,
  children,
  ...props
}) {
  const base =
    "btn-arcane inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 hover:cursor-pointer font-kastroo font-bold text-sm tracking-[0.18em] hover:shadow-[0_0_8px_rgba(255,255,255,1)] uppercase transition focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

  const stylesByVariant = {
    primary: "btn-arcane-primary",
    ghost: "btn-arcane-ghost",
  };

  const Component = href ? motion.a : motion.button;

  const handleClick = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (typeof href === "string" && href.startsWith("#")) {
      event.preventDefault();
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", href);
    }
  };

  return (
    <Component
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={[base, "group/arcane", stylesByVariant[variant], className].filter(Boolean).join(" ")}
      href={href}
      target={href ? target : undefined}
      rel={href ? rel : undefined}
      onClick={handleClick}
      {...props}
    >
      <span className="flex items-center justify-center gap-2 transition-[filter] duration-300 group-hover/arcane:drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
        {children}
      </span>
    </Component>
  );
}
