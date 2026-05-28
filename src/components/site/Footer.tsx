import { Linkedin, Instagram, Mail } from "lucide-react";

const cols = [
  { h: "Studio", links: ["About", "Services", "Projects", "Process"] },
  { h: "Solutions", links: ["AI Automation", "ERPNext", "Mobile Apps", "Dashboards"] },
  { h: "Company", links: ["Careers", "Contact", "Privacy", "Terms"] },
];

const socials = [
  { Icon: Linkedin, href: "https://www.linkedin.com/in/dodox-tech-692a55411/?isSelfProfile=true", label: "LinkedIn" },
  { Icon: Instagram, href: "https://www.instagram.com/dodox_tech?igsh=MTB5cmhvYnp5OXY0ZA==", label: "Instagram" },
  { Icon: Mail, href: "mailto:dodoxtechstudio@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 group">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg silver-gradient">
                <span className="font-black text-[#030712]">D</span>
              </span>
              <span className="text-lg font-semibold text-white">
                DodoX <span className="text-[var(--cyan-soft)]">Tech</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm text-white/55 leading-relaxed">
              We design and engineer luxurious digital systems for ambitious businesses —
              automated, scalable, beautiful.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="h-9 w-9 grid place-items-center rounded-full glass hover:bg-white/[0.08] transition">
                  <Icon className="h-4 w-4 text-white/70" />
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">{c.h}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/70 hover:text-[var(--cyan-soft)] transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {new Date().getFullYear()} DodoX Tech. All rights reserved.</p>
          <p>Crafted with cinematic precision.</p>
        </div>
      </div>
    </footer>
  );
}
