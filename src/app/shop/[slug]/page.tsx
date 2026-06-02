import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/shop/ProductDetail";
import { Product } from "@/types";

interface PageProps {
  params: { slug: string };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) notFound();

  const productData: Product = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    oldPrice: product.oldPrice ?? undefined,
    category: product.category,
    inStock: product.inStock,
    featured: product.featured,
    images: product.images,
    specs: product.specs as Record<string, string> | undefined,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  return (
    <main>
      <Navbar />
      <ProductDetail product={productData} />
      <Footer />
    </main>
  );
}