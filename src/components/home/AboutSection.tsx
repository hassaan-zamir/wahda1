import { ShieldCheck, Target, HeartHandshake } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

const features = [
  {
    title: "Luxury Abodes",
    description: "Curated collection of the most prestigious properties, offering unparalleled elegance and comfort.",
    icon: ShieldCheck,
  },
  {
    title: "Visionary Architecture",
    description: "Partnering with world-class designers to bring visionary architectural concepts to life.",
    icon: Target,
  },
  {
    title: "Philanthropic Legacy",
    description: "A portion of our proceeds goes towards community development and charitable causes.",
    icon: HeartHandshake,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          <FadeIn direction="right">
            <div>
              <span className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">Our Vision</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight mb-6">
                Redefining the <span className="font-medium italic text-primary">Standard</span> of Excellence
              </h2>
              <div className="w-12 h-[1px] bg-primary mb-8" />
              <p className="text-muted-foreground font-light text-lg leading-relaxed mb-6">
                Wahda 1 was founded on the principle of "Al-Wahda" — unity. We believe that true luxury is not just about opulence, but about creating harmonious living spaces that enrich lives and build communities.
              </p>
              <p className="text-muted-foreground font-light text-lg leading-relaxed">
                Our commitment extends beyond successful transactions. We are dedicated to leaving a lasting, positive impact through our philanthropic endeavors, ensuring your investment contributes to a greater cause.
              </p>
            </div>
          </FadeIn>
          
          <FadeIn direction="left" delay={0.2}>
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-square overflow-hidden rounded-sm border border-border/50 relative">
                <img 
                  src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2000&auto=format&fit=crop" 
                  alt="Modern Architecture" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-card border border-border/50 p-6 flex flex-col justify-center items-center text-center rounded-sm hidden md:flex animate-pulse">
                <span className="text-4xl text-primary font-light mb-2">10+</span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Years of <br/> Excellence</span>
              </div>
            </div>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border/50 pt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={index}>
                <div className="group p-8 rounded-sm bg-card border border-border/50 hover:border-primary/50 transition-colors duration-500 hover:shadow-2xl hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-light mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
