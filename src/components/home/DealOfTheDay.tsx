"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DealOfTheDayProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    slug: string;
  };
  timeRemaining?: string;
}

export default function DealOfTheDay({ product, timeRemaining = "12h 45m" }: DealOfTheDayProps) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <section className="py-12 px-4 lg:px-8 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left - Deal Info */}
          <div>
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full mb-4 font-bold">
              🔥 Deal of the Day
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              Limited Time Offer
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              {product.name}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl font-black text-blue-600">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-2xl line-through text-gray-400">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <span className="text-2xl font-bold text-red-500">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              {product.oldPrice && (
                <p className="text-green-600 font-semibold">
                  You Save: {formatPrice(product.oldPrice - product.price)}
                </p>
              )}
            </div>

            {/* Timer */}
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg mb-6 border border-blue-200">
              <Clock className="w-5 h-5 text-red-500" />
              <span className="font-bold text-gray-900">
                Hurry! Offer ends in <span className="text-red-500">{timeRemaining}</span>
              </span>
            </div>

            {/* CTA */}
            <Link
              href={`/shop/${product.slug}`}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all hover:shadow-lg"
            >
              View Deal
            </Link>
          </div>

          {/* Right - Product Image */}
          <div className="relative h-80 bg-white rounded-xl flex items-center justify-center border-2 border-blue-300 overflow-hidden">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
            ) : (
              <div className="text-6xl">📱</div>
            )}

            {/* Badge */}
            <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
              -{discount}%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
