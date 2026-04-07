import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { FadeIn } from "@/components/animations/FadeIn"
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger"

export async function PortfolioSection() {
  const portfolios = await prisma.portfolio.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  })

  // If no portfolios are in the database yet, we don't render the section
  // or we render a placeholder.
  if (portfolios.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">Our Portfolio</h2>
            <p className="text-muted-foreground text-lg">
              Showcasing a legacy of architectural excellence. Discover our delivered projects that define the standard of modern living.
            </p>
          </div>
          <Button variant="outline" asChild className="uppercase tracking-widest hidden md:flex">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((project: any) => (
            <StaggerItem key={project.id} className="group cursor-pointer flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
                <Image
                  src={project.images[0] || "/images/placeholder-home.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 uppercase tracking-widest rounded-sm">
                    {project.completion || "Completed"}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium tracking-tight">{project.title}</h3>
                {project.location && (
                  <p className="text-muted-foreground mt-1">{project.location}</p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 md:hidden">
          <Button variant="outline" asChild className="w-full uppercase tracking-widest">
            <Link href="/portfolio">
              View All Projects <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
