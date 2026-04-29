import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';
import ProgressiveImage from './ProgressiveImage';
import { soundService } from '../services/soundService';

interface CaseStudyCardProps {
  cs: CaseStudy;
  index: number;
  navigate: (path: string) => void;
  visible?: boolean;
  hasSeenIntro?: boolean;
  key?: React.Key;
}

export default function CaseStudyCard({ cs, index, navigate, visible = true, hasSeenIntro = false }: CaseStudyCardProps) {
  const [hov, setHov] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHov(true);
    setMousePos({ x, y });
  };
  
  return (
    <motion.div
      className="case-study-card"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setHov(true);
        soundService.play('hover');
      }}
      onMouseLeave={() => {
        setHov(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onClick={() => {
        soundService.play('click');
        navigate(`/work/${cs.slug}`);
      }}
      initial={hasSeenIntro ? false : { opacity: 0, y: 20 }}
      whileInView={visible ? { opacity: 1, y: 0 } : (hasSeenIntro ? { opacity: 1, y: 0 } : {})}
      whileHover={{ y: -4 }}
      viewport={{ once: true, margin: "-100px 0px" }}
      transition={{ 
        duration: 0.6, 
        delay: hasSeenIntro ? 0 : index * 0.1, // Maintains staggering only on first visit
        ease: [0.16, 1, 0.3, 1] 
      }}
      style={{
        transition: "background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div className="card-container">
        {/* Text */}
        <div className="card-text">
          <div className="card-meta">
            <span className="card-index">{cs.index}</span>
            <div className="card-meta-divider" />
            <span className="card-year">{cs.year}</span>
          </div>
          
          <h3 className="card-title" style={{ 
            color: hov ? "#4361ee" : "#1a1a1a"
          }}>{cs.title}</h3>
          
          <p className="card-description">
            {cs.description.split("—")[0].trim().replace(/\.$/, "")}
          </p>
          
          <div className="card-tags">
            {cs.tags.map(t => (
              <span key={t} className="card-tag">{t}</span>
            ))}
          </div>
          
          <div className="card-cta" style={{ 
            opacity: hov ? 1 : 0, 
            transform: hov ? "translateX(0)" : "translateX(-8px)",
            display: "flex",
            gap: "1.5rem"
          }}>
            <span>View case study</span><span style={{ fontSize: "14px" }}>→</span>
            
            {cs.externalLink && (
              <a 
                href={cs.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  soundService.play('click');
                }}
                className="hover:text-[#4361ee] transition-colors"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "12px",
                  fontWeight: 600,
                  opacity: 0.8
                }}
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
 
        {/* Image */}
        <div 
          className="card-image-wrap" 
          style={{ 
            background: "#fafafa",
            boxShadow: hov ? "0 30px 60px rgba(0,0,0,0.08)" : "0 4px 12px rgba(0,0,0,0.02)", 
            transform: hov ? "translateY(-4px)" : "translateY(0)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
            overflow: "hidden",
            cursor: cs.externalLink ? "pointer" : "default"
          }}
          onClick={(e) => {
            if (cs.externalLink) {
              e.stopPropagation();
              soundService.play('click');
              window.open(cs.externalLink, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          <ProgressiveImage 
            src={cs.image} 
            alt={cs.title} 
            imgStyle={{ 
              opacity: hov ? 1 : 0.9, 
              transition: hov ? "transform 0.1s linear, opacity 0.5s ease" : "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
              transform: hov 
                ? `scale(1.1) translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` 
                : "scale(1.02) translate(0, 0)"
            }} 
          />
          {cs.externalLink && (
            <div style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "9px",
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
              color: "#1a1a1a",
              zIndex: 10,
              opacity: hov ? 1 : 0,
              transform: hov ? "translateY(0)" : "translateY(-4px)",
              transition: "all 0.3s ease"
            }}>
              GITHUB ↗
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
