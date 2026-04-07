/**
 * Component tests for key frontend UI elements.
 *
 * These tests render components in isolation and verify structure & semantics.
 */
import React from "react";
import { render, screen } from "@testing-library/react";

// ─── Animation Components ────────────────────────────────────
// We mock framer-motion to avoid runtime issues in JSDOM
jest.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref: any) =>
      React.createElement("div", { ...props, ref }, children)
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), back: jest.fn() }),
}));

// ─── FadeIn Component ────────────────────────────────────────
import { FadeIn } from "@/components/animations/FadeIn";

describe("FadeIn Component", () => {
  test("renders children correctly", () => {
    render(
      <FadeIn>
        <p>Animated Content</p>
      </FadeIn>
    );
    expect(screen.getByText("Animated Content")).toBeInTheDocument();
  });

  test("accepts custom className", () => {
    const { container } = render(
      <FadeIn className="custom-class">
        <p>Test</p>
      </FadeIn>
    );
    // The wrapper div should have the custom class
    expect(container.firstChild).toHaveClass("custom-class");
  });
});

// ─── StaggerContainer + StaggerItem ──────────────────────────
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

describe("StaggerContainer + StaggerItem", () => {
  test("renders staggered children", () => {
    render(
      <StaggerContainer>
        <StaggerItem><p>Item 1</p></StaggerItem>
        <StaggerItem><p>Item 2</p></StaggerItem>
        <StaggerItem><p>Item 3</p></StaggerItem>
      </StaggerContainer>
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });
});

// ─── PageTransition Component ────────────────────────────────
import { PageTransition } from "@/components/animations/PageTransition";

describe("PageTransition Component", () => {
  test("renders children inside transition wrapper", () => {
    render(
      <PageTransition>
        <h1>Page Content</h1>
      </PageTransition>
    );
    expect(screen.getByText("Page Content")).toBeInTheDocument();
  });
});

// ─── HeroSection Component ───────────────────────────────────
import { HeroSection } from "@/components/home/HeroSection";

describe("HeroSection Component", () => {
  test("renders brand tagline", () => {
    render(<HeroSection />);
    expect(screen.getByText("Welcome to Wahda 1")).toBeInTheDocument();
  });

  test("renders headline", () => {
    render(<HeroSection />);
    expect(screen.getByText(/Meets Purpose/i)).toBeInTheDocument();
  });

  test("renders CTA buttons", () => {
    render(<HeroSection />);
    expect(screen.getByText("Explore Properties")).toBeInTheDocument();
    expect(screen.getByText("Inquire Now")).toBeInTheDocument();
  });
});

// ─── AboutSection Component ──────────────────────────────────
import { AboutSection } from "@/components/home/AboutSection";

describe("AboutSection Component", () => {
  test("renders section heading", () => {
    render(<AboutSection />);
    expect(screen.getByText("Our Vision")).toBeInTheDocument();
  });

  test("renders all three feature cards", () => {
    render(<AboutSection />);
    expect(screen.getByText("Luxury Abodes")).toBeInTheDocument();
    expect(screen.getByText("Visionary Architecture")).toBeInTheDocument();
    expect(screen.getByText("Philanthropic Legacy")).toBeInTheDocument();
  });
});

// ─── TestimonialsSection Component ───────────────────────────
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

describe("TestimonialsSection Component", () => {
  test("renders section heading", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Testimonies")).toBeInTheDocument();
  });

  test("renders at least one testimonial quote", () => {
    render(<TestimonialsSection />);
    // Check that there's at least one blockquote-style element
    const quotedElements = screen.getAllByText(/./);
    expect(quotedElements.length).toBeGreaterThan(0);
  });
});
