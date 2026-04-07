"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface Feature { icon: string; name: string; value: string; }
interface FlagshipProject {
  id: string;
  name: string;
  slug: string;
  subtitle?: string | null;
  location: string;
  description: string;
  badge?: string | null;
  ribbon?: string | null;
  accentTitle?: string | null;
  accentSub?: string | null;
  accentNote?: string | null;
  features: Feature[];
}

export function FlagshipProjectsSection({ projects }: { projects: FlagshipProject[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {projects.map((proj) => (
        <section key={proj.id} id="faisal-hills" style={{
          background: "var(--dark2)", padding: "110px 0", position: "relative", overflow: "hidden",
        }}>
          {/* Background */}
          <div style={{
            position: "absolute", inset: 0,
            background: `
              radial-gradient(ellipse at 80% 50%, rgba(26,107,138,0.12) 0%, transparent 55%),
              radial-gradient(ellipse at 10% 50%, rgba(200,169,81,0.06) 0%, transparent 45%)
            `,
          }} />

          <div style={{
            maxWidth: 1400, margin: "0 auto", padding: "0 60px",
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center",
            position: "relative", zIndex: 1,
          }}>
            {/* Visual */}
            <div className="reveal" style={{ position: "relative", height: 580 }}>
              {/* Map card */}
              <div style={{
                position: "absolute", top: 0, left: 0, width: "78%", height: "70%",
                background: "linear-gradient(145deg,var(--dark3),var(--dark))",
                border: "1px solid rgba(200,169,81,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
              }}>
                <svg width="90%" height="90%" viewBox="0 0 420 340" fill="none">
                  <rect x="20" y="20" width="380" height="300" stroke="rgba(200,169,81,0.15)" strokeWidth="1" fill="none"/>
                  <line x1="20" y1="170" x2="400" y2="170" stroke="rgba(200,169,81,0.2)" strokeWidth="2"/>
                  <line x1="210" y1="20" x2="210" y2="320" stroke="rgba(200,169,81,0.2)" strokeWidth="2"/>
                  <rect x="30" y="30" width="80" height="60" fill="rgba(200,169,81,0.06)" stroke="rgba(200,169,81,0.15)" strokeWidth="0.5"/>
                  <rect x="120" y="30" width="80" height="60" fill="rgba(26,107,138,0.08)" stroke="rgba(26,107,138,0.2)" strokeWidth="0.5"/>
                  <rect x="220" y="30" width="80" height="60" fill="rgba(200,169,81,0.06)" stroke="rgba(200,169,81,0.15)" strokeWidth="0.5"/>
                  <rect x="310" y="30" width="80" height="60" fill="rgba(42,122,75,0.08)" stroke="rgba(42,122,75,0.2)" strokeWidth="0.5"/>
                  <rect x="30" y="180" width="80" height="60" fill="rgba(200,169,81,0.06)" stroke="rgba(200,169,81,0.15)" strokeWidth="0.5"/>
                  <rect x="120" y="180" width="80" height="60" fill="rgba(26,107,138,0.08)" stroke="rgba(26,107,138,0.2)" strokeWidth="0.5"/>
                  <rect x="220" y="180" width="170" height="130" fill="rgba(200,169,81,0.1)" stroke="rgba(200,169,81,0.3)" strokeWidth="1"/>
                  <text x="70" y="64" fill="rgba(200,169,81,0.5)" fontSize="8" textAnchor="middle">Block A</text>
                  <text x="160" y="64" fill="rgba(26,107,138,0.8)" fontSize="8" textAnchor="middle">Block B</text>
                  <text x="260" y="64" fill="rgba(200,169,81,0.5)" fontSize="8" textAnchor="middle">Block C</text>
                  <text x="350" y="64" fill="rgba(42,122,75,0.8)" fontSize="8" textAnchor="middle">Block D</text>
                  <text x="70" y="214" fill="rgba(200,169,81,0.5)" fontSize="8" textAnchor="middle">Sector E</text>
                  <text x="160" y="214" fill="rgba(26,107,138,0.8)" fontSize="8" textAnchor="middle">Sector F</text>
                  <text x="305" y="248" fill="rgba(200,169,81,0.8)" fontSize="10" textAnchor="middle" fontWeight="600">Commercial</text>
                  <text x="305" y="263" fill="rgba(200,169,81,0.6)" fontSize="8" textAnchor="middle">Zone</text>
                  <text x="210" y="165" fill="rgba(200,169,81,0.6)" fontSize="8" textAnchor="middle">Main Boulevard</text>
                  <circle cx="210" cy="170" r="6" fill="rgba(200,169,81,0.8)"/>
                  <circle cx="210" cy="170" r="12" stroke="rgba(200,169,81,0.3)" strokeWidth="1" fill="none"/>
                </svg>
              </div>

              {/* Accent card */}
              <div style={{
                position: "absolute", bottom: 0, right: 0, width: "52%", height: "44%",
                background: "linear-gradient(145deg,#0a1525,#0f2040)",
                border: "1px solid rgba(26,107,138,0.25)",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: 28,
              }}>
                <div style={{ fontFamily: "var(--font-playfair)", fontSize: 16, fontWeight: 600, color: "var(--gold)", marginBottom: 6 }}>
                  {proj.accentTitle}
                </div>
                <div style={{ fontSize: 10, color: "var(--gray)", letterSpacing: 1 }}>
                  {proj.accentSub}
                </div>
                {proj.accentNote && (
                  <div style={{ fontSize: 10, color: "#2490B5", marginTop: 6, letterSpacing: 1 }}>
                    {proj.accentNote}
                  </div>
                )}
              </div>

              {/* Ribbon */}
              {proj.ribbon && (
                <div style={{
                  position: "absolute", top: 24, right: -12,
                  background: "var(--gold)", color: "var(--deep)",
                  fontSize: 8, letterSpacing: "2px", textTransform: "uppercase",
                  padding: "8px 20px", fontWeight: 700, zIndex: 2,
                  fontFamily: "var(--font-dm-sans)",
                }}>
                  {proj.ribbon}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="reveal reveal-delay">
              <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
                Our Flagship Project
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                {proj.name} —<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>{proj.subtitle || proj.location}</em>
              </h2>
              <p style={{ fontSize: 13, lineHeight: 2, color: "var(--gray)", maxWidth: 540, fontFamily: "var(--font-dm-sans)" }}>
                {proj.description}
              </p>

              {/* Features 2x2 */}
              {proj.features.length > 0 && (
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: 1, background: "rgba(200,169,81,0.08)",
                  margin: "32px 0",
                }}>
                  {proj.features.map((f, i) => (
                    <div key={i} style={{ background: "var(--dark3)", padding: "22px 24px" }}>
                      <span style={{ fontSize: 20, marginBottom: 10, display: "block" }}>{f.icon}</span>
                      <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 4, fontFamily: "var(--font-dm-sans)" }}>{f.name}</div>
                      <div style={{ fontSize: 10, color: "var(--gold)", letterSpacing: 1, fontFamily: "var(--font-dm-sans)" }}>{f.value}</div>
                    </div>
                  ))}
                </div>
              )}

              <Link href={`/projects/${proj.slug}`} style={{
                background: "var(--gold)", color: "var(--deep)",
                padding: "16px 44px", fontSize: 10, letterSpacing: "3px",
                textTransform: "uppercase", textDecoration: "none",
                fontWeight: 600, fontFamily: "var(--font-dm-sans)",
                display: "inline-block", transition: "all 0.3s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold2)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--gold)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                View {proj.name} Properties
              </Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
