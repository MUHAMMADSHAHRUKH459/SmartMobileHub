import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

const waLink = generateWhatsAppLink(
  "Hello! I would like to contact Smart Mobile Hub about a product inquiry."
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <section className="pt-32 pb-16 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">
            Contact Smart Mobile Hub
          </h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-base leading-relaxed">
            Need help choosing a phone, want to ask about a sale, or have any other questions? Our team is ready to assist you via WhatsApp, phone, or email.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6 shadow-sm">
              <MapPin className="w-7 h-7 text-slate-900" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">Visit Us</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ghousia Mobile Market, Kharadar, Karachi
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6 shadow-sm">
              <Phone className="w-7 h-7 text-slate-900" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">Call Us</h2>
            <a href="tel:+923218939868" className="text-slate-600 text-sm hover:text-slate-900 transition-colors">
              +92 321 8939868
            </a>
            <p className="text-slate-500 text-xs mt-3">Monday - Saturday, 10am - 8pm</p>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white mb-6 shadow-sm">
              <MessageCircle className="w-7 h-7 text-slate-900" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">WhatsApp</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Fast responses for product questions and general support.
            </p>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-2xl transition-all"
            >
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-24 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Send Us a Message</h2>
            <form className="space-y-5">
              <label className="block text-slate-600 text-sm">
                Your Name
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                />
              </label>

              <label className="block text-slate-600 text-sm">
                Email Address
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400"
                />
              </label>

              <label className="block text-slate-600 text-sm">
                Message
                <textarea
                  rows={6}
                  placeholder="Tell us how we can help"
                  className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-slate-400 resize-none"
                />
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-3 bg-slate-900 text-white font-semibold rounded-2xl hover:bg-slate-800 transition-all"
                >
                  Submit Request
                </button>
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-2xl transition-all"
                >
                  Message on WhatsApp
                </Link>
              </div>
            </form>
          </div>

          <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Business Hours</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Store Hours</p>
                  <p className="text-slate-500 text-sm">Mon - Sat: 10:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                  <Mail className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <p className="text-slate-900 font-semibold">Email Support</p>
                  <p className="text-slate-500 text-sm">support@smartmobilehub.com</p>
                </div>
              </div>
            </div>
            <div className="mt-10 bg-white rounded-3xl p-6 shadow-sm">
              <p className="text-slate-900 font-semibold mb-2">Need urgent help?</p>
              <p className="text-slate-500 text-sm">
                Click the button below and start a WhatsApp chat with our support team right away.
              </p>
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-2xl transition-all"
              >
                Contact via WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}