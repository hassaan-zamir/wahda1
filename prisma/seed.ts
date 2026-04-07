import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin User ──────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.adminUser.upsert({
    where: { email: "admin@wahda1.com" },
    update: {},
    create: {
      email: "admin@wahda1.com",
      password: hashedPassword,
      name: "Wahda1 Admin",
    },
  });
  console.log("✅ Admin user created");

  // ── Hero Stats ──────────────────────────────────────────────────
  const heroStats = [
    { value: "500+", label: "Properties Listed", order: 1 },
    { value: "15+",  label: "Brand Partners",    order: 2 },
    { value: "1K+",  label: "Happy Clients",     order: 3 },
  ];
  await prisma.heroStat.deleteMany();
  await prisma.heroStat.createMany({ data: heroStats });
  console.log("✅ Hero stats seeded");

  // ── Site Stats ──────────────────────────────────────────────────
  await prisma.siteStats.upsert({
    where: { key: "years_experience" },
    update: {},
    create: { key: "years_experience", value: "20+", label: "Years Combined Experience" },
  });
  console.log("✅ Site stats seeded");

  // ── Company Info ────────────────────────────────────────────────
  const companyInfoCount = await prisma.companyInfo.count();
  if (companyInfoCount === 0) {
    await prisma.companyInfo.create({
      data: {
        phone: "+92 300 0000000",
        whatsapp: "+92 300 0000000",
        email: "info@wahda1.com",
        address: "Faisal Hills, Taxila"
      }
    });
    console.log("✅ Company Info seeded");
  }

  // ── Property Categories ─────────────────────────────────────────
  const categories = [
    { icon: "🏡", name: "Residential Plots",  description: "3 Marla to 1 Kanal residential plots available in all phases of Faisal Hills. Prime locations with easy installment plans.", countLabel: "120+ Available", order: 1 },
    { icon: "🏢", name: "Commercial Plots",   description: "High-visibility commercial plots on main boulevards and market areas. Ideal for business, retail, and investment.",             countLabel: "65+ Available",  order: 2 },
    { icon: "🏰", name: "Villas & Houses",    description: "Elegant ready-to-move and under-construction villas with modern architecture and premium finishes.",                         countLabel: "45+ Available",  order: 3 },
    { icon: "🏬", name: "Shops & Outlets",   description: "Prime commercial shops in dedicated plazas and market areas for retail businesses and investment purposes.",                 countLabel: "80+ Available",  order: 4 },
    { icon: "🏙️", name: "Apartments",        description: "Modern 1, 2 & 3 bedroom apartments with top-tier facilities including parking, gym, and 24/7 security.",                   countLabel: "90+ Available",  order: 5 },
    { icon: "🏗️", name: "Off-Plan Projects", description: "Invest early at pre-launch prices in upcoming developments. Maximum returns with flexible payment plans.",                  countLabel: "10+ Projects",   order: 6 },
  ];
  await prisma.propertyCategory.deleteMany();
  await prisma.propertyCategory.createMany({ data: categories });
  console.log("✅ Property categories seeded");

  // ── Flagship Project: Faisal Hills ─────────────────────────────
  await prisma.property.deleteMany();
  await prisma.flagshipProject.deleteMany();

  const faisalHills = await prisma.flagshipProject.create({
    data: {
      name:        "Faisal Hills",
      slug:        "faisal-hills",
      subtitle:    "Taxila",
      location:    "Taxila · Rawalpindi",
      description: "Faisal Hills is one of Pakistan's fastest-growing housing societies, located in Taxila near Rawalpindi. Wahda1 is a proud authorized marketing partner bringing you exclusive deals across all blocks and phases.",
      badge:       "RDA Approved · NOC Verified",
      ribbon:      "Prime Location",
      accentTitle: "Faisal Hills",
      accentSub:   "📍 Taxila · Rawalpindi",
      accentNote:  "RDA Approved · NOC Verified",
      features: [
        { icon: "✅", name: "RDA Approved",      value: "Fully Legal · NOC Verified" },
        { icon: "🛣️", name: "Prime Location",    value: "Near GT Road · M-1 Motorway" },
        { icon: "💳", name: "Easy Installments", value: "3–5 Year Payment Plans" },
        { icon: "📈", name: "High ROI",           value: "30–50% Growth Expected" },
      ],
      order: 1,
    },
  });

  // ── Properties ──────────────────────────────────────────────────
  const properties = [
    {
      title:        "10 Marla Plot — Block A",
      slug:         "10-marla-plot-block-a",
      type:         "residential",
      typelabel:    "Residential Plot · Faisal Hills",
      description:  "Prime residential plot in Block A, Faisal Hills Phase 1.",
      price:        "85 Lac",
      location:     "Faisal Hills Phase 1, Block A",
      badge:        "Available",
      size:         "10 Marla",
      detail1Label: "Corner",
      detail1Value: "Position",
      detail2Label: "Ready",
      detail2Value: "Possession",
      status:       "Available",
      featured:     true,
      flagshipProjectId: faisalHills.id,
    },
    {
      title:        "5 Marla Commercial Plot",
      slug:         "5-marla-commercial-plot-main-blvd",
      type:         "commercial",
      typelabel:    "Commercial Plot · Main Boulevard",
      description:  "High-visibility commercial plot on the main boulevard.",
      price:        "1.2 Crore",
      location:     "Faisal Hills Main Boulevard",
      badge:        "Hot Deal",
      size:         "5 Marla",
      detail1Label: "Main Road",
      detail1Value: "Facing",
      detail2Label: "On File",
      detail2Value: "Status",
      status:       "Available",
      featured:     true,
      flagshipProjectId: faisalHills.id,
    },
    {
      title:        "7 Marla Corner Villa",
      slug:         "7-marla-corner-villa-phase2",
      type:         "villa",
      typelabel:    "Villa · Faisal Hills",
      description:  "Elegant corner villa in Phase 2 with premium finishes and modern architecture.",
      price:        "2.8 Crore",
      location:     "Faisal Hills Phase 2, Block C",
      badge:        "New",
      size:         "7 Marla",
      detail1Label: "4 Bed",
      detail1Value: "Rooms",
      detail2Label: "3",
      detail2Value: "Floors",
      status:       "Available",
      featured:     true,
      flagshipProjectId: faisalHills.id,
    },
    {
      title:        "2 Bed Luxury Apartment",
      slug:         "2-bed-luxury-apartment-fh",
      type:         "apartment",
      typelabel:    "Apartment · Faisal Hills",
      description:  "Modern 2-bedroom luxury apartment with top-tier facilities.",
      price:        "75 Lac",
      location:     "Faisal Hills Apartment Complex",
      badge:        "Available",
      size:         "1100 sqft",
      detail1Label: "2 Bed",
      detail1Value: "Rooms",
      detail2Label: "5th Floor",
      detail2Value: "Level",
      status:       "Available",
      featured:     true,
      flagshipProjectId: faisalHills.id,
    },
    {
      title:        "Ground Floor Shop — Plaza",
      slug:         "ground-floor-shop-plaza-fh",
      type:         "shop",
      typelabel:    "Shop · Commercial Plaza",
      description:  "Prime ground-floor corner shop in Faisal Hills commercial market.",
      price:        "55 Lac",
      location:     "Faisal Hills Commercial Market",
      badge:        "Hot Deal",
      size:         "350 sqft",
      detail1Label: "G. Floor",
      detail1Value: "Level",
      detail2Label: "Corner",
      detail2Value: "Position",
      status:       "Available",
      featured:     true,
      flagshipProjectId: faisalHills.id,
    },
    {
      title:        "1 Kanal Plot — Block D",
      slug:         "1-kanal-plot-block-d",
      type:         "residential",
      typelabel:    "Residential Plot · Faisal Hills",
      description:  "Park-facing 1 Kanal plot — now sold. Similar units available on request.",
      price:        "1.8 Crore",
      location:     "Faisal Hills Phase 1, Block D",
      badge:        "Sold Out",
      size:         "1 Kanal",
      detail1Label: "Park Facing",
      detail1Value: "View",
      detail2Label: "Sold",
      detail2Value: "Status",
      status:       "Sold",
      featured:     true,
      flagshipProjectId: faisalHills.id,
    },
  ];
  await prisma.property.createMany({ data: properties });
  console.log("✅ Flagship project & properties seeded");

  // ── Trusted Brands ──────────────────────────────────────────────
  const brands = [
    {
      name:        "Faisal Hills",
      initials:    "FH",
      bgColor:     "rgba(200,169,81,0.12)",
      textColor:   "#C8A951",
      roleTag:     "Official Partner · Taxila",
      description: "Pakistan's premier housing society in Taxila with full RDA approval. Multiple phases offering residential and commercial opportunities.",
      propTypes:   ["Plots", "Villas", "Commercial"],
      order: 1,
    },
    {
      name:        "Blue Heights",
      initials:    "BH",
      bgColor:     "rgba(36,144,181,0.12)",
      textColor:   "#2490B5",
      roleTag:     "Authorized Dealer",
      description: "Modern residential and commercial towers featuring state-of-the-art amenities, smart home tech, and premium finishes.",
      propTypes:   ["Apartments", "Offices", "Shops"],
      order: 2,
    },
    {
      name:        "Green Valley",
      initials:    "GV",
      bgColor:     "rgba(42,122,75,0.12)",
      textColor:   "#4A9060",
      roleTag:     "Marketing Partner",
      description: "Eco-friendly gated community offering sustainable living with parks, schools, mosques, and commercial zones.",
      propTypes:   ["Residential", "Villas", "Plots"],
      order: 3,
    },
    {
      name:        "Elite Properties",
      initials:    "EP",
      bgColor:     "rgba(176,64,48,0.12)",
      textColor:   "#D06050",
      roleTag:     "Certified Agent",
      description: "Ultra-luxury developments catering to high-net-worth investors seeking maximum returns and premium living standards.",
      propTypes:   ["Luxury Villas", "Penthouses"],
      order: 4,
    },
  ];
  await prisma.trustedBrand.deleteMany();
  await prisma.trustedBrand.createMany({ data: brands });
  console.log("✅ Trusted brands seeded");

  // ── Construction Services ───────────────────────────────────────
  const services = [
    {
      icon:        "🏠",
      title:       "Residential Construction",
      description: "From foundation to finishing, we construct modern homes and villas with premium materials and skilled craftsmanship.",
      bullets:     ["3 Marla to 1 Kanal houses", "Custom villa designs available", "Grey structure & turnkey options", "Earthquake-resistant structure", "3–18 month completion"],
      order: 1,
    },
    {
      icon:        "🏗️",
      title:       "Commercial Construction",
      description: "Plazas, offices, shops, and warehouses built to commercial standards with focus on functionality and ROI.",
      bullets:     ["Multi-storey commercial plazas", "Retail shop fit-outs", "Office block development", "Structural & civil engineering", "Building completion certificates"],
      order: 2,
    },
    {
      icon:        "🎨",
      title:       "Interior Design & Finishing",
      description: "Transform any space with our full interior design services — from concept to completion, we create stunning interiors.",
      bullets:     ["Complete interior design", "Premium tiling & flooring", "Kitchen & bathroom fitting", "Electrical & plumbing works", "Painting & wallpaper"],
      order: 3,
    },
    {
      icon:        "📋",
      title:       "Project Consultation",
      description: "Expert advice at every stage — from architectural planning and NOC approvals to construction supervision.",
      bullets:     ["Architectural drawings & plans", "NOC & building permit assistance", "Site supervision service", "Budget estimation & BOQ", "Quality assurance checks"],
      order: 4,
    },
  ];
  await prisma.constructionService.deleteMany();
  await prisma.constructionService.createMany({ data: services });
  console.log("✅ Construction services seeded");

  // ── Why Choose Us ───────────────────────────────────────────────
  const whyUs = [
    {
      icon:        "🤝",
      title:       "Honest & Transparent Dealings",
      description: "No hidden costs. Full legal verification before every transaction. Your trust is our foundation.",
      order: 1,
    },
    {
      icon:        "🌍",
      title:       "OneWorldOneHome Mission",
      description: "We believe everyone deserves a home. Our team works with compassion to help every client find their perfect property.",
      order: 2,
    },
    {
      icon:        "🏆",
      title:       "Authorized Brand Partners",
      description: "Direct partnerships with top developers ensure exclusive rates, genuine files, and priority allocations.",
      order: 3,
    },
    {
      icon:        "📲",
      title:       "24/7 Client Support",
      description: "Our team is always available via WhatsApp, call, or office visit for any query — before and after your purchase.",
      order: 4,
    },
  ];
  await prisma.whyChooseUs.deleteMany();
  await prisma.whyChooseUs.createMany({ data: whyUs });
  console.log("✅ Why Choose Us seeded");

  // ── Testimonials ────────────────────────────────────────────────
  const testimonials = [
    {
      name:     "Ahmad Khan",
      initials: "AK",
      role:     "Investor · Rawalpindi",
      content:  "Wahda1 helped me invest in Faisal Hills at the right time. They were completely transparent about prices and legal status. Best real estate team in the area!",
      rating:   5,
      active:   true,
    },
    {
      name:     "Sara Baig",
      initials: "SB",
      role:     "Homeowner · Taxila",
      content:  "I built my house through Wahda1's construction service. The quality, finishing, and timeline were perfect. Very professional team with a humanitarian heart.",
      rating:   5,
      active:   true,
    },
    {
      name:     "Muhammad Rizwan",
      initials: "MR",
      role:     "Business Owner · Islamabad",
      content:  "Bought a commercial plot through Wahda1. They guided us through every step — from site visit to registry. OneWorldOneHome — they truly live by this motto.",
      rating:   5,
      active:   true,
    },
  ];
  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });
  console.log("✅ Testimonials seeded");

  console.log("\n🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
