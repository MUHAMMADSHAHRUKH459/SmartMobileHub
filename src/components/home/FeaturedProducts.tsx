"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Smartphone } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (!cancelled) {
          setProducts(data.filter((p: Product) => p.featured).slice(0, 6));
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-3">
              Featured
            </p>
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900">
              Top Picks
            </h2>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-2xl h-72 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm">No featured products yet</p>
            <p className="text-slate-400 text-xs mt-1">Add products from admin panel</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:-translate-y-1 transition-transform duration-200 group"
              >
                {/* Image */}
                <div className="aspect-square bg-slate-100 flex items-center justify-center overflow-hidden relative">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Smartphone className="w-16 h-16 text-slate-400" />
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="text-slate-500 text-xs mb-1">{product.category}</p>
                  <h3 className="text-slate-900 font-bold text-base mb-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-900 font-black text-lg">
                        {formatPrice(product.price)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-slate-400 text-xs line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                      product.inStock
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-600"
                    }`}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}