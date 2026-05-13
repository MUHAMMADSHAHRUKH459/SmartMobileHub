"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Package } from "lucide-react";
import { Accessory } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";

interface AccessoryCardProps {
  accessory: Accessory;
}

export default function AccessoryCard({ accessory }: AccessoryCardProps) {
  const waMessage = `Hello! I am interested in buying ${accessory.name} priced at ${formatPrice(accessory.price)}. Please provide more details.`;
  const waLink = generateWhatsAppLink(waMessage);

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover-glow transition-all group border border-slate-200 shadow-sm">
      {/* Image */}
      <Link href={`/accessories/${accessory.slug}`}>
        <div className="relative aspect-square bg-slate-100 overflow-hidden">
          {accessory.image ? (
            <Image
              src={accessory.image}
              alt={accessory.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-16 h-16 text-slate-300" />
            </div>
          )}
          {accessory.oldPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              SALE
            </div>
          )}
          {!accessory.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <p className="text-white font-bold text-sm bg-black/50 px-3 py-1.5 rounded-xl">
                Out of Stock
              </p>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-slate-500 text-xs mb-1">{accessory.category}</p>
        <Link href={`/accessories/${accessory.slug}`}>
          <h3 className="text-slate-900 font-bold text-base mb-1 line-clamp-1 hover:text-slate-700 transition-colors">
            {accessory.name}
          </h3>
        </Link>
        <p className="text-slate-600 text-xs mb-3 line-clamp-2">
          {accessory.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <p className="text-slate-900 font-black text-xl">
            {formatPrice(accessory.price)}
          </p>
          {accessory.oldPrice && (
            <p className="text-slate-400 text-sm line-through">
              {formatPrice(accessory.oldPrice)}
            </p>
          )}
        </div>

        {/* Buy Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
        >
          <ShoppingCart className="w-4 h-4" />
          Buy Now
        </a>
      </div>
    </div>
  );
}