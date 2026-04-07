"use client";

import { useEffect, useRef } from "react";

interface Testimonial {
  id: string;
  name: string;
  initials: string;
  role?: string | null;
  content: string;
  rating: number;
}

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--dark2)", padding: "110px 60px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
            Client Reviews
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, lineHeight: 1.1 }}>
            What Our<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Clients Say</em>
          </h2>
        </div>

        <div className="reveal" style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 2, background: "rgba(200,169,81,0.06)",
        }}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              style={{ background: "var(--dark2)", padding: "48px 40px", transition: "background 0.4s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--dark3)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--dark2)")}
            >
              <div style={{ color: "var(--gold)", fontSize: 13, letterSpacing: "3px", marginBottom: 16 }}>
                {"★".repeat(t.rating)}
              </div>
              <span style={{
                fontFamily: "var(--font-playfair)", fontSize: 80,
                color: "rgba(200,169,81,0.1)", lineHeight: 1,
                marginBottom: -16, display: "block",
              }}>&ldquo;</span>
              <p style={{
                fontFamily: "var(--font-playfair)", fontSize: 17,
                fontWeight: 400, fontStyle: "italic", lineHeight: 1.7,
                color: "rgba(244,240,230,0.85)", marginBottom: 32,
              }}>
                {t.content}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%",
                  background: "linear-gradient(135deg,#8B6E28,#C8A951)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-playfair)", fontSize: 16, color: "var(--deep)", fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3, fontFamily: "var(--font-dm-sans)" }}>{t.name}</div>
                  <div style={{ fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-dm-sans)" }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
