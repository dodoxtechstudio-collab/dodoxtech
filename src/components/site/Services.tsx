import { motion } from "framer-motion";
import {
  Globe, Smartphone, Cpu, Database, Settings, LayoutDashboard,
  Briefcase, Brain, Code2, Workflow,
} from "lucide-react";

const services = [
  { icon: Globe, title: "Website Development", desc: "High-performance, cinematic web experiences." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native-feel iOS & Android apps." },
  { icon: Brain, title: "AI Automation", desc: "Intelligent agents that work 24/7." },
  { icon: Database, title: "ERP Development", desc: "Tailored ERP platforms end-to-end." },
  { icon: Settings, title: "ERPNext Customization", desc: "Workflows, forms, reports, integrations." },
  { icon: LayoutDashboard, title: "Admin Dashboards", desc: "Real-time analytics, beautiful UI." },
  { icon: Briefcase, title: "Business Management Systems", desc: "Operate every department from one console." },
  { icon: Cpu, title: "AI-Based Systems", desc: "OCR, classification, intelligent routing." },
  { icon: Code2, title: "Custom Software", desc: "Bespoke products designed around you." },
  { icon: Workflow, title: "Automation Tools", desc: "n8n pipelines & no-code orchestration." },
];

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">Services</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight text-platinum leading-[1.05]">
            Engineered for businesses
            <br />
            <span className="italic font-light text-silver-glow">that refuse to stand still.</span>
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: (i % 5) * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative glass rounded-2xl p-6 hairline-border overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/[0.06] via-transparent to-[#67e8f9]/[0.08]" />
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.18), transparent 50%)", WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)", WebkitMaskComposite: "xor", padding: "1px" }} />
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl glass grid place-items-center mb-5 group-hover:scale-110 transition">
                    <Icon className="h-5 w-5 text-[var(--cyan-soft)]" strokeWidth={1.4} />
                  </div>
                  <h3 className="text-base font-medium text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/55 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
