"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function Cursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 260, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 260, damping: 28 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 14);
      y.set(event.clientY - 14);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-7 w-7 rounded-full border border-brand mix-blend-difference lg:block"
      style={{ x: smoothX, y: smoothY }}
    />
  );
}
