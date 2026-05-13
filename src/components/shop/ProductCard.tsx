"use client";

import Link from "next/link";
import Image from "next/image";
import { Smartphone, ShoppingCart, CreditCard } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const waMessage = `Hello! I am interested in buying ${product.name} priced at ${formatPrice(product.price)}. Please provide more details.`;
  const waLink = generateWhatsAppLink(waMessage);

  return (
    <div className="bg-white rounded-2xl overflow-hidden hover-glow transition-all group border border-slate-200 shadow-sm">
      {/* Image */}
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square bg-slate-100 overflow-hidden">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Smartphone className="w-16 h-16 text-slate-300" />
            </div>
          )}
          {product.oldPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
              SALE
            </div>
          )}
          {!product.inStock && (
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
        <p className="text-slate-500 text-xs mb-1">{product.category}</p>
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-slate-900 font-bold text-base mb-1 line-clamp-1 hover:text-slate-700 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-600 text-xs mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <p className="text-slate-900 font-black text-xl">
            {formatPrice(product.price)}
          </p>
          {product.oldPrice && (
            <p className="text-slate-400 text-sm line-through">
              {formatPrice(product.oldPrice)}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </a>
          <Link
            href={`/installment?product=${product.slug}&name=${encodeURIComponent(product.name)}&price=${product.price}`}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-100 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all"
          >
            <CreditCard className="w-4 h-4" />
            Installment
          </Link>
        </div>
      </div>
    </div>
  );
}