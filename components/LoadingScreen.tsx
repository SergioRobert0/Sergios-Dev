"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-foreground text-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.55 }}
        >
          <motion.div
            className="font-heading text-8xl uppercase"
            initial={{ letterSpacing: "0.02em", opacity: 0 }}
            animate={{ letterSpacing: "0.14em", opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            SL
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
