export function TickerSection() {
  const items = [
    "Faisal Hills", "Residential Plots", "Commercial Plots",
    "Villas & Houses", "Shops & Outlets", "Luxury Apartments",
    "Construction Services", "OneWorldOneHome",
  ];

  // Duplicate for seamless loop
  const all = [...items, ...items];

  return (
    <div style={{
      background: "var(--dark2)",
      borderTop: "1px solid rgba(200,169,81,0.12)",
      borderBottom: "1px solid rgba(200,169,81,0.12)",
      padding: "16px 0", overflow: "hidden",
    }}>
      <div
        className="animate-ticker"
        style={{ display: "flex", whiteSpace: "nowrap" }}
      >
        {all.map((item, i) => (
          <span key={i}>
            <span style={{
              fontSize: 9, letterSpacing: "4px", textTransform: "uppercase",
              color: "var(--gray)", padding: "0 32px",
              fontFamily: "var(--font-dm-sans)",
            }}>
              {item}
            </span>
            <span style={{ color: "var(--gold)", padding: "0 4px" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
