"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Smartphone, Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice, parseJsonArray } from "@/lib/utils";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/products");
        const data = await parseJsonArray<Product>(res);
        if (!cancelled) {
          setProducts(data.filter((p) => p.featured).slice(0, 8));
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">
              ⭐ Best Sellers
            </p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900">
              Top Picked Phones
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Most popular phones this week
            </p>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-bold transition-colors bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100"
          >
            Shop All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Products */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg h-80 animate-pulse border border-blue-100" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-blue-100">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm font-semibold">No featured products yet</p>
            <p className="text-gray-500 text-xs mt-1">Products will appear here</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {products.map((product) => {
              const rating = 4.5; // Mock rating
              const reviews = 128;
              const discount = product.oldPrice
                ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
                : 0;

              return (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="bg-white rounded-lg overflow-hidden border border-blue-100 hover-glow transition-all group h-full flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <Smartphone className="w-12 h-12 text-gray-400" />
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        -{discount}%
                      </div>
                    )}

                    {/* Stock Status */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <p className="text-white text-xs font-bold bg-black/60 px-2 py-1 rounded">
                          Out of Stock
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-3 flex-1 flex flex-col">
                    <p className="text-blue-600 text-xs font-bold mb-1 uppercase">
                      {product.category}
                    </p>
                    <h3 className="text-gray-900 font-semibold text-xs mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-600 text-xs">
                        {rating} ({reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto">
                      <p className="text-blue-600 font-black text-sm">
                        {formatPrice(product.price)}
                      </p>
                      {product.oldPrice && (
                        <p className="text-gray-400 text-xs line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}