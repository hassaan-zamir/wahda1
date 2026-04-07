import prisma from "@/lib/prisma";
import { HeroSection } from "@/components/home/HeroSection";
import { TickerSection } from "@/components/home/TickerSection";
import { SearchSection } from "@/components/home/SearchSection";
import { PropertyCategoriesSection } from "@/components/home/PropertyCategoriesSection";
import { FlagshipProjectsSection } from "@/components/home/FlagshipProjectsSection";
import { AvailablePropertiesSection } from "@/components/home/AvailablePropertiesSection";
import { TrustedBrandsSection } from "@/components/home/TrustedBrandsSection";
import { ConstructionServicesSection } from "@/components/home/ConstructionServicesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTAContactSection } from "@/components/home/CTAContactSection";

export default async function LandingPage() {
  const [
    heroStats,
    categories,
    flagshipProjects,
    properties,
    brands,
    services,
    whyPoints,
    testimonials,
  ] = await Promise.all([
    prisma.heroStat.findMany({ orderBy: { order: "asc" } }),
    prisma.propertyCategory.findMany({ orderBy: { order: "asc" } }),
    prisma.flagshipProject.findMany({ where: { active: true }, orderBy: { order: "asc" } }),
    prisma.property.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" } }),
    prisma.trustedBrand.findMany({ orderBy: { order: "asc" } }),
    prisma.constructionService.findMany({ orderBy: { order: "asc" } }),
    prisma.whyChooseUs.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { active: true } }),
  ]);

  // Type-cast JSON features
  const projectsWithFeatures = flagshipProjects.map((p) => ({
    ...p,
    features: (p.features as Array<{ icon: string; name: string; value: string }>) || [],
  }));

  return (
    <div>
      <HeroSection stats={heroStats} />
      <TickerSection />
      <SearchSection />
      <PropertyCategoriesSection categories={categories} />
      <FlagshipProjectsSection projects={projectsWithFeatures} />
      <AvailablePropertiesSection properties={properties} />
      <TrustedBrandsSection brands={brands} />
      <ConstructionServicesSection services={services} />
      <HowItWorksSection />
      <WhyChooseUsSection points={whyPoints} />
      <TestimonialsSection testimonials={testimonials} />
      <CTAContactSection />
    </div>
  );
}
