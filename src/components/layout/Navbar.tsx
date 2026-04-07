"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { name: "Properties",    href: "#properties" },
  { name: "Faisal Hills",  href: "#faisal-hills" },
  { name: "Brands",        href: "#brands" },
  { name: "Construction",  href: "#construction" },
  { name: "About",         href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      id="navbar"
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 1000, height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 60px",
        background: scrolled ? "rgba(7,11,20,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s",
        borderBottom: scrolled ? "1px solid rgba(200,169,81,0.12)" : "none",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 1 }}>
        <Image
          src="/images/logo.png"
          alt="WAHDA1"
          width={140}
          height={40}
          className="object-contain"
          style={{ height: 40, width: "auto" }}
          priority
        />
      </Link>

      {/* Desktop Menu */}
      <ul style={{ display: "flex", alignItems: "center", gap: 36, listStyle: "none", margin: 0 }}
          className="hidden md:flex">
        {navLinks.map((l) => (
          <li key={l.name}>
            <a
              href={l.href}
              style={{
                color: "var(--light)", textDecoration: "none",
                fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
                transition: "color 0.3s", position: "relative",
                fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
                fontWeight: 400,
              }}
              className="nav-link"
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--light)")}
            >
              {l.name}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#contact"
            style={{
              color: "var(--gold)",
              border: "1px solid var(--gold)",
              padding: "10px 26px",
              fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
              textDecoration: "none", fontWeight: 500,
              transition: "all 0.3s",
              fontFamily: "var(--font-dm-sans, DM Sans, sans-serif)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--gold)";
              (e.currentTarget as HTMLElement).style.color = "var(--deep)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--gold)";
            }}
          >
            Contact Us
          </a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "transparent", border: "none", cursor: "pointer", padding: 8 }}
        aria-label="Toggle menu"
      >
        <div style={{ width: 24, height: 1, background: "var(--gold)", marginBottom: 5 }} />
        <div style={{ width: 24, height: 1, background: "var(--gold)", marginBottom: 5 }} />
        <div style={{ width: 24, height: 1, background: "var(--gold)" }} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 72, left: 0, right: 0,
          background: "rgba(7,11,20,0.98)", backdropFilter: "blur(20px)",
          padding: "24px 24px 40px", zIndex: 999,
          display: "flex", flexDirection: "column", gap: 24,
          borderBottom: "1px solid rgba(200,169,81,0.12)",
        }}>
          {navLinks.map((l) => (
            <a
              key={l.name}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "var(--light)", textDecoration: "none",
                fontSize: 14, letterSpacing: "2px", textTransform: "uppercase",
              }}
            >
              {l.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              color: "var(--gold)", border: "1px solid var(--gold)",
              padding: "12px 24px", textAlign: "center",
              textDecoration: "none", fontSize: 11, letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            Contact Us
          </a>
        </div>
      )}
    </nav>
  );
}
