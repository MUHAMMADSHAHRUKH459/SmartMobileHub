import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccessoryDetail from "@/components/accessories/AccessoryDetail";
import { Accessory } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function AccessoryPage({ params }: PageProps) {
  const { slug } = await params;

  const accessory = await prisma.accessory.findUnique({
    where: { slug },
  });

  if (!accessory) notFound();

  const accessoryData: Accessory = {
    id: accessory.id,
    name: accessory.name,
    slug: accessory.slug,
    description: accessory.description,
    price: accessory.price,
    oldPrice: accessory.oldPrice ?? undefined,
    category: accessory.category,
    inStock: accessory.inStock,
    image: accessory.image ?? undefined,
    createdAt: accessory.createdAt.toISOString(),
    updatedAt: accessory.updatedAt.toISOString(),
  };

  return (
    <main>
      <Navbar />
      <AccessoryDetail accessory={accessoryData} />
      <Footer />
    </main>
  );
}