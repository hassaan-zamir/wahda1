"use client";

import { useEffect, useRef } from "react";

interface WhyPoint {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export function WhyChooseUsSection({ points }: { points: WhyPoint[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-16 md:py-[110px] px-4 md:px-[60px]" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* Visual */}
          <div className="reveal h-[400px] md:h-[550px]" style={{ position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, width: "72%", height: "75%",
              background: "var(--dark2)", border: "1px solid rgba(200,169,81,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
            }}>
              <svg width="85%" height="85%" viewBox="0 0 300 280" fill="none">
                <text x="150" y="100" fontFamily="Playfair Display,serif" fontSize="72" fontWeight="700" fill="rgba(200,169,81,0.08)" textAnchor="middle">W1</text>
                <circle cx="150" cy="140" r="80" stroke="rgba(200,169,81,0.1)" strokeWidth="1" fill="none"/>
                <circle cx="150" cy="140" r="55" stroke="rgba(200,169,81,0.08)" strokeWidth="1" fill="none"/>
                <circle cx="150" cy="140" r="8" fill="rgba(200,169,81,0.4)"/>
                <line x1="150" y1="60" x2="150" y2="85" stroke="rgba(200,169,81,0.3)" strokeWidth="1"/>
                <line x1="150" y1="195" x2="150" y2="220" stroke="rgba(200,169,81,0.3)" strokeWidth="1"/>
                <line x1="70" y1="140" x2="95" y2="140" stroke="rgba(200,169,81,0.3)" strokeWidth="1"/>
                <line x1="205" y1="140" x2="230" y2="140" stroke="rgba(200,169,81,0.3)" strokeWidth="1"/>
                <text x="150" y="250" fontFamily="DM Sans,sans-serif" fontSize="10" fill="rgba(200,169,81,0.4)" textAnchor="middle" letterSpacing="4">#1UNITY</text>
              </svg>
            </div>
            <div style={{
              position: "absolute", bottom: 0, right: 0, width: "50%", height: "48%",
              background: "linear-gradient(135deg,var(--dark3),var(--dark2))",
              border: "1px solid rgba(26,107,138,0.2)",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: 24,
            }}>
              <span style={{ fontFamily: "var(--font-playfair)", fontSize: 52, fontWeight: 700, color: "var(--gold)", lineHeight: 1 }}>20+</span>
              <span style={{ fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gray)", textAlign: "center", fontFamily: "var(--font-dm-sans)" }}>
                Years Combined<br />Experience
              </span>
            </div>
          </div>

          {/* Text + Points */}
          <div className="reveal reveal-delay">
            <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
              Why Choose Wahda1
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 28 }}>
              United in<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Excellence</em>
            </h2>
            <p style={{ fontSize: 13, lineHeight: 2, color: "var(--gray)", marginBottom: 32, fontFamily: "var(--font-dm-sans)" }}>
              We are Humanitarians first — driven by a mission to make quality real estate accessible to all. Wahda1 means Unity, and we bring buyers, sellers, investors, and developers together under one roof.
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {points.map((pt, i) => (
                <div
                  key={pt.id}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 20,
                    padding: "24px 0",
                    borderBottom: i < points.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <div style={{
                    width: 48, height: 48,
                    background: "rgba(200,169,81,0.08)",
                    border: "1px solid rgba(200,169,81,0.15)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20, flexShrink: 0, borderRadius: 4,
                    transition: "all 0.3s",
                  }}>
                    {pt.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 6, fontFamily: "var(--font-dm-sans)" }}>{pt.title}</div>
                    <div style={{ fontSize: 11, color: "var(--gray)", lineHeight: 1.7, fontFamily: "var(--font-dm-sans)" }}>{pt.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
