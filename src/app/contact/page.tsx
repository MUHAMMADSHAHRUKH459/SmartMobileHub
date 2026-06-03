"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/shop/ProductCard";
import { Product } from "@/types";
import { Search, Smartphone, X } from "lucide-react";
import { parseJsonArray } from "@/lib/utils";

const categories = ["All", "Smartphones", "Tablets", "Keypad", "Accessories"];
const brands = ["Apple", "Samsung", "Xiaomi", "Oppo", "Vivo", "Realme", "Oneplus", "Huawei"];
const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Top Rated", value: "rating" },
];

function ShopContent() {
  const searchParams = useSearchParams();

  // ✅ useEffect hataya — directly searchParams se read kar rahe hain
  const categoryParam = searchParams.get("category") || "All";
  const conditionParam = searchParams.get("condition") || "";
  const activeCategory =
    categories.find((cat) => cat.toLowerCase() === categoryParam.toLowerCase()) || "All";
  const condition = conditionParam;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await parseJsonArray<Product>(res);
        if (!cancelled) setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchCondition =
      !condition || p.condition === condition;
    const matchBrand =
      selectedBrands.length === 0 || selectedBrands.some(brand => p.name.includes(brand));
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchSearch && matchCategory && matchCondition && matchBrand && matchPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Page Header */}
      <section className="pt-32 pb-8 px-4 lg:px-8 bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Shop Phones
          </h1>
          <p className="text-gray-600">
            Browse {filtered.length} products
            {activeCategory !== "All" && ` in ${activeCategory}`}
            {condition && ` (${condition})`}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-blue-100 p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        checked={activeCategory === cat}
                        onChange={() => {}}
                        className="w-4 h-4 text-blue-600 cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 text-sm">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 my-6" />

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Brands
                </h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-blue-600 text-sm">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-200 my-6" />

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">
                  Price Range
                </h3>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max="500000"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    placeholder="Min"
                    className="flex-1 px-3 py-2 border border-blue-200 rounded text-sm"
                  />
                  <input
                    type="number"
                    min="0"
                    max="500000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    placeholder="Max"
                    className="flex-1 px-3 py-2 border border-blue-200 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search phones..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-blue-200 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Filters and Sort Row */}
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                  >
                    Filters
                  </button>
                  {(selectedBrands.length > 0 || activeCategory !== "All") && (
                    <button
                      onClick={() => setSelectedBrands([])}
                      className="px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 flex items-center gap-1"
                    >
                      Clear Filters
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm text-gray-800 focus:outline-none focus:border-blue-400"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-96 animate-pulse" />
                ))}
              </div>
            ) : sorted.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-lg border border-blue-100">
                <Smartphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg font-semibold mb-2">No products found</p>
                <p className="text-gray-500">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sorted.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}