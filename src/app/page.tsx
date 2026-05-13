import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import Stats from "@/components/home/Stats";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Stats />
      <FeaturedProducts />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}