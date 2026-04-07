"use client";

import { useState, useEffect, useRef } from "react";

interface Property {
  id: string;
  title: string;
  slug: string;
  type: string;
  typelabel: string;
  price: string;
  location: string;
  badge: string;
  size?: string | null;
  detail1Label?: string | null;
  detail1Value?: string | null;
  detail2Label?: string | null;
  detail2Value?: string | null;
  status: string;
}

const FILTERS = [
  { label: "All",              value: "all" },
  { label: "Residential Plot", value: "residential" },
  { label: "Commercial Plot",  value: "commercial" },
  { label: "Villa",            value: "villa" },
  { label: "Apartment",        value: "apartment" },
  { label: "Shop",             value: "shop" },
];

const BADGE_COLORS: Record<string, string> = {
  "Available": "var(--gold)",
  "Hot Deal":  "#B04030",
  "New":       "#2490B5",
  "Sold Out":  "#4A9060",
};

export function AvailablePropertiesSection({ properties }: { properties: Property[] }) {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = filter === "all" ? properties : properties.filter((p) => p.type === filter);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="properties" ref={sectionRef}>
      <div className="py-16 md:py-[110px] px-4 md:px-[60px] max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 64 }}>
          <div>
            <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
              Featured Listings
            </p>
            <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, lineHeight: 1.1 }}>
              Available<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Properties</em>
            </h2>
          </div>
          <a href="/projects/faisal-hills" style={{
            border: "1px solid rgba(200,169,81,0.4)", color: "var(--gold)",
            padding: "12px 28px", fontSize: 9, letterSpacing: "2px",
            textTransform: "uppercase", textDecoration: "none",
            fontFamily: "var(--font-dm-sans)", transition: "all 0.3s",
          }}>
            View All Listings
          </a>
        </div>

        {/* Filters */}
        <div className="reveal flex flex-wrap gap-2 mb-10 justify-center sm:justify-start">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              style={{
                padding: "10px 24px", fontSize: 9, letterSpacing: "2px",
                textTransform: "uppercase",
                background: filter === f.value ? "var(--gold)" : "var(--dark2)",
                border: `1px solid ${filter === f.value ? "var(--gold)" : "rgba(255,255,255,0.06)"}`,
                color: filter === f.value ? "var(--deep)" : "var(--gray)",
                cursor: "pointer", transition: "all 0.3s",
                fontFamily: "var(--font-dm-sans)",
                fontWeight: filter === f.value ? 600 : 400,
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((prop) => (
            <div
              key={prop.id}
              style={{
                background: "var(--dark2)",
                border: "1px solid rgba(255,255,255,0.04)",
                overflow: "hidden", transition: "border-color 0.4s, transform 0.4s",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,81,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              {/* Image placeholder */}
              <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
                <div style={{
                  width: "100%", height: "100%",
                  background: "linear-gradient(145deg,var(--dark3),var(--dark))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 48,
                }}>
                  {prop.type === "residential" ? "🏡" :
                   prop.type === "commercial"  ? "🏢" :
                   prop.type === "villa"       ? "🏰" :
                   prop.type === "apartment"   ? "🏙️" :
                   prop.type === "shop"        ? "🏬" : "🏗️"}
                </div>
                <span style={{
                  position: "absolute", top: 16, left: 16,
                  background: BADGE_COLORS[prop.badge] || "var(--gold)",
                  color: "var(--deep)",
                  fontSize: 7, letterSpacing: "2px", textTransform: "uppercase",
                  padding: "5px 12px", fontWeight: 700,
                  fontFamily: "var(--font-dm-sans)",
                }}>
                  {prop.badge}
                </span>
              </div>

              {/* Body */}
              <div style={{ padding: 24 }}>
                <p style={{ fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8, fontFamily: "var(--font-dm-sans)" }}>
                  {prop.typelabel}
                </p>
                <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 18, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>
                  {prop.title}
                </h3>
                <p style={{ fontSize: 10, color: "var(--gray)", marginBottom: 16, fontFamily: "var(--font-dm-sans)" }}>
                  📍 {prop.location}
                </p>

                {/* Details */}
                <div style={{
                  display: "flex", gap: 16,
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: 16, marginBottom: 16,
                }}>
                  {prop.size && (
                    <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
                      <strong style={{ display: "block", color: "var(--white)", fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{prop.size}</strong>
                      Size
                    </div>
                  )}
                  {prop.detail1Label && (
                    <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
                      <strong style={{ display: "block", color: "var(--white)", fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{prop.detail1Label}</strong>
                      {prop.detail1Value}
                    </div>
                  )}
                  {prop.detail2Label && (
                    <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
                      <strong style={{ display: "block", color: "var(--white)", fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{prop.detail2Label}</strong>
                      {prop.detail2Value}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-playfair)", fontSize: 20, fontWeight: 700, color: "var(--gold)" }}>
                    {prop.price}
                  </span>
                  <button
                    disabled={prop.status === "Sold"}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(200,169,81,0.3)",
                      color: "var(--gold)", padding: "8px 18px",
                      fontSize: 8, letterSpacing: "2px", textTransform: "uppercase",
                      cursor: prop.status === "Sold" ? "not-allowed" : "pointer",
                      transition: "all 0.3s",
                      fontFamily: "var(--font-dm-sans)",
                      opacity: prop.status === "Sold" ? 0.4 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (prop.status !== "Sold") {
                        (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                        (e.currentTarget as HTMLElement).style.color = "var(--deep)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (prop.status !== "Sold") {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                        (e.currentTarget as HTMLElement).style.color = "var(--gold)";
                      }
                    }}
                  >
                    {prop.status === "Sold" ? "Sold" : "Inquire"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
