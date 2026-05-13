"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Installment", href: "/installment" },
  { label: "Accessories", href: "/accessories" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-black/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-black text-sm leading-none">
                Smart Mobile
              </p>
              <p className="text-black/50 text-xs">Hub</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-all duration-200 hover:text-black relative group ${
                  pathname === link.href
                    ? "text-black"
                    : "text-black/60"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-200 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/shop"
              className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/90 transition-all hover:scale-105 active:scale-95"
            >
              Shop Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 bg-black/10 rounded-xl flex items-center justify-center"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-black" />
            ) : (
              <Menu className="w-5 h-5 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-black/10">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-black text-white"
                      : "text-black/70 hover:bg-black/10 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-2.5 bg-black text-white text-sm font-semibold rounded-xl text-center"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}