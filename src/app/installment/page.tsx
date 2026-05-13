"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MessageCircle, CheckCircle, CreditCard, Calendar, Shield } from "lucide-react";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";

const plans = [
  {
    months: 3,
    label: "3 Month Plan",
    desc: "Short term plan with lowest total cost. Perfect for budget-conscious buyers who want to clear debt quickly.",
    downPayment: "20%",
    features: [
      "20% down payment required",
      "Equal monthly installments",
      "No hidden charges",
      "Quick approval process",
      "Available on all smartphones",
    ],
    popular: false,
    color: "border-slate-200",
  },
  {
    months: 6,
    label: "6 Month Plan",
    desc: "Most popular plan. Balance between monthly payments and total duration. Ideal for mid-range phones.",
    downPayment: "15%",
    features: [
      "15% down payment required",
      "Equal monthly installments",
      "No hidden charges",
      "Fast processing",
      "Available on all smartphones",
      "Free case with every purchase",
    ],
    popular: true,
    color: "border-slate-900",
  },
  {
    months: 12,
    label: "12 Month Plan",
    desc: "Long term plan with lowest monthly payments. Best for premium flagship smartphones.",
    downPayment: "10%",
    features: [
      "10% down payment required",
      "Equal monthly installments",
      "No hidden charges",
      "Flexible approval",
      "Available on premium phones",
      "Free case + screen protector",
      "Priority customer support",
    ],
    popular: false,
    color: "border-slate-200",
  },
];

const requirements = [
  "Valid CNIC (National Identity Card)",
  "Proof of income or employment",
  "Two references with contact numbers",
  "Small down payment (10-20% of phone price)",
];

function InstallmentContent() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("name");
  const productPrice = searchParams.get("price");

  const waMessage = productName
    ? `Hello! I want to apply for installment on ${productName} (Price: ${formatPrice(Number(productPrice))}). Please guide me through the process.`
    : "Hello! I want to know more about your installment plans. Please guide me.";

  const waLink = generateWhatsAppLink(waMessage);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-3">
            Easy Payments
          </p>
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 mb-4">
            Installment Plans
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-base mb-6">
            Get your dream phone today and pay in easy monthly installments.
            No complicated process — just simple, transparent payments.
          </p>

          {/* Product Banner */}
          {productName && (
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-slate-100 border border-slate-200 rounded-2xl mb-8">
              <CreditCard className="w-5 h-5 text-slate-900" />
              <div className="text-left">
                <p className="text-slate-600 text-xs">Applying for installment on</p>
                <p className="text-slate-900 font-bold text-sm">{productName}</p>
              </div>
              {productPrice && (
                <div className="text-right border-l border-slate-200 pl-3">
                  <p className="text-slate-600 text-xs">Price</p>
                  <p className="text-slate-900 font-bold text-sm">
                    {formatPrice(Number(productPrice))}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Plans */}
      <section className="pb-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.months}
                className={`relative bg-slate-50 rounded-2xl p-6 border-2 ${plan.color} transition-all hover-glow`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-black px-4 py-1 rounded-full"
>
                    MOST POPULAR
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-slate-900" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-black text-lg">{plan.label}</h3>
                    <p className="text-slate-500 text-xs">Down payment: {plan.downPayment}</p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm mb-5 leading-relaxed">
                  {plan.desc}
                </p>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <p className="text-slate-600 text-sm">{feature}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 ${
                    plan.popular
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Apply via WhatsApp
                </a>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-slate-900" />
                </div>
                <h3 className="text-slate-900 font-bold text-lg">Requirements</h3>
              </div>
              <div className="space-y-3">
                {requirements.map((req) => (
                  <div key={req} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-600 text-sm">{req}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center bg-slate-50 rounded-2xl p-10 border border-slate-200">
              <h2 className="text-2xl lg:text-3xl font-black text-slate-900 mb-3">
                Ready to Get Started?
              </h2>
              <p className="text-slate-600 mb-6 max-w-md mx-auto text-sm">
                Contact us on WhatsApp and our team will guide you through the entire process.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-black font-bold rounded-2xl transition-all hover:scale-105 active:scale-95 text-base"
              >
                <MessageCircle className="w-5 h-5" />
                Apply Now on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function InstallmentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <InstallmentContent />
    </Suspense>
  );
}