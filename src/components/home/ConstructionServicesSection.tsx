"use client";

import { useEffect, useRef } from "react";

interface ConstructionService {
  id: string;
  icon: string;
  title: string;
  description: string;
  bullets: string[];
}

export function ConstructionServicesSection({ services }: { services: ConstructionService[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="construction" ref={sectionRef} style={{ padding: "110px 0", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 30% 50%, rgba(200,169,81,0.06) 0%, transparent 55%)",
      }} />
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 60px", position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
            Build With Us
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, lineHeight: 1.1 }}>
            Construction<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Services</em>
          </h2>
          <p style={{ fontSize: 13, lineHeight: 2, color: "var(--gray)", maxWidth: 560, marginTop: 16, fontFamily: "var(--font-dm-sans)" }}>
            Wahda1 doesn&apos;t just sell properties — we build dreams. Our in-house construction team delivers quality structures on time and within budget across Faisal Hills.
          </p>
        </div>

        <div className="reveal" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 2, background: "rgba(200,169,81,0.08)",
        }}>
          {services.map((svc, i) => (
            <div
              key={svc.id}
              style={{
                background: "var(--dark2)", padding: "52px 44px",
                position: "relative", overflow: "hidden",
                transition: "background 0.4s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--dark3)";
                const bar = (e.currentTarget as HTMLElement).querySelector(".top-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--dark2)";
                const bar = (e.currentTarget as HTMLElement).querySelector(".top-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(0)";
              }}
            >
              <div className="top-bar" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: "var(--gold)", transform: "scaleX(0)", transition: "transform 0.4s",
              }} />
              <span style={{
                fontFamily: "var(--font-playfair)", fontSize: 90,
                fontWeight: 700, color: "rgba(200,169,81,0.04)",
                position: "absolute", top: 10, right: 20, lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 40, marginBottom: 28, display: "block" }}>{svc.icon}</span>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 24, fontWeight: 600, marginBottom: 16 }}>
                {svc.title}
              </h3>
              <p style={{ fontSize: 12, lineHeight: 2, color: "var(--gray)", marginBottom: 20, fontFamily: "var(--font-dm-sans)" }}>
                {svc.description}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {svc.bullets.map((b) => (
                  <li key={b} style={{
                    fontSize: 11, color: "var(--light)",
                    display: "flex", alignItems: "center", gap: 12,
                    fontFamily: "var(--font-dm-sans)",
                  }}>
                    <span style={{ width: 16, height: 1, background: "var(--gold)", flexShrink: 0, display: "inline-block" }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
