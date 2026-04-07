"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitInquiry } from "@/app/(main)/actions";
import { toast } from "sonner";
import { Building2 } from "lucide-react";

export function ContactSection() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    
    startTransition(async () => {
      const res = await submitInquiry(data);
      if (res.success) {
        toast.success("Inquiry received. We will contact you shortly.");
        // Reset form hack
        (document.getElementById("contact-form") as HTMLFormElement)?.reset();
      } else {
        toast.error(res.error || "An error occurred.");
      }
    });
  }

  return (
    <section id="contact" className="py-24 bg-card text-card-foreground border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="flex flex-col gap-6">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Begin Your <span className="text-primary font-medium italic">Journey</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Whether you are looking for your absolute dream home or an investment that transcends generations, Wahda 1 is your trusted partner. Reach out to our private advisors today.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-center gap-4 text-muted-foreground">
                <Building2 className="w-5 h-5 text-primary" />
                <span>Downtown Dubai, United Arab Emirates</span>
              </div>
              <div className="flex items-center gap-4 text-primary text-xl font-light tracking-widest mt-4">
                +971 50 123 4567
              </div>
              <div className="flex items-center gap-4 text-primary text-xl font-light tracking-widest">
                contact@wahda1.com
              </div>
            </div>
          </div>

          <div className="bg-background border border-border/50 p-8 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            
            <form id="contact-form" action={handleSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="grid gap-2">
                <Input name="name" required placeholder="Full Name" className="bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <Input type="email" name="email" required placeholder="Email Address" className="bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg" />
                </div>
                <div className="grid gap-2">
                  <Input type="tel" name="phone" placeholder="Phone Number" className="bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary text-lg" />
                </div>
              </div>
              <div className="grid gap-2">
                <Textarea name="message" required placeholder="How can we assist you?" className="bg-transparent border-0 border-b border-border/50 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary min-h-[100px] text-lg resize-none" />
              </div>

              <Button type="submit" disabled={isPending} size="lg" className="w-full mt-4 uppercase tracking-widest h-14 bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
                {isPending ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
