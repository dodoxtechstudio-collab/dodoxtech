import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-devices.jpg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute inset-0 -z-10 grid-mask" />
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 h-[320px] w-[320px] sm:h-[500px] sm:w-[500px] rounded-full blur-3xl bg-[#67e8f9]/10 animate-pulse-soft" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] sm:h-[600px] sm:w-[600px] rounded-full blur-3xl bg-white/[0.04]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-white/70 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-[var(--cyan-soft)]" />
            Next-gen DodoX Tech studio · 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,8vw,5.25rem)] leading-[1.05] font-semibold tracking-tight"
          >
            <span className="text-platinum">Still Managing Your</span>
            <br />
            <span className="text-platinum">Business Manually?</span>
            <br />
            <span className="text-silver-glow italic font-light">
              Build Smarter. <span className="text-[var(--cyan-soft)]/90">Grow Faster.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="mt-6 sm:mt-8 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed"
          >
            DodoX Tech builds custom digital solutions that automate business operations,
            improve productivity, and accelerate growth — engineered with luxurious precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full silver-gradient text-[#030712] px-6 sm:px-7 py-3.5 font-medium ambient-halo transition-transform hover:-translate-y-0.5"
            >
              Start Your Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 sm:px-7 py-3.5 font-medium text-white hover:bg-white/[0.06] transition"
            >
              Book Free Consultation
            </a>
          </motion.div>

          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 sm:gap-8 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40">
            <span>ERPNext</span>
            <span>n8n</span>
            <span>AI</span>
            <span>React</span>
            <span className="hidden sm:inline">Automation</span>
          </div>
        </div>

        {/* Right — floating device composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ambient-halo">
            <img
              src={heroImg}
              alt="Floating laptop and phone with AI dashboard UI"
              width={1536}
              height={1280}
              className="absolute inset-0 h-full w-full object-cover animate-float"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#030712] via-transparent to-transparent" />
          </div>

          {/* Floating spec cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -left-6 top-16 glass-strong rounded-2xl px-4 py-3 hidden md:block"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Uptime</div>
            <div className="text-xl font-semibold text-platinum">99.99%</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute -right-4 bottom-10 glass-strong rounded-2xl px-4 py-3 hidden md:block"
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">Workflows</div>
            <div className="text-xl font-semibold text-platinum">+20 automated</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
