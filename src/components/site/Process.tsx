import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Discover", desc: "Deep dive into your operations, pain points and goals." },
  { n: "02", title: "Design", desc: "Cinematic UI, IA and workflows mapped to outcomes." },
  { n: "03", title: "Develop", desc: "Production-grade code with rigorous QA." },
  { n: "04", title: "Deploy", desc: "Zero-downtime release, monitored end-to-end." },
  { n: "05", title: "Scale", desc: "Iterate, optimize and grow with you." },
];

export function Process() {
  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">Process</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight text-platinum leading-[1.05]">
            From idea to impact —
            <br />
            <span className="italic font-light text-silver-glow">in five elegant steps.</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent hidden md:block" />
          <div className="space-y-12 md:space-y-24">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="md:text-right md:pr-12">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-[var(--cyan-soft)]/80">Step {s.n}</div>
                  <h3 className="mt-3 text-3xl md:text-4xl font-medium text-platinum">{s.title}</h3>
                </div>
                <div className="md:pl-12 mt-4 md:mt-0">
                  <p className="text-white/60 leading-relaxed max-w-md">{s.desc}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                  <div className="h-3 w-3 rounded-full bg-white/80 ambient-halo" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
