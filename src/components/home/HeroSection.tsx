"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface HeroStat { value: string; label: string; }

export function HeroSection({ stats }: { stats: HeroStat[] }) {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.style.cssText = `
        position:absolute; width:2px; height:2px;
        background:#C8A951; border-radius:50%; opacity:0;
        left:${Math.random() * 100}%;
        bottom:${Math.random() * 30}%;
        animation: float ${6 + Math.random() * 6}s ease-in-out ${Math.random() * 8}s infinite;
      `;
      particlesRef.current.appendChild(p);
    }
  }, []);

  return (
    <section style={{
      height: "100vh", minHeight: 700,
      position: "relative", display: "flex", alignItems: "center",
      overflow: "hidden",
    }}>
      {/* Background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `
          radial-gradient(ellipse at 65% 40%, rgba(26,107,138,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 70%, rgba(200,169,81,0.07) 0%, transparent 45%),
          linear-gradient(160deg,#070B14 0%,#0C1020 60%,#070B14 100%)
        `,
      }} />

      {/* Map SVG */}
      <svg
        style={{ position: "absolute", right: "-5%", top: "50%", transform: "translateY(-50%)", width: "55%", height: "90%", opacity: 0.06 }}
        viewBox="0 0 800 600" fill="none"
      >
        <circle cx="400" cy="300" r="250" stroke="rgba(200,169,81,1)" strokeWidth="0.5"/>
        <circle cx="400" cy="300" r="180" stroke="rgba(200,169,81,1)" strokeWidth="0.5"/>
        <circle cx="400" cy="300" r="110" stroke="rgba(200,169,81,1)" strokeWidth="0.5"/>
        <line x1="150" y1="300" x2="650" y2="300" stroke="rgba(200,169,81,0.5)" strokeWidth="0.5"/>
        <line x1="400" y1="50" x2="400" y2="550" stroke="rgba(200,169,81,0.5)" strokeWidth="0.5"/>
        <circle cx="400" cy="300" r="6" fill="rgba(200,169,81,1)"/>
        <circle cx="320" cy="220" r="4" fill="rgba(200,169,81,0.8)"/>
        <circle cx="500" cy="180" r="3" fill="rgba(200,169,81,0.6)"/>
        <circle cx="460" cy="380" r="4" fill="rgba(200,169,81,0.7)"/>
        <circle cx="280" cy="360" r="3" fill="rgba(200,169,81,0.5)"/>
      </svg>

      {/* Particles */}
      <div ref={particlesRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }} />

      {/* Content */}
      <div className="pt-24 md:pt-[72px] px-4 md:px-[60px] pb-24 relative z-[2] max-w-[1400px] mx-auto w-full">
        {/* Badge */}
        <div className="animate-fade-up-1" style={{
          display: "inline-flex", alignItems: "center", gap: 12,
          border: "1px solid rgba(200,169,81,0.25)",
          padding: "8px 20px", marginBottom: 36,
          background: "rgba(200,169,81,0.05)",
        }}>
          <div className="animate-pulse-dot" style={{
            width: 6, height: 6, borderRadius: "50%", background: "var(--gold)",
          }} />
          <span style={{ fontSize: 9, letterSpacing: "4px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-dm-sans)" }}>
            Pakistan&apos;s #1 Unity Estate Platform
          </span>
        </div>

        {/* Title */}
        <h1 className="animate-fade-up-2" style={{
          fontFamily: "var(--font-playfair, Playfair Display, serif)",
          fontSize: "clamp(52px,7.5vw,110px)",
          fontWeight: 700, lineHeight: 0.95,
          marginBottom: 20,
        }}>
          ONE WORLD<br />
          <span style={{ color: "var(--gold)", fontStyle: "italic" }}>ONE HOME</span>
          <span style={{
            display: "block",
            fontSize: "clamp(18px,2.5vw,36px)",
            fontWeight: 300, color: "var(--light)",
            letterSpacing: "3px", fontStyle: "normal",
            marginTop: 12,
          }}>
            Humanitarians · Faisal Hills Specialists
          </span>
        </h1>

        {/* Tagline */}
        <p className="animate-fade-up-3" style={{
          fontSize: 11, letterSpacing: "5px", textTransform: "uppercase",
          color: "#2490B5", marginBottom: 40,
          fontFamily: "var(--font-dm-sans)",
        }}>
          Where Humanity Meets Excellence in Real Estate
        </p>

        {/* Desc */}
        <p className="animate-fade-up-4" style={{
          fontSize: 14, lineHeight: 2, color: "var(--gray)",
          maxWidth: 500, marginBottom: 52,
          fontFamily: "var(--font-dm-sans)",
        }}>
          Wahda1 connects people with premium properties across Faisal Hills — residential plots,
          commercial spaces, villas, apartments &amp; shops. Your trusted partner in property
          investment and construction.
        </p>

        {/* Actions */}
        <div className="animate-fade-up-5 flex flex-col sm:flex-row gap-4 items-center flex-wrap">
          <a href="#properties" className="w-full sm:w-auto text-center" style={{
            background: "var(--gold)", color: "var(--deep)",
            padding: "16px 44px", fontSize: 10, letterSpacing: "3px",
            textTransform: "uppercase", textDecoration: "none",
            fontWeight: 600, fontFamily: "var(--font-dm-sans)",
            transition: "all 0.3s", display: "inline-block",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
            Browse Properties
          </a>
          <a href="#contact" className="w-full sm:w-auto text-center" style={{
            border: "1px solid rgba(200,169,81,0.4)", color: "var(--gold)",
            padding: "16px 44px", fontSize: 10, letterSpacing: "3px",
            textTransform: "uppercase", textDecoration: "none",
            transition: "all 0.3s", display: "inline-block",
            fontFamily: "var(--font-dm-sans)",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(200,169,81,0.08)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,81,0.4)"; }}>
            Free Consultation
          </a>
        </div>
      </div>

      {/* Stats */}
      {stats.length > 0 && (
        <div className="animate-fade-up-6 hidden lg:flex gap-12 absolute right-[60px] bottom-[80px]">
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-playfair)", fontSize: 40,
                fontWeight: 700, color: "var(--gold)", lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontSize: 8, letterSpacing: "3px", textTransform: "uppercase",
                color: "var(--gray)", marginTop: 6,
                fontFamily: "var(--font-dm-sans)",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="animate-fade-up-7" style={{
        position: "absolute", left: "50%", bottom: 40,
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
      }}>
        <div className="animate-scroll-line" style={{
          width: 1, height: 50,
          background: "linear-gradient(to bottom, var(--gold), transparent)",
        }} />
        <span style={{ fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
          Scroll
        </span>
      </div>
    </section>
  );
}
