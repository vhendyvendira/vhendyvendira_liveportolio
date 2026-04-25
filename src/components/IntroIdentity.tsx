import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function IntroIdentity({ visible }: { visible: boolean }) {
  const [copied, setCopied] = useState(false);
  const email = "vhendypersonal@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        paddingTop: "3.8rem", // Fine-tuned for perfect optical alignment
        paddingBottom: "10rem",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative"
      }}
    >
      {/* Unified Identity Frame */}
      <div 
        style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "1.25rem",
          width: "100%" 
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 1.01 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            width: "100%", 
            height: "28vh",
            minHeight: "220px",
            maxHeight: "380px",
            overflow: "hidden",
            borderRadius: "2px",
            position: "relative",
            background: "rgba(0,0,0,0.02)",
          }}
        >
          <img 
            src="/presence-images/vhendy-on-kanvas-confrence.png" 
            alt="Vhendy speaking at Kanvas Conference"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover",
              objectPosition: "center 20%",
              filter: "grayscale(1) contrast(0.9) brightness(1.1)",
              opacity: 0.7,
              mixBlendMode: "multiply"
            }}
          />
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to right, rgba(245,244,242,0.2), transparent, rgba(245,244,242,0.2))" 
          }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "12px",
            color: "rgba(0,0,0,0.4)",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.02em",
            paddingLeft: "2px" // Subtle optical alignment with image edge
          }}
        >
          <span>Get in touch —</span>
          <button
            onClick={handleCopy}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: "inherit",
              fontFamily: "inherit",
              fontSize: "inherit",
              cursor: "pointer",
              position: "relative",
              transition: "color 0.2s ease"
            }}
            className="hover:text-black"
          >
            <span style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}>{email}</span>
            
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 20 }}
                  exit={{ opacity: 0, x: 30 }}
                  style={{
                    position: "absolute",
                    left: "100%",
                    whiteSpace: "nowrap",
                    color: "#f26522",
                    fontWeight: 500
                  }}
                >
                  Copied to clipboard
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

