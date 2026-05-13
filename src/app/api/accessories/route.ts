import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

export async function GET() {
  try {
    const accessories = await prisma.accessory.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(accessories);
  } catch (error) {
    console.error("Error fetching accessories:", error);
    return NextResponse.json(
      { error: "Failed to fetch accessories" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, oldPrice, category, inStock, image } = body;

    const slug = slugify(name) + "-" + Date.now();

    const accessory = await prisma.accessory.create({
      data: {
        name,
        slug,
        description,
        price: parseFloat(price),
        oldPrice: oldPrice ? parseFloat(oldPrice) : null,
        category,
        inStock: inStock ?? true,
        image: image || null,
      },
    });

    return NextResponse.json(accessory, { status: 201 });
  } catch (error) {
    console.error("Error creating accessory:", error);
    return NextResponse.json(
      { error: "Failed to create accessory" },
      { status: 500 }
    );
  }
}