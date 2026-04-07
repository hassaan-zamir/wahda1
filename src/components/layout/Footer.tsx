"use client";
import Link from "next/link";

export function Footer() {
  const properties = ["Residential Plots", "Commercial Plots", "Villas & Houses", "Apartments", "Shops & Plazas", "Off-Plan Projects"];
  const services   = ["Faisal Hills", "Construction", "Interior Design", "Property Mgmt", "Investment Advisory", "Legal Assistance"];
  const company    = ["About Wahda1", "Our Mission", "Brand Partners", "Careers", "Blog & News", "Contact Us"];

  return (
    <footer className="py-10 md:pt-[80px] md:pb-[40px] px-4 md:px-[60px]" style={{
      background: "var(--dark2)",
      borderTop: "1px solid rgba(200,169,81,0.1)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Top 4-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1fr] gap-10 lg:gap-[60px] mb-10 lg:mb-16">
          {/* Brand */}
          <div>
            <span style={{
              fontFamily: "var(--font-playfair)", fontSize: 28,
              fontWeight: 700, color: "var(--gold)", letterSpacing: "5px",
              display: "block", marginBottom: 6,
            }}>WAHDA1</span>
            <span style={{
              fontSize: 8, letterSpacing: "4px", textTransform: "uppercase",
              color: "rgba(200,169,81,0.5)", marginBottom: 20, display: "block",
              fontFamily: "var(--font-dm-sans)",
            }}>
              #1 Unity Estate · OneWorldOneHome · Humanitarians
            </span>
            <p style={{
              fontFamily: "var(--font-playfair)", fontStyle: "italic",
              fontSize: 14, color: "var(--gold2)", marginBottom: 16, opacity: 0.7,
            }}>
              &ldquo;One World. One Home. One Vision.&rdquo;
            </p>
            <p style={{ fontSize: 11, lineHeight: 2, color: "var(--gray)", maxWidth: 280, fontFamily: "var(--font-dm-sans)" }}>
              Wahda1 is Pakistan&apos;s trusted real estate platform connecting people with premium properties in Faisal Hills and beyond. We believe everyone deserves a home.
            </p>
          </div>

          {/* Links columns */}
          {[
            { title: "Properties", links: properties },
            { title: "Services",   links: services },
            { title: "Company",    links: company },
          ].map((col) => (
            <div key={col.title}>
              <p style={{
                fontSize: 8, letterSpacing: "4px", textTransform: "uppercase",
                color: "var(--gold)", marginBottom: 24,
                fontFamily: "var(--font-dm-sans)", fontWeight: 600,
              }}>
                {col.title}
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{
                      color: "var(--gray)", textDecoration: "none", fontSize: 11,
                      letterSpacing: "0.5px", transition: "color 0.3s",
                      fontFamily: "var(--font-dm-sans)",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--white)")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--gray)")}>
                      <span style={{ color: "var(--gold)", marginRight: 8 }}>›</span>{l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", marginBottom: 32 }} />

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 10, color: "var(--gray)", letterSpacing: "0.5px", fontFamily: "var(--font-dm-sans)" }}>
            © 2026 Wahda1 — #1 Unity Estate · OneWorldOneHome · Humanitarians. All Rights Reserved.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["f", "ig", "yt", "wa"].map((s) => (
              <a key={s} href="#" style={{
                width: 36, height: 36,
                border: "1px solid rgba(200,169,81,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--gray)", fontSize: 11, fontWeight: 700,
                textDecoration: "none", transition: "all 0.3s",
                fontFamily: "var(--font-dm-sans)",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,81,0.2)"; (e.currentTarget as HTMLElement).style.color = "var(--gray)"; }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
