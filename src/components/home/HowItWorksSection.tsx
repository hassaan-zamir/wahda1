"use client";
export function HowItWorksSection() {
  const steps = [
    { icon: "📞", num: 1, title: "Contact Us",       desc: "Call or WhatsApp our team for a free initial consultation about your property needs." },
    { icon: "🔍", num: 2, title: "Property Search",  desc: "Our agents find the perfect match based on your budget, location, and requirements." },
    { icon: "🏡", num: 3, title: "Site Visit",       desc: "We arrange a physical site visit with full documentation and legal verification." },
    { icon: "📝", num: 4, title: "Deal & Docs",      desc: "Complete transparent documentation, registration, and transfer of ownership." },
    { icon: "🗝️", num: 5, title: "Handover",        desc: "Receive your keys and enjoy full after-sale support and property management." },
  ];

  return (
    <section style={{
      background: "var(--dark2)", padding: "110px 60px",
      borderTop: "1px solid rgba(255,255,255,0.04)",
    }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
            Simple Process
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(32px,4vw,54px)", fontWeight: 700 }}>
            How It <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Works</em>
          </h2>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(5,1fr)",
          gap: 0, position: "relative",
        }}>
          {/* Connector line */}
          <div style={{
            position: "absolute", top: 48, left: "10%", right: "10%",
            height: 1, background: "rgba(200,169,81,0.2)",
          }} />

          {steps.map((step) => (
            <div
              key={step.num}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 20px", position: "relative" }}
            >
              <div
                style={{
                  width: 96, height: 96, borderRadius: "50%",
                  border: "1px solid rgba(200,169,81,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "var(--dark3)", marginBottom: 28,
                  position: "relative", zIndex: 1, transition: "all 0.4s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "var(--dark3)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200,169,81,0.3)";
                }}
              >
                <span style={{ fontSize: 28 }}>{step.icon}</span>
                <span style={{
                  position: "absolute", top: -10, right: -10,
                  width: 26, height: 26, borderRadius: "50%",
                  background: "var(--gold)", color: "var(--deep)",
                  fontSize: 10, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-dm-sans)",
                }}>
                  {step.num}
                </span>
              </div>
              <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 16, fontWeight: 600, marginBottom: 10 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 10, lineHeight: 1.8, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
