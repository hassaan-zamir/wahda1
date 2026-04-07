"use client";
export function SearchSection() {
  return (
    <div style={{
      background: "var(--dark2)",
      padding: "60px",
      borderBottom: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <h3 style={{
          fontFamily: "var(--font-playfair)", fontSize: 20,
          fontWeight: 400, marginBottom: 28, color: "var(--white)",
          display: "flex", alignItems: "center", gap: 16,
        }}>
          <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }} />
          Find Your Property
        </h3>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
          gap: 1,
          background: "rgba(200,169,81,0.1)",
        }}>
          {[
            {
              label: "Property Type",
              options: ["All Types", "Residential Plot", "Commercial Plot", "Villa", "Apartment", "Shop"],
            },
            {
              label: "Location",
              options: ["All Phases", "Faisal Hills - Phase 1", "Faisal Hills - Phase 2", "Faisal Hills - Phase 3", "Faisal Hills - Main Blvd"],
            },
            {
              label: "Budget (PKR)",
              options: ["Any Budget", "Under 50 Lac", "50 Lac – 1 Crore", "1 – 3 Crore", "3 Crore+"],
            },
            {
              label: "Size",
              options: ["Any Size", "3 Marla", "5 Marla", "7 Marla", "10 Marla", "1 Kanal"],
            },
          ].map((field) => (
            <div key={field.label} style={{
              background: "var(--dark3)", padding: "22px 28px",
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              <label style={{
                fontSize: 8, letterSpacing: "3px", textTransform: "uppercase",
                color: "var(--gold)", fontFamily: "var(--font-dm-sans)",
              }}>
                {field.label}
              </label>
              <select style={{
                background: "transparent", border: "none",
                color: "var(--white)", fontFamily: "var(--font-dm-sans)",
                fontSize: 13, outline: "none", cursor: "pointer",
              }}>
                {field.options.map((o) => (
                  <option key={o} style={{ background: "var(--dark3)" }}>{o}</option>
                ))}
              </select>
            </div>
          ))}
          <button
            style={{
              background: "var(--gold)", border: "none",
              padding: "22px 40px", color: "var(--deep)",
              fontSize: 9, letterSpacing: "3px", textTransform: "uppercase",
              fontWeight: 600, fontFamily: "var(--font-dm-sans)",
              cursor: "pointer", transition: "background 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--gold2)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "var(--gold)")}
          >
            Search →
          </button>
        </div>
      </div>
    </div>
  );
}
