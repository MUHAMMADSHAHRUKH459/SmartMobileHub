"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

export default function PaymentDetailsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.3em]">Online Payment</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Nayapay Account Details</h1>
              <p className="mt-2 text-slate-600">Use the details below to make your payment and send a screenshot via WhatsApp before your order can be processed.</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Account Number</p>
                <p className="font-semibold text-slate-900">03218939868</p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500">Account Name</p>
                <p className="font-semibold text-slate-900">AHSAN</p>
              </div>

              <div className="rounded-md bg-red-50 border-l-4 border-red-500 p-4 flex flex-col gap-4">
                <div className="flex items-start gap-3 text-red-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                    <path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.75 5.75a.75.75 0 0 0-1.5 0v5.5a.75.75 0 0 0 1.5 0v-5.5Zm-.75 9a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm leading-6">
                    If you have completed your payment, you must send a screenshot to us on WhatsApp before your order can be processed.
                  </p>
                </div>

                <a
                  href="https://wa.me/923218939868"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition"
                >
                  Send Screenshot on WhatsApp
                </a>
              </div>

              <div className="pt-4 flex gap-3">
                <Link href="/checkout" className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                  Back to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
