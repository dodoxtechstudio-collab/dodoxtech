import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MessageSquare, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/mail-actions";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await sendContactEmail({ data: formData });
      if (res.success) {
        setStatus("success");
        toast.success("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          details: "",
        });
      }
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      const msg = error?.message || "Failed to send message. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    }
  };

  const isSending = status === "sending";

  return (
    <section id="contact" className="relative py-20 sm:py-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[900px] rounded-full blur-3xl bg-[#67e8f9]/[0.06]" />
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-5">Contact</p>
          <h2 className="text-[clamp(2.25rem,5vw,4.5rem)] font-semibold tracking-tight text-platinum leading-[1.02]">
            Let's build something
            <br />
            <span className="italic font-light text-silver-glow">amazing together.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-white/60">
            Tell us about your business. We'll reply within 24 hours with a custom plan.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="mt-14 glass-strong rounded-3xl p-6 md:p-10 hairline-border"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Field
              label="Name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSending}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSending}
            />
            <Field
              label="Company"
              name="company"
              placeholder="Where you work"
              required={false}
              value={formData.company}
              onChange={handleChange}
              disabled={isSending}
            />
            <Field
              label="Budget"
              name="budget"
              placeholder="$10k – $100k+"
              required={false}
              value={formData.budget}
              onChange={handleChange}
              disabled={isSending}
            />
          </div>
          <div className="mt-4">
            <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">Project Details</label>
            <textarea
              name="details"
              required
              rows={5}
              placeholder="Tell us what you want to build…"
              value={formData.details}
              onChange={handleChange}
              disabled={isSending}
              className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-[#67e8f9]/30 outline-none px-4 py-3 text-white placeholder:text-white/30 transition disabled:opacity-50"
            />
          </div>
          
          {status === "error" && (
            <div className="mt-4 text-sm text-red-400 text-center">
              {errorMessage}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 rounded-full silver-gradient text-[#030712] px-7 py-3.5 font-medium ambient-halo hover:-translate-y-0.5 transition disabled:opacity-50 disabled:translate-y-0"
            >
              {isSending ? (
                <>Sending <Loader2 className="h-4 w-4 animate-spin" /></>
              ) : status === "success" ? (
                "Sent ✓"
              ) : (
                <>Contact Us <Send className="h-4 w-4" /></>
              )}
            </button>
            <a
              href="mailto:dodoxtechstudio@gmail.com"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-white hover:bg-white/[0.06] transition"
            >
              <MessageSquare className="h-4 w-4" /> Email Us
            </a>
            <a
              href="https://www.linkedin.com/in/dodox-tech-692a55411/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-white hover:bg-white/[0.06] transition"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="https://www.instagram.com/dodox_tech?igsh=MTB5cmhvYnp5OXY0ZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 font-medium text-white hover:bg-white/[0.06] transition"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </motion.form>

        <div className="mt-12 flex items-center justify-center gap-3 text-sm text-white/50">
          <Mail className="h-4 w-4" /> dodoxtechstudio@gmail.com
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  value,
  onChange,
  disabled,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full rounded-xl bg-white/[0.03] border border-white/10 focus:border-white/30 focus:ring-2 focus:ring-[#67e8f9]/30 outline-none px-4 py-3 text-white placeholder:text-white/30 transition disabled:opacity-50"
      />
    </div>
  );
}
