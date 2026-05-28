import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import p1 from "@/assets/project-extension.jpg";
import p2 from "@/assets/project-silambam.jpg";
import p3 from "@/assets/project-n8n.jpg";
import p4 from "@/assets/project-erp.jpg";
import p5 from "@/assets/project-school.jpg";

const projects = [
  {
    img: p1, tag: "Chrome Extension · AI",
    title: "AI-Powered Product Extraction Extension",
    desc: "Smart browser extension that automates product data extraction using AI-powered attribute matching and schema-based processing.",
    tech: ["Chrome APIs", "JavaScript", "JSON", "Excel"],
  },
  {
    img: p2, tag: "Mobile App",
    title: "Vagai Silambam Management App",
    desc: "Modern mobile application for managing student attendance, records and training workflows for martial arts institutions.",
    tech: ["React Native", "Realtime", "Dashboard"],
  },
  {
    img: p3, tag: "AI Automation · n8n",
    title: "AI-Powered N8N Automation System",
    desc: "Automated ERP document processing using n8n, OCR and AI classification — invoices, POs, RFQs and quotations.",
    tech: ["n8n", "MongoDB", "OCR", "AI"],
  },
  {
    img: p4, tag: "ERPNext",
    title: "ERPNext Textile & Manufacturing Solution",
    desc: "Customized ERPNext implementation for purchase, sales, inventory, invoicing, payments and production workflows.",
    tech: ["ERPNext", "Custom Modules", "API"],
  },
  {
    img: p5, tag: "ERPNext · Education",
    title: "ERPNext School Management System",
    desc: "Customized ERPNext platform for admissions, fees, attendance, timetables, exams and staff management.",
    tech: ["ERPNext", "Workflows", "Reports"],
  },
];

export function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    let direction = 1;
    const speed = 0.8;

    const tick = () => {
      if (!isHovered && el) {
        el.scrollLeft += speed * direction;
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          direction = -1;
        } else if (el.scrollLeft <= 0) {
          direction = 1;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isHovered]);

  return (
    <section id="projects" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">Selected Work</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight text-platinum leading-[1.05]">
              Projects builds for
              <br />
              <span className="italic font-light text-silver-glow">real-world businesses.</span>
            </h2>
          </div>
          <p className="text-white/55 max-w-sm">
            Auto-scrolling showcase — hover to pause and explore each project.
          </p>
        </div>

        {/* Horizontal scroll showcase */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="-mx-6 px-6 overflow-x-auto scrollbar-none"
        >
          <div className="flex gap-6 snap-x snap-mandatory pb-6">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="snap-start shrink-0 w-[88vw] md:w-[640px] glass-strong rounded-3xl overflow-hidden hairline-border group"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] uppercase tracking-widest text-white/80">
                    {p.tag}
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight">
                      {p.title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-white/40 group-hover:text-[var(--cyan-soft)] transition" />
                  </div>
                  <p className="mt-3 text-sm text-white/60 leading-relaxed">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[11px] uppercase tracking-widest text-white/60 glass px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
