"use client";

import { useState } from "react";
import { MessageCircle, ShoppingCart, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import { Product } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [adding, setAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const waMessage = `Hello! I am interested in buying ${product.name} priced at ${formatPrice(product.price)}. Please provide more details.`;
  const waLink = generateWhatsAppLink(waMessage);

  const addToCart = async () => {
    setAdding(true);
    setSuccessMessage("");
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      if (res.ok) {
        setSuccessMessage("Added to cart");
      } else {
        const data = await res.json();
        setSuccessMessage(data.error || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setSuccessMessage("Failed to add to cart");
    } finally {
      setAdding(false);
    }
  };

  const specs = product.specs as Record<string, string> | null;

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Slider */}
          <div>
            <ImageSlider images={product.images} name={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <p className="text-slate-500 text-sm mb-2">{product.category}</p>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              {product.name}
            </h1>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <p className="text-4xl font-black text-slate-900">
                {formatPrice(product.price)}
              </p>
              {product.oldPrice && (
                <p className="text-slate-400 text-xl line-through">
                  {formatPrice(product.oldPrice)}
                </p>
              )}
              {product.oldPrice && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  SALE
                </span>
              )}
            </div>

            {/* Description */}
            <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-200">
              <h3 className="text-slate-900 font-semibold mb-2 text-sm uppercase tracking-wider">
                Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specs */}
            {specs && Object.keys(specs).length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-200">
                <h3 className="text-slate-900 font-semibold mb-4 text-sm uppercase tracking-wider">
                  Specifications
                </h3>
                <div className="space-y-2">
                  {Object.entries(specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start justify-between py-2 border-b border-slate-200 last:border-0"
                    >
                      <span className="text-slate-600 text-sm">{key}</span>
                      <span className="text-slate-900 text-sm font-medium text-right ml-4">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 text-base"
              >
                <ShoppingCart className="w-5 h-5" />
                Buy Now via WhatsApp
              </a>
              <button
                type="button"
                onClick={addToCart}
                disabled={adding}
                className="flex items-center justify-center gap-2 py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-2xl transition-all text-base disabled:opacity-60"
              >
                <ShoppingCart className="w-5 h-5" />
                {adding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
            {successMessage ? (
              <p className="mt-3 text-sm font-medium text-green-600">{successMessage}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}