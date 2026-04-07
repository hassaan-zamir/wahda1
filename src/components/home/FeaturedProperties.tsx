import Link from "next/link";
import prisma from "@/lib/prisma";
import { ArrowRight, Bed, Bath, Square, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

export async function FeaturedProperties() {
  const properties = await prisma.property.findMany({
    where: {
      status: "AVAILABLE",
    },
    take: 3,
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <section className="py-24 bg-secondary/10">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <FadeIn direction="up">
            <div>
              <span className="text-primary tracking-[0.2em] uppercase text-sm font-semibold mb-4 block">Exclusive Portfolio</span>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-tight">
                Featured <span className="font-medium italic text-primary">Properties</span>
              </h2>
            </div>
          </FadeIn>
          <FadeIn direction="left" delay={0.2}>
            <Button variant="outline" className="uppercase tracking-widest text-sm rounded-sm group">
              <Link href="/properties" className="flex items-center gap-2">
                View All Portfolio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </FadeIn>
        </div>

        {properties.length === 0 ? (
          <FadeIn delay={0.4}>
            <div className="text-center py-24 bg-card border border-border/50 rounded-sm">
              <p className="text-muted-foreground font-light text-lg">No featured properties available at the moment.</p>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer delayChildren={0.4} staggerChildren={0.2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property: any) => (
              <StaggerItem key={property.id}>
                <Link href={`/properties/${property.slug}`} className="group relative block overflow-hidden rounded-sm bg-card border border-border/50 transition-all hover:border-primary/50 hover:shadow-2xl">
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-primary/90 text-primary-foreground text-xs uppercase tracking-widest px-3 py-1 font-medium backdrop-blur-sm shadow-lg">
                        {property.status}
                      </span>
                    </div>

                    {/* Price Badge */}
                    <div className="absolute bottom-4 right-4 z-20">
                      <span className="bg-background/90 text-foreground text-sm font-medium px-4 py-2 backdrop-blur-sm border border-border/50">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency, maximumFractionDigits: 0 }).format(property.price)}
                      </span>
                    </div>

                    <img 
                      src={property.mainImage || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop"} 
                      alt={property.title} 
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  </div>

                  {/* Content Container */}
                  <div className="p-8">
                    <span className="text-primary text-xs uppercase tracking-widest font-medium mb-3 block">
                      {property.type}
                    </span>
                    
                    <h3 className="text-2xl font-light text-foreground mb-4 group-hover:text-primary transition-colors leading-tight line-clamp-1">
                      {property.title}
                    </h3>
                    
                    <div className="flex items-center text-muted-foreground text-sm mb-6 border-b border-border/50 pb-6">
                      <MapPin className="w-4 h-4 mr-2 shrink-0 text-primary" />
                      <span className="truncate">{property.location}</span>
                    </div>
                    
                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="flex flex-col items-center">
                        <Bed className="w-5 h-5 mb-2 text-primary/70" />
                        <span className="text-sm font-light text-foreground">{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex flex-col items-center border-l border-r border-border/50">
                        <Bath className="w-5 h-5 mb-2 text-primary/70" />
                        <span className="text-sm font-light text-foreground">{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Square className="w-5 h-5 mb-2 text-primary/70" />
                        <span className="text-sm font-light text-foreground">{property.area} <span className="text-xs text-muted-foreground block border-t border-border/50 mt-1 pt-1">SQ FT</span></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </section>
  );
}
