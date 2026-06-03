"use client";

import Link from "next/link";
import Image from "next/image";
import { Smartphone, Heart, Eye, Star, Zap } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const waMessage = `Hello! I am interested in buying ${product.name} priced at ${formatPrice(product.price)}. Please provide more details.`;
  const waLink = generateWhatsAppLink(waMessage);

  // Calculate discount percentage
  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Mock rating (in a real app, this would come from database)
  const rating = 4.5;
  const reviewCount = 128;

  return (
    <div className="bg-white rounded-lg overflow-hidden hover-glow transition-all group border border-blue-100 card-shadow h-full flex flex-col">
      {/* Image Container */}
      <Link href={`/shop/${product.slug}`}>
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
            {product.oldPrice && (
              <div className="badge-sale">
                -{discountPercent}%
              </div>
            )}
            {Math.random() > 0.5 && (
              <div className="badge-hot flex items-center gap-1">
                <Zap className="w-3 h-3" /> Hot Deal
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute top-2 right-2 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-gray-400 hover:text-red-500"
              }`}
            />
          </button>

          {/* Product Image */}
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Smartphone className="w-20 h-20 text-gray-300" />
            </div>
          )}

          {/* Out of Stock */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <p className="text-white font-bold text-sm bg-black/50 px-3 py-1.5 rounded">
                Out of Stock
              </p>
            </div>
          )}

          {/* Quick View Button */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
            <button className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all">
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        <p className="text-blue-600 text-xs font-bold mb-1 uppercase tracking-wide">
          {product.category}
        </p>
        
        <Link href={`/shop/${product.slug}`}>
          <h3 className="text-gray-900 font-bold text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-gray-600 text-xs">({reviewCount})</span>
        </div>

        {/* Specs */}
        {product.description && (
          <p className="text-gray-600 text-xs mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price Section */}
        <div className="mb-3 mt-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="price-tag">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="old-price">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
          {product.oldPrice && (
            <div className="text-green-600 text-xs font-semibold">
              You Save: {formatPrice(product.oldPrice - product.price)}
            </div>
          )}
        </div>

        {/* Trust Badge */}
        <div className="text-xs text-gray-600 mb-3 flex items-center gap-1">
          ✓ Genuine | 2-Year Warranty
        </div>

        {/* Buy Button */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full py-2.5 font-semibold rounded-lg text-sm transition-all text-center ${
            product.inStock
              ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.inStock ? "Buy Now" : "Out of Stock"}
        </a>
      </div>
    </div>
  );
}