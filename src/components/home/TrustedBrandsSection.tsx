"use client";

import { useEffect, useRef } from "react";

interface TrustedBrand {
  id: string;
  name: string;
  initials: string;
  bgColor: string;
  textColor: string;
  roleTag: string;
  description: string;
  propTypes: string[];
}

export function TrustedBrandsSection({ brands }: { brands: TrustedBrand[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="brands" ref={sectionRef} className="py-16 md:py-[100px] px-4 md:px-[60px]" style={{
      background: "var(--dark2)",
      borderTop: "1px solid rgba(200,169,81,0.08)",
      borderBottom: "1px solid rgba(200,169,81,0.08)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
            Our Partners
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700, lineHeight: 1.1 }}>
            Trusted <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Brands</em><br />We Market
          </h2>
          <p style={{ fontSize: 13, lineHeight: 2, color: "var(--gray)", maxWidth: 560, marginTop: 16, fontFamily: "var(--font-dm-sans)" }}>
            Wahda1 is the authorized marketing partner for Pakistan&apos;s leading real estate developers — bringing you verified projects with full transparency.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]" style={{
          background: "rgba(200,169,81,0.06)",
        }}>
          {brands.map((brand) => (
            <div
              key={brand.id}
              style={{
                background: "var(--dark2)", padding: "44px 32px",
                display: "flex", flexDirection: "column", gap: 16,
                borderBottom: "2px solid transparent",
                transition: "all 0.4s", cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--dark3)";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--gold)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--dark2)";
                (e.currentTarget as HTMLElement).style.borderBottomColor = "transparent";
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: 8,
                background: brand.bgColor,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-playfair)", fontSize: 22, fontWeight: 700,
                color: brand.textColor,
              }}>
                {brand.initials}
              </div>
              <div style={{ fontFamily: "var(--font-playfair)", fontSize: 20, fontWeight: 600 }}>
                {brand.name}
              </div>
              <div style={{ fontSize: 8, letterSpacing: "3px", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--font-dm-sans)" }}>
                {brand.roleTag}
              </div>
              <p style={{ fontSize: 11, lineHeight: 1.8, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
                {brand.description}
              </p>
              <div style={{ display: "flex", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
                {brand.propTypes.map((pt) => (
                  <span key={pt} style={{
                    fontSize: 10, color: "var(--light)",
                    display: "flex", alignItems: "center", gap: 6,
                    fontFamily: "var(--font-dm-sans)",
                  }}>
                    <span style={{ color: "var(--gold)" }}>›</span>{pt}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 48 }} className="reveal">
          <a href="#contact" style={{
            border: "1px solid rgba(200,169,81,0.4)", color: "var(--gold)",
            padding: "16px 44px", fontSize: 10, letterSpacing: "3px",
            textTransform: "uppercase", textDecoration: "none",
            fontFamily: "var(--font-dm-sans)", display: "inline-block",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(200,169,81,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
            Become a Partner Brand
          </a>
        </div>
      </div>
    </section>
  );
}
