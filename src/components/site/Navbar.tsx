import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass-strong" : "bg-transparent"
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg blue-gradient">
              <span className="absolute inset-0 rounded-lg blue-gradient blur-md opacity-60 group-hover:opacity-100 transition" />
              <span className="relative font-black text-white text-sm">D</span>
            </span>
            <span className="font-semibold tracking-tight text-white">
              DodoX <span className="text-[var(--neon)]">Tech</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors group"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 origin-left bg-gradient-to-r from-[var(--electric)] to-[var(--neon)] transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white blue-gradient shadow-[0_10px_40px_-10px_rgba(37,99,255,0.8)] hover:shadow-[0_10px_50px_-5px_rgba(0,217,255,0.6)] transition-all"
            >
              Start Project
              <span aria-hidden>→</span>
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="md:hidden h-9 w-9 grid place-items-center rounded-lg glass"
            >
              <span className="text-white">≡</span>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-2xl p-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm text-white/80 hover:text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 text-center rounded-full py-2.5 text-sm font-medium text-white blue-gradient"
            >
              Start Project
            </a>
          </div>
        )}
      </div>
    </motion.header>
  );
}
