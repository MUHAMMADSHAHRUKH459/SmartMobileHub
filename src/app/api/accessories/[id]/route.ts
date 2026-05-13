import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const accessory = await prisma.accessory.findUnique({ where: { id } });
    if (!accessory) {
      return NextResponse.json({ error: "Accessory not found" }, { status: 404 });
    }
    return NextResponse.json(accessory);
  } catch (error) {
    console.error("Error fetching accessory:", error);
    return NextResponse.json(
      { error: "Failed to fetch accessory" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, description, price, oldPrice, category, inStock, image } = body;

    const accessory = await prisma.accessory.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(oldPrice !== undefined && { oldPrice: oldPrice ? parseFloat(oldPrice) : null }),
        ...(category && { category }),
        ...(inStock !== undefined && { inStock }),
        ...(image !== undefined && { image }),
      },
    });

    return NextResponse.json(accessory);
  } catch (error) {
    console.error("Error updating accessory:", error);
    return NextResponse.json(
      { error: "Failed to update accessory" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.accessory.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting accessory:", error);
    return NextResponse.json(
      { error: "Failed to delete accessory" },
      { status: 500 }
    );
  }
}