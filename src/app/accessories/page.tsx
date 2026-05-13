"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccessoryCard from "@/components/accessories/AccessoryCard";
import { Accessory } from "@/types";
import { Search, Package } from "lucide-react";

const categories = ["All", "Earbuds", "Power Bank", "Charger", "Protector", "Cable", "Other"];

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/accessories");
        const data = await res.json();
        if (!cancelled) setAccessories(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = accessories.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || a.category === activeCategory;
    return matchSearch && matchCategory;
  });

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-3">
            Accessories
          </p>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-4">
            Mobile Accessories
          </h1>
          <p className="text-slate-600 max-w-xl mx-auto text-base mb-10">
            Explore our wide range of premium mobile accessories at the best prices.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search accessories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-400 focus:bg-white transition-all text-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Grid */}
      <section className="pb-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-slate-200 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-slate-300" />
              </div>
              <p className="text-slate-400 text-lg font-semibold mb-2">
                No accessories found
              </p>
              <p className="text-slate-300 text-sm">
                {search ? "Try a different search term" : "Accessories will appear here once added"}
              </p>
            </div>
          ) : (
            <>
              <p className="text-slate-500 text-sm mb-6">
                {filtered.length} item{filtered.length !== 1 ? "s" : ""} found
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((accessory) => (
                  <AccessoryCard key={accessory.id} accessory={accessory} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}