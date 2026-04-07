export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";

const BADGE_COLORS: Record<string, string> = {
  "Available": "#C8A951",
  "Hot Deal":  "#B04030",
  "New":       "#2490B5",
  "Sold Out":  "#4A9060",
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const project = await prisma.flagshipProject.findUnique({
    where: { slug },
    include: { properties: { orderBy: { createdAt: "asc" } } },
  });

  if (!project) notFound();

  const features = (project.features as Array<{ icon: string; name: string; value: string }>) || [];

  return (
    <div style={{ background: "var(--deep)", minHeight: "100vh", paddingTop: 72 }}>
      {/* Hero */}
      <section style={{
        background: "var(--dark2)", padding: "80px 60px",
        position: "relative", overflow: "hidden",
        borderBottom: "1px solid rgba(200,169,81,0.12)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 70% 50%, rgba(26,107,138,0.12) 0%, transparent 55%)",
        }} />
        <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link href="/" style={{
            fontSize: 9, letterSpacing: "3px", textTransform: "uppercase",
            color: "var(--gray)", textDecoration: "none",
            fontFamily: "var(--font-dm-sans)",
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 32,
          }}>
            ← Back to Home
          </Link>

          <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14, fontFamily: "var(--font-dm-sans)" }}>
            Flagship Project
          </p>
          <h1 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(40px,5vw,72px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
            {project.name}
            <em style={{ fontStyle: "italic", color: "var(--gold)" }}> — {project.subtitle || project.location}</em>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 2, color: "var(--gray)", maxWidth: 600, fontFamily: "var(--font-dm-sans)" }}>
            {project.description}
          </p>

          {/* Feature badges */}
          {features.length > 0 && (
            <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
              {features.map((f, i) => (
                <div key={i} style={{
                  background: "rgba(200,169,81,0.06)",
                  border: "1px solid rgba(200,169,81,0.15)",
                  padding: "12px 20px", display: "flex", alignItems: "center", gap: 10,
                }}>
                  <span style={{ fontSize: 18 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 500, fontFamily: "var(--font-dm-sans)" }}>{f.name}</div>
                    <div style={{ fontSize: 9, color: "var(--gold)", letterSpacing: 1, fontFamily: "var(--font-dm-sans)" }}>{f.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Properties Grid */}
      <section style={{ padding: "80px 60px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: "5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12, fontFamily: "var(--font-dm-sans)" }}>
                All Listings
              </p>
              <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(28px,3vw,44px)", fontWeight: 700 }}>
                Properties in <em style={{ color: "var(--gold)", fontStyle: "italic" }}>{project.name}</em>
              </h2>
            </div>
            <span style={{ fontSize: 12, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
              {project.properties.length} listings
            </span>
          </div>

          {project.properties.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}>
              No properties listed yet. Check back soon.
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {project.properties.map((prop: typeof project.properties[number]) => (
                <div
                  key={prop.id}
                  className="hover:border-[rgba(200,169,81,0.3)] hover:-translate-y-1"
                  style={{
                    background: "var(--dark2)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    overflow: "hidden", transition: "border-color 0.4s, transform 0.4s",
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ height: 200, background: "linear-gradient(145deg,var(--dark3),var(--dark))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", fontSize: 48 }}>
                    {prop.type === "residential" ? "🏡" : prop.type === "commercial" ? "🏢" : prop.type === "villa" ? "🏰" : prop.type === "apartment" ? "🏙️" : prop.type === "shop" ? "🏬" : "🏗️"}
                    <span style={{
                      position: "absolute", top: 16, left: 16,
                      background: BADGE_COLORS[prop.badge] || "var(--gold)",
                      color: "var(--deep)", fontSize: 7, letterSpacing: "2px",
                      textTransform: "uppercase", padding: "5px 12px", fontWeight: 700,
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
                    <h3 style={{ fontFamily: "var(--font-playfair)", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{prop.title}</h3>
                    <p style={{ fontSize: 10, color: "var(--gray)", marginBottom: 16, fontFamily: "var(--font-dm-sans)" }}>📍 {prop.location}</p>

                    <div style={{ display: "flex", gap: 16, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, marginBottom: 16 }}>
                      {prop.size && <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}><strong style={{ display: "block", color: "var(--white)", fontSize: 12, marginBottom: 2 }}>{prop.size}</strong>Size</div>}
                      {prop.detail1Label && <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}><strong style={{ display: "block", color: "var(--white)", fontSize: 12, marginBottom: 2 }}>{prop.detail1Label}</strong>{prop.detail1Value}</div>}
                      {prop.detail2Label && <div style={{ fontSize: 10, color: "var(--gray)", fontFamily: "var(--font-dm-sans)" }}><strong style={{ display: "block", color: "var(--white)", fontSize: 12, marginBottom: 2 }}>{prop.detail2Label}</strong>{prop.detail2Value}</div>}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-playfair)", fontSize: 20, fontWeight: 700, color: "var(--gold)" }}>{prop.price}</span>
                      <a href="#contact" style={{
                        background: "transparent",
                        border: "1px solid rgba(200,169,81,0.3)",
                        color: "var(--gold)", padding: "8px 18px",
                        fontSize: 8, letterSpacing: "2px", textTransform: "uppercase",
                        textDecoration: "none",
                        fontFamily: "var(--font-dm-sans)",
                        opacity: prop.status === "Sold" ? 0.4 : 1,
                        pointerEvents: prop.status === "Sold" ? "none" : "auto",
                      }}>
                        {prop.status === "Sold" ? "Sold" : "Inquire"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


