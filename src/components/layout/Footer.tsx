import Link from "next/link";
import { Smartphone, MapPin, Phone, MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/utils";

export default function Footer() {
  const waLink = generateWhatsAppLink("Hello! I want to know more about your products.");

  return (
    <footer className="bg-gray-900 text-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-bold text-white text-base">Smart Mobile</p>
                <p className="text-blue-400 text-xs">Hub</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted mobile shop in Karachi. Premium phones and accessories with 100% genuine products and best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", href: "/" },
                { label: "Shop", href: "/shop" },
                { label: "Accessories", href: "/accessories" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  Ghousia Mobile Market, Kharadar, Karachi
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a
                  href="tel:+923218939868"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  +92 321 8939868
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              Chat With Us
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Get instant replies on WhatsApp for any queries.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors w-fit"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 Smart Mobile Hub. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs">Designed for mobile enthusiasts in Karachi</p>
        </div>
      </div>
    </footer>
  );
}