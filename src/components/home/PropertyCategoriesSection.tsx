"use client";

import { useEffect, useRef } from "react";

interface Category {
  id: string;
  icon: string;
  name: string;
  description: string;
  countLabel: string;
  order: number;
}

export function PropertyCategoriesSection({ categories }: { categories: Category[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="categories" ref={sectionRef}>
      <div style={{ padding: "110px 60px", maxWidth: 1400, margin: "0 auto" }}>
        <div className="reveal sec-head" style={{ marginBottom: 64 }}>
          <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
            Browse by Category
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, lineHeight: 1.1 }}>
            All Types of<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Properties</em>
          </h2>
          <p style={{ fontSize: 13, lineHeight: 2, color: "var(--gray)", maxWidth: 560, marginTop: 16, fontFamily: "var(--font-dm-sans)" }}>
            From residential plots to commercial spaces — Wahda1 is your one-stop destination for every real estate need in Faisal Hills.
          </p>
        </div>

        <div className="reveal" style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)",
          gap: 2, background: "rgba(200,169,81,0.08)",
        }}>
          {categories.map((cat, i) => (
            <div
              key={cat.id}
              style={{
                background: "var(--dark2)", padding: "44px 36px",
                position: "relative", overflow: "hidden",
                transition: "background 0.4s", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--dark3)";
                const bar = (e.currentTarget as HTMLElement).querySelector(".hover-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--dark2)";
                const bar = (e.currentTarget as HTMLElement).querySelector(".hover-bar") as HTMLElement;
                if (bar) bar.style.transform = "scaleX(0)";
              }}
            >
              <div className="hover-bar" style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
                background: "var(--gold)", transform: "scaleX(0)", transition: "transform 0.4s",
              }} />
              <span style={{
                fontFamily: "var(--font-playfair)", fontSize: 80,
                fontWeight: 700, color: "rgba(200,169,81,0.05)",
                position: "absolute", top: 10, right: 20, lineHeight: 1,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{ fontSize: 36, marginBottom: 24, display: "block" }}>{cat.icon}</span>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
                {cat.name}
              </h3>
              <p style={{ fontSize: 11, lineHeight: 1.9, color: "var(--gray)", marginBottom: 20, fontFamily: "var(--font-dm-sans)" }}>
                {cat.description}
              </p>
              <span style={{ fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-dm-sans)" }}>
                {cat.countLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
