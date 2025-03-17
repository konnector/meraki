"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DotPattern } from "../magicui/dot-pattern";
import { TextReveal } from "../magicui/text-reveal";
import { TypingAnimation } from "../magicui/typing-animation";
import { useEffect, useState, useRef } from "react";

export function CTASection() {
  const [currentText, setCurrentText] = useState("Transform spreadsheets with AI");
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const phrases = [
    "Transform spreadsheets with AI",
    "Get insights in seconds, not hours",
    "Automate complex data workflows",
    "Collaborate with AI assistance"
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Handle deleting
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        setTypingSpeed(50); // Faster when deleting
        
        // If deleted everything, start typing next phrase
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(100); // Normal speed for typing
        }
      } 
      // Handle typing
      else {
        const fullPhrase = phrases[currentIndex];
        setCurrentText(prev => fullPhrase.substring(0, prev.length + 1));
        
        // If typed the full phrase, start deleting after a pause
        if (currentText === fullPhrase) {
          setTimeout(() => {
            setIsDeleting(true);
          }, 2000); // Wait 2 seconds before deleting
          return;
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, phrases, typingSpeed]);

  return (
    <section className="mx-3 md:mx-0">
      <div className="mx-auto w-full relative max-w-[1175px] gap-8 overflow-clip rounded-xl px-1 py-6 md:px-1 md:py-20 shadow-fade bg-white mt-5 mb-3">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-60" 
               style={{ 
                 maskImage: 'radial-gradient(circle, rgb(0, 0, 0) 20%, rgba(0, 0, 0, 0) 80%), linear-gradient(rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.7) 100%)' 
               }}>
            <DotPattern
              width={40}
              height={40}
              cx={1}
              cy={1}
              cr={1}
              className="absolute inset-0 h-full w-full fill-neutral-800/20"
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center md:max-w-none">
          {/* Heading */}
          <h2 className="font-cal md:!leading-xl text-[35px] tracking-[-0.002em] md:text-[45px] mx-auto max-w-lg text-center">
            Intelligent Spreadsheets, Powered by AI
          </h2>

          {/* Custom typing animation */}
          <div className="mt-4 mb-8 h-8 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-600"
            >
              <span id="typing-text">{currentText}</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.5 }}
                className="ml-1 inline-block w-0.5 h-5 bg-primary"
              />
            </motion.div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-9 mt-8">
            <div className="mb-4 flex justify-center gap-4 text-center">
              <Link 
                href="/signup" 
                className="inline-flex items-center px-5 py-3 text-sm font-medium border border-[transparent] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:opacity-90 transition-all duration-150 ease-in-out group relative overflow-hidden rounded-xl bg-[#2c2c30] hover:bg-[#2c2c30]"
              >
                Get started
                <div className="ml-3 mt-0.5 scale-150">
                  <svg className="stroke-gray-400 stroke-2" fill="none" width="7" height="7" viewBox="0 0 10 10" aria-hidden="true">
                    <path className="opacity-0 transition group-hover:opacity-100" d="M0 5h7"></path>
                    <path className="transition group-hover:translate-x-[3px]" d="M1 1l4 4-4 4"></path>
                  </svg>
                </div>
                <div className="absolute inset-0">
                  <div className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-b from-white opacity-60"></div>
                </div>
              </Link>
              
              <Link 
                href="/demo" 
                className="inline-flex items-center px-5 py-3 text-sm font-medium border border-gray-300 text-gray-700 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-neutral-900 hover:bg-gray-50 transition-all duration-150 ease-in-out rounded-xl"
              >
                See demo
              </Link>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mx-auto grid max-w-[900px] grid-cols-2 items-center justify-center justify-items-center gap-7 sm:grid-cols-3 md:grid-cols-3 lg:flex lg:gap-8 lg:space-y-0">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-100 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              </div>
              <span className="text-sm font-medium">99.9% Uptime</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-100 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Enterprise Security</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-100 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
              </div>
              <span className="text-sm font-medium">10K+ Users</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-100 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                  <path d="M8.5 8.5v.01"/>
                  <path d="M16 15.5v.01"/>
                  <path d="M12 12v.01"/>
                  <path d="M11 17v.01"/>
                  <path d="M7 14v.01"/>
                </svg>
              </div>
              <span className="text-sm font-medium">AI-Powered</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-gray-100 rounded-full p-3 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                  <path d="M12 15V3m0 12-4 4m4-4 4 4"/>
                  <path d="M2 17a10 10 0 0 1 20 0"/>
                </svg>
              </div>
              <span className="text-sm font-medium">Cloud-Based</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 