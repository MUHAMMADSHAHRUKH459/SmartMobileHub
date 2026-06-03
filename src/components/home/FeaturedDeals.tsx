"use client";

import Link from "next/link";
import Image from "next/image";
import { Zap, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface FeaturedDeal {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  slug: string;
  rating: number;
  reviews: number;
}

interface FeaturedDealsProps {
  deals: FeaturedDeal[];
}

export default function FeaturedDeals({ deals }: FeaturedDealsProps) {
  return (
    <section className="py-12 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <Zap className="w-6 h-6 text-orange-500" />
          <h2 className="text-3xl font-bold text-gray-900">Flash Deals</h2>
          <span className="ml-auto text-sm text-orange-500 font-semibold bg-orange-50 px-3 py-1 rounded-full">
            Limited Time
          </span>
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {deals.map((deal) => {
            const discount = deal.oldPrice
              ? Math.round(((deal.oldPrice - deal.price) / deal.oldPrice) * 100)
              : 0;

            return (
              <Link key={deal.id} href={`/shop/${deal.slug}`}>
                <div className="bg-white rounded-lg border border-blue-100 overflow-hidden hover-glow transition-all h-full flex flex-col cursor-pointer group">
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {deal.image ? (
                      <Image
                        src={deal.image}
                        alt={deal.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        📱
                      </div>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded font-bold text-xs">
                        -{discount}%
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-gray-900 font-semibold text-xs mb-2 line-clamp-2 group-hover:text-blue-600">
                      {deal.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-600 text-xs">
                        {deal.rating.toFixed(1)} ({deal.reviews})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-auto">
                      <p className="text-blue-600 font-black text-sm">
                        {formatPrice(deal.price)}
                      </p>
                      {deal.oldPrice && (
                        <p className="text-gray-400 line-through text-xs">
                          {formatPrice(deal.oldPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
