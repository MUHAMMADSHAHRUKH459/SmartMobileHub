"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.3em]">Contact Us</p>
              <h1 className="mt-4 text-4xl font-bold text-slate-900">Get in Touch</h1>
              <p className="mt-3 text-slate-600 max-w-2xl">
                Have a question about our phones, accessories, shipping, or orders? Send us a message or use the details below.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-3">Address</p>
                <p className="text-slate-900 font-semibold">Ghousia Mobile Market</p>
                <p className="text-slate-600">Kharadar, Karachi, Pakistan</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-3">Phone</p>
                <div className="flex items-center gap-3 text-slate-900 font-semibold">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <a href="tel:+923218939868">+92 321 8939868</a>
                </div>
                <p className="text-slate-600 mt-2">Available 9am�9pm daily</p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mb-3">WhatsApp</p>
                <div className="flex items-center gap-3 text-slate-900 font-semibold">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                  <a href="https://wa.me/923218939868" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
                </div>
                <p className="text-slate-600 mt-2">Quick responses on WhatsApp.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Send us a message</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Name</label>
                    <input type="text" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Email</label>
                    <input type="email" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Message</label>
                    <textarea rows={5} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" placeholder="Tell us how we can help..."></textarea>
                  </div>
                  <button type="submit" className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                    Send Message
                  </button>
                </form>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Need something else?</h2>
                <p className="text-slate-600 mb-4">
                  Visit our shop or view the cart directly from the navbar links.
                </p>
                <Link href="/shop" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                  Browse Shop
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
