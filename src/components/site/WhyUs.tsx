import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Clock, TrendingUp, Wallet, Rocket } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.floor(v).toLocaleString() + suffix);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, to, mv]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const items = [
  { icon: Clock, value: 72, suffix: "%", label: "Save Time", desc: "Cut manual operations dramatically." },
  { icon: TrendingUp, value: 3, suffix: "x", label: "Improve Productivity", desc: "Teams move faster with automation." },
  { icon: Wallet, value: 45, suffix: "%", label: "Reduce Costs", desc: "Lean stacks, optimized infrastructure." },
  { icon: Rocket, value: 10, suffix: "x", label: "Scale Your Business", desc: "Architected to grow with you." },
];

export function WhyUs() {
  return (
    <section id="products" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-mask opacity-50" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">Why DodoX</p>
          <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold tracking-tight text-platinum leading-[1.05]">
            Measurable outcomes.
            <br />
            <span className="italic font-light text-silver-glow">Projects Delivery experience.</span>
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <motion.div
                key={it.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative glass-strong rounded-2xl p-7 hairline-border overflow-hidden group"
              >
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full blur-3xl bg-[#67e8f9]/[0.08] group-hover:bg-[#67e8f9]/[0.18] transition duration-700" />
                <Icon className="h-6 w-6 text-[var(--cyan-soft)] mb-5" strokeWidth={1.3} />
                <div className="text-5xl font-semibold text-platinum tracking-tight">
                  <Counter to={it.value} suffix={it.suffix} />
                </div>
                <div className="mt-3 text-sm font-medium text-white">{it.label}</div>
                <p className="mt-1 text-sm text-white/55">{it.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
