"use client";

import { useEffect, useRef } from "react";

export function CTAContactSection({ info }: { info: any }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-[140px] px-4 md:px-[60px]" style={{
      position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 50% 50%, rgba(200,169,81,0.07) 0%, transparent 65%), var(--deep)`,
      }} />
      <div style={{ position: "absolute", left: 60, right: 60, top: 0, height: 1, background: "linear-gradient(to right,transparent,rgba(200,169,81,0.3),transparent)" }} />
      <div style={{ position: "absolute", left: 60, right: 60, bottom: 0, height: 1, background: "linear-gradient(to right,transparent,rgba(200,169,81,0.3),transparent)" }} />

      <div className="reveal" style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
        <span style={{ fontSize: 48, marginBottom: 24, display: "block" }}>🏡</span>
        <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20, fontFamily: "var(--font-dm-sans)" }}>
          Let&apos;s Find Your Property
        </p>
        <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(36px,5vw,68px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Start Your<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Journey Today</em>
        </h2>
        <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 2, marginBottom: 52, letterSpacing: "0.5px", fontFamily: "var(--font-dm-sans)" }}>
          Whether you&apos;re buying, selling, investing, or building — Wahda1 is your trusted partner.
          Get a free consultation with our expert team today.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 30, flexWrap: "wrap", marginBottom: 32 }}>
          {info?.phone && (
            <a href={`tel:${info.phone}`} style={{
              background: "var(--gold)", color: "var(--deep)", padding: "16px 36px",
              fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "2px",
              textTransform: "uppercase", fontWeight: 700, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>📞</span> Call {info.phone}
            </a>
          )}
          {info?.whatsapp && (
            <a href={`https://wa.me/${info.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{
              background: "rgba(200,169,81,0.1)", border: "1px solid var(--gold)", color: "var(--gold)", 
              padding: "16px 36px", fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "2px",
              textTransform: "uppercase", fontWeight: 700, textDecoration: "none",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ fontSize: 16 }}>💬</span> WhatsApp Us
            </a>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[
            { icon: "📧", text: info?.email || "info@wahda1.com" },
            { icon: "🏢", text: info?.address || "Faisal Hills Office" },
          ].map((item) => (
            <div key={item.text} style={{
              display: "flex", alignItems: "center", gap: 10,
              fontSize: 12, color: "var(--light)", fontFamily: "var(--font-dm-sans)",
            }}>
              <span style={{ color: "var(--gold)", fontSize: 16 }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
