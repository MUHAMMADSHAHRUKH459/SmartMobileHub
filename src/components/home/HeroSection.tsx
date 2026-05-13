"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Star, Shield, Zap } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

export default function HeroSection() {
  const waLink = generateWhatsAppLink("Hello! I want to know more about your mobile phones.");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/80 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/80 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/80 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 py-32">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 mb-8 animate-fade-in">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            {"Karachi's Most Trusted Mobile Shop"}
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          </div>

          {/* Heading */}
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 leading-tight animate-fade-in [animation-delay:100ms]">
            Premium Mobiles
            <br />
            <span className="text-gradient">At Your Budget</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in [animation-delay:200ms]">
            Explore the latest smartphones, accessories and flexible installment
            plans. Quality guaranteed at Ghousia Mobile Market, Kharadar Karachi.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in [animation-delay:300ms]">
            <Link
              href="/shop"
              className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all hover:scale-105 active:scale-95 text-base"
            >
              Browse Phones
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 text-base"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
            <Link
              href="/installment"
              className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 text-base"
            >
              Installment Plans
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in [animation-delay:500ms]">
            {[
              { icon: Shield, label: "100% Genuine", desc: "All products are original & verified" },
              { icon: Zap, label: "Easy Installments", desc: "Flexible payment plans available" },
              { icon: MessageCircle, label: "24/7 Support", desc: "Always available on WhatsApp" },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="bg-white shadow-sm border border-slate-200 rounded-2xl p-5 text-center hover-glow transition-all"
                >
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-5 h-5 text-slate-900" />
                  </div>
                  <p className="text-slate-900 font-semibold text-sm mb-1">{feature.label}</p>
                  <p className="text-slate-500 text-xs">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-slate-500 text-xs">Scroll Down</p>
        <div className="w-0.5 h-8 bg-gradient-to-b from-slate-500/40 to-transparent" />
      </div>
    </section>
  );
}