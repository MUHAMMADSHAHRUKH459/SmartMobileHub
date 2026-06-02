"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, MessageCircle, ArrowLeft, CheckCircle, XCircle, Package } from "lucide-react";
import { Accessory } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";

interface AccessoryDetailProps {
  accessory: Accessory;
}

export default function AccessoryDetail({ accessory }: AccessoryDetailProps) {
  const [adding, setAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const waMessage = `Hello! I am interested in buying ${accessory.name} priced at ${formatPrice(accessory.price)}. Please provide more details.`;
  const waLink = generateWhatsAppLink(waMessage);

  const addToCart = async () => {
    setAdding(true);
    setSuccessMessage("");
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessoryId: accessory.id, quantity: 1 }),
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

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Back Button */}
        <Link
          href="/accessories"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Accessories
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden">
            {accessory.image ? (
              <Image
                src={accessory.image}
                alt={accessory.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="w-20 h-20 text-slate-300" />
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <p className="text-slate-500 text-sm mb-2">{accessory.category}</p>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-4">
              {accessory.name}
            </h1>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {accessory.inStock ? (
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
                {formatPrice(accessory.price)}
              </p>
              {accessory.oldPrice && (
                <p className="text-slate-400 text-xl line-through">
                  {formatPrice(accessory.oldPrice)}
                </p>
              )}
              {accessory.oldPrice && (
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
                {accessory.description}
              </p>
            </div>

            {/* Buttons */}
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