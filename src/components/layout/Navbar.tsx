"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Smartphone, Search, ChevronDown } from "lucide-react";

const categories = [
  { label: "Smartphones", value: "Smartphones" },
  { label: "Tablets", value: "Tablets" },
  { label: "Accessories", value: "Accessories" },
  { label: "Keypad Phones", value: "Keypad" },
];

const smartphoneConditions = [
  { label: "New Smartphones", value: "Smartphones", condition: "new" },
  { label: "Used Smartphones", value: "Smartphones", condition: "used" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-white shadow-md border-b border-blue-100"
        : "bg-white border-b border-blue-100"
    }`}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-blue-600 text-base leading-none">
                Smart Mobile
              </p>
              <p className="text-blue-500 text-xs">Hub</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search phones, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-blue-200 rounded-lg text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Category Bar - Desktop */}
        <div className="hidden md:flex items-center gap-1 py-3 border-t border-blue-100">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              All Categories
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute hidden group-hover:block left-0 top-full bg-white border border-blue-100 rounded-lg shadow-lg py-2 min-w-48 z-10">
              <div className="px-4 py-2 text-xs uppercase tracking-wide text-slate-400">Categories</div>
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/shop?category=${cat.value}`}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  {cat.label}
                </Link>
              ))}
              <div className="border-t border-blue-100 my-2" />
              <div className="px-4 py-2 text-xs uppercase tracking-wide text-slate-400">Smartphones</div>
              {smartphoneConditions.map((item) => (
                <Link
                  key={item.label}
                  href={`/shop?category=${item.value}&condition=${item.condition}`}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/shop"
            className="px-3 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            All Phones
          </Link>
          <Link
            href="/accessories"
            className="px-3 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            Accessories
          </Link>
          <Link
            href="/cart"
            className="px-3 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            Cart
          </Link>
          <Link
            href="/contact"
            className="px-3 py-2 text-gray-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            Contact
          </Link>
          <div className="ml-auto flex items-center gap-2 text-sm text-green-600 font-medium bg-green-50 px-3 py-2 rounded-lg">
            <span>✓</span> Same-day Delivery
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-blue-100">
            {/* Mobile Search */}
            <div className="py-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-blue-200 rounded-lg text-sm"
                />
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="mb-2">
              <p className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/shop?category=${cat.value}`}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
              <div className="border-t border-blue-100 my-2" />
              <p className="px-4 py-2 text-xs font-bold text-gray-600 uppercase">Smartphones</p>
              {smartphoneConditions.map((item) => (
                <Link
                  key={item.label}
                  href={`/shop?category=${item.value}&condition=${item.condition}`}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Links */}
            <Link
              href="/shop"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              All Phones
            </Link>
            <Link
              href="/cart"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}