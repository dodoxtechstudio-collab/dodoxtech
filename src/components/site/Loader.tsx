import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] grid place-items-center bg-[#030712]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl silver-gradient ambient-halo">
              <span className="font-black text-[#030712] text-xl">D</span>
            </span>
            <span className="text-2xl font-semibold text-platinum tracking-tight">
              DodoX Tech
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
