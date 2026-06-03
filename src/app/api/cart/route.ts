import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cartItems = await prisma.cartItem.findMany({
      include: {
        product: true,
        accessory: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: "Failed to fetch cart items" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, accessoryId, quantity = 1 } = body;

    if (!productId && !accessoryId) {
      return NextResponse.json(
        { error: "productId or accessoryId is required" },
        { status: 400 }
      );
    }

    const existingCartItem = await prisma.cartItem.findFirst({
      where: productId ? { productId } : { accessoryId },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + Number(quantity) },
      });
      return NextResponse.json(updatedCartItem);
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        productId,
        accessoryId,
        quantity: Number(quantity),
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding cart item:", error);
    return NextResponse.json({ error: "Failed to add cart item" }, { status: 500 });
  }
}
