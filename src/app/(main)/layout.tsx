import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--deep)" }}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
