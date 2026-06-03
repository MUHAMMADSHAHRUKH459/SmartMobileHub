import { Shield, Zap, Headphones, Award, Truck } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "100% Genuine Products",
    desc: "All our phones and accessories are original and come with proper warranty. No replicas, no fakes.",
  },
  {
    icon: Zap,
    title: "Latest Models",
    desc: "We always stock the latest smartphones from all major brands including Samsung, iPhone, Xiaomi and more.",
  },
  {
    icon: Headphones,
    title: "24/7 WhatsApp Support",
    desc: "Have a question? Message us anytime on WhatsApp. Our team is always ready to help you.",
  },
  {
    icon: Award,
    title: "Best Prices",
    desc: "We offer competitive prices in Karachi market. Get the best deal on every purchase.",
  },
  {
    icon: Truck,
    title: "Quick Delivery",
    desc: "We deliver across Karachi. Order online and get your phone delivered to your doorstep.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">
            ✨ Why Choose Us
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mb-4">
            The Smart Mobile Hub
            <br />
            <span className="text-gradient">Advantage</span>
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-base">
            We are committed to providing the best mobile shopping experience in Karachi with genuine products and exceptional service.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover-glow transition-all group border border-blue-200 relative overflow-hidden"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full -mr-10 -mt-10" />

                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors relative z-10">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-gray-900 font-bold text-base mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to upgrade your mobile?</h3>
          <p className="text-blue-100 mb-6">
            Browse our collection and find the perfect phone for you today
          </p>
          <a
            href="/shop"
            className="inline-block px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Start Shopping
          </a>
        </div>
      </div>
    </section>
  );
}