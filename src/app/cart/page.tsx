"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      if (!res.ok || !Array.isArray(data)) {
        console.error("Error fetching cart: unexpected response", data);
        setCartItems([]);
        return;
      }

      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      await fetch(`/api/cart/${id}`, { method: "DELETE" });
      await fetchCart();
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.product?.price ?? item.accessory?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>
            <p className="text-slate-500 text-sm mt-1">
              Review cart items and manage checkout from here.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Continue shopping
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-slate-700 text-lg font-semibold">Your cart is empty</p>
            <p className="text-slate-500 mt-2">Add a product to your cart to see it here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => {
              const productName = item.product?.name ?? item.accessory?.name ?? "Item";
              const image = item.product?.images?.[0] ?? item.accessory?.image ?? "";
              const price = item.product?.price ?? item.accessory?.price ?? 0;

              return (
                <div key={item.id} className="grid gap-4 md:grid-cols-[auto_1fr_auto] items-center rounded-3xl border border-slate-200 p-5">
                  <div className="relative h-28 w-28 rounded-3xl overflow-hidden bg-slate-100">
                    {image ? (
                      <img src={image} alt={productName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-slate-400">
                        No image
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{productName}</p>
                    <p className="text-sm text-slate-500">Quantity: {item.quantity}</p>
                    <p className="text-sm text-slate-500">
                      Unit Price: {formatPrice(price)}
                    </p>
                    <p className="text-sm text-slate-900 font-semibold mt-2">
                      Total: {formatPrice(price * item.quantity)}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={removingId === item.id}
                    onClick={() => handleRemove(item.id)}
                    className="inline-flex items-center gap-2 rounded-3xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              );
            })}

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-slate-500 text-sm">Cart total</p>
                <p className="text-3xl font-black text-slate-900">{formatPrice(totalPrice)}</p>
              </div>
              <button className="w-full md:w-auto rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
