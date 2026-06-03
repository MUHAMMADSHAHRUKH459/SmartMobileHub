"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Star, Shield, Truck, Clock } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

export default function HeroSection() {
  const waLink = generateWhatsAppLink("Hello! I want to know more about your mobile phones.");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3 text-sm text-white mb-8 shadow-lg animate-fade-in [animation-delay:0ms]">
            <span className="bg-orange-400 text-gray-900 font-bold px-3 py-1 rounded-full tracking-wide">
              🔥 Limited Time Offer
            </span>
            <span>Up to 40% off on selected devices + Free Delivery</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 leading-tight animate-fade-in [animation-delay:100ms]">
            Latest Smartphones
            <br />
            <span className="text-yellow-300">Best Prices</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in [animation-delay:200ms]">
            Shop premium mobiles from all top brands. Genuine products, 2-year warranty, and same-day delivery available in Karachi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in [animation-delay:300ms]">
            <Link
              href="/shop"
              className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all hover:shadow-2xl hover:scale-105 active:scale-95 text-base"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-green-400 hover:bg-green-500 text-white font-bold rounded-lg transition-all hover:shadow-2xl hover:scale-105 active:scale-95 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-in [animation-delay:500ms]">
            {[
              { icon: Shield, label: "100% Genuine", desc: "All products are original & verified" },
              { icon: Truck, label: "Fast Shipping", desc: "Same-day delivery in Karachi" },
              { icon: Clock, label: "24/7 Support", desc: "Always available on WhatsApp" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{feature.label}</p>
                  <p className="text-blue-100 text-xs">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-white/60 text-xs">Scroll Down</p>
        <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}