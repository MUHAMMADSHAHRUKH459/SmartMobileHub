import { Shield, Zap, HeadphonesIcon, CreditCard, Award, Truck } from "lucide-react";

const reasons = [
  {
    icon: Shield,
    title: "100% Genuine Products",
    desc: "All our phones and accessories are original and come with proper warranty. No replicas, no fakes.",
  },
  {
    icon: CreditCard,
    title: "Easy Installments",
    desc: "Get your dream phone without paying full price. Flexible installment plans starting from 3 months.",
  },
  {
    icon: Zap,
    title: "Latest Models",
    desc: "We always stock the latest smartphones from all major brands including Samsung, iPhone, Xiaomi and more.",
  },
  {
    icon: HeadphonesIcon,
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
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 className="text-3xl lg:text-5xl font-black text-slate-900 mb-4">
            The Smart Mobile Hub
            <br />
            <span className="text-gradient">Difference</span>
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-base">
            We are committed to providing the best mobile shopping experience in Karachi.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                className="bg-slate-50 rounded-2xl p-6 hover-glow transition-all group border border-slate-200"
              >
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 group-hover:bg-slate-100 transition-colors">
                  <Icon className="w-6 h-6 text-slate-900" />
                </div>
                <h3 className="text-slate-900 font-bold text-base mb-2">
                  {reason.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {reason.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}