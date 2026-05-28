import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Projects Delivered" },
  { value: "3+", label: "Industries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "Support" },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[400px] w-[800px] rounded-full blur-3xl bg-[#67e8f9]/[0.05]" />
      </div>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6"
        >
          About DodoX
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-tight text-platinum leading-[1.05]"
        >
          Every business has a problem.
          <br />
          <span className="text-silver-glow italic font-light">We create the solution.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 mx-auto max-w-2xl text-lg text-white/60 leading-relaxed"
        >
          We build smart digital systems that save time, reduce manual work, improve workflow
          efficiency, and help businesses scale faster using modern technologies.
        </motion.p>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="glass rounded-2xl px-6 py-8 hairline-border hover:bg-white/[0.04] transition"
            >
              <div className="text-4xl md:text-5xl font-semibold text-platinum tracking-tight">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-white/50">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
