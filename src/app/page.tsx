import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import Stats from "@/components/home/Stats";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const dealOfTheDay = {
  id: "1",
  name: "iPhone 15 Pro Max - 256GB",
  price: 299999,
  oldPrice: 399999,
  image: "https://via.placeholder.com/400x400?text=iPhone+15+Pro",
  slug: "iphone-15-pro-max",
  rating: 4.8,
  reviews: 156,
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <Stats />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}