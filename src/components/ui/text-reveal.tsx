"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface TextRevealProps {
  text?: string;
  revealText?: string;
  className?: string;
  revealClassName?: string;
  children?: React.ReactNode;
}

export function TextReveal({
  text,
  revealText,
  className = "",
  revealClassName = "text-primary",
  children,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const displayText = text || revealText || "";
  const displayRevealText = revealText || text || "";

  const words = displayText.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div ref={ref} className={className}>
      {children || (
        <motion.div
          variants={container}
          initial="hidden"
          animate={controls}
          className="inline-flex flex-wrap"
          style={{ gap: "0.5rem" }}
        >
          {words.map((word, index) => (
            <motion.span
              variants={child}
              key={index}
              className={
                displayRevealText.includes(word) ? revealClassName : ""
              }
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
} 