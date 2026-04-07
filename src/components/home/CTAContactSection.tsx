"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";

export function CTAContactSection() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to submit. Please try again.");
      } else {
        toast.success("Thank you! Our team will contact you shortly.");
        setInput("");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: "140px 60px", position: "relative", overflow: "hidden", textAlign: "center",
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

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 0, maxWidth: 500, margin: "0 auto 32px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your name or phone number..."
            style={{
              flex: 1, background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(200,169,81,0.25)", borderRight: "none",
              color: "var(--white)", padding: "16px 24px",
              fontFamily: "var(--font-dm-sans)", fontSize: 12, outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "var(--gray)" : "var(--gold)",
              border: "1px solid var(--gold)",
              color: "var(--deep)", padding: "16px 36px",
              fontFamily: "var(--font-dm-sans)", fontSize: 9,
              letterSpacing: "3px", textTransform: "uppercase",
              fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
          >
            {loading ? "Sending..." : "Get Callback"}
          </button>
        </form>

        <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
          {[
            { icon: "📞", text: "+92 300 0000000" },
            { icon: "💬", text: "WhatsApp Available" },
            { icon: "🏢", text: "Faisal Hills Office" },
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
