import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface OrderItem {
  productId?: string;
  accessoryId?: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface OrderBody {
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: OrderItem[];
  deliveryCharge?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body: OrderBody = await req.json();
    const {
      customerName,
      phone,
      address,
      paymentMethod,
      items,
      deliveryCharge = 100,
    } = body;

    if (
      !customerName ||
      !phone ||
      !address ||
      !paymentMethod ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    const subtotal = items.reduce(
      (s: number, it: OrderItem) => s + (it.unitPrice || 0) * (it.quantity || 1),
      0
    );
    const total = subtotal + (deliveryCharge || 0);

    const order = await prisma.order.create({
      data: {
        customerName,
        phone,
        address,
        paymentMethod,
        subtotal,
        deliveryCharge,
        total,
        items: {
          create: items.map((it: OrderItem) => ({
            productId: it.productId || null,
            accessoryId: it.accessoryId || null,
            name: it.name,
            quantity: it.quantity,
            unitPrice: it.unitPrice,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}