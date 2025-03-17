"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

interface TypingAnimationProps {
  words: string[];
  className?: string;
  cursorClassName?: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

export function TypingAnimation({
  words = [],
  className = "",
  cursorClassName = "text-primary",
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 1000,
}: TypingAnimationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (!isInView || words.length === 0) return;

    controls.start({ opacity: 1, y: 0 });

    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      const shouldDelete = isDeleting;

      // Set the typing speed based on whether we're deleting or typing
      const speed = shouldDelete ? deleteSpeed : typingSpeed;

      if (shouldDelete) {
        // Delete one character
        setCurrentText(currentWord.substring(0, currentText.length - 1));
      } else {
        // Type one character
        setCurrentText(currentWord.substring(0, currentText.length + 1));
      }

      // If we've completed typing the word
      if (!shouldDelete && currentText === currentWord) {
        // Start deleting after a delay
        setTimeout(() => setIsDeleting(true), delayBetweenWords);
      }
      // If we've deleted the entire word
      else if (shouldDelete && currentText === "") {
        setIsDeleting(false);
        // Move to the next word
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }
    };

    // Set up the interval for typing/deleting
    const typingInterval = setInterval(handleTyping, isDeleting ? deleteSpeed : typingSpeed);

    // Clean up the interval
    return () => clearInterval(typingInterval);
  }, [
    currentText,
    isDeleting,
    currentWordIndex,
    words,
    typingSpeed,
    deleteSpeed,
    delayBetweenWords,
    isInView,
    controls,
  ]);

  return (
    <div ref={ref} className="inline-flex items-center">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={controls}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {currentText}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
        className={`ml-1 inline-block w-0.5 h-5 ${cursorClassName}`}
      />
    </div>
  );
} 