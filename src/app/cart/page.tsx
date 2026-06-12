"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      setLoading(true);
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (!cancelled) setCartItems(data || []);
      } catch (error) {
        console.error("Error loading cart:", error);
        if (!cancelled) setCartItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCart();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      await fetch(`/api/cart/${id}`, { method: "DELETE" });
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.product?.price ?? item.accessory?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.3em]">Your Cart</p>
                <h1 className="mt-3 text-3xl font-bold text-slate-900">Review your items</h1>
                <p className="mt-2 text-slate-600">Confirm quantities, remove items, or continue shopping.</p>
              </div>
              <Link href="/shop" className="inline-flex items-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                Continue Shopping
              </Link>
            </div>

            <div className="mt-10 space-y-6">
              {loading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
                  ))}
                </div>
              ) : cartItems.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-12 text-center">
                  <p className="text-slate-700 text-lg font-semibold">Your cart is empty</p>
                  <p className="text-slate-500 mt-2">Add a product or accessory to view it here.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const title = item.product?.name ?? item.accessory?.name ?? "Item";
                    const price = item.product?.price ?? item.accessory?.price ?? 0;
                    const category = item.product?.category ?? item.accessory?.category ?? "";

                    return (
                      <div key={item.id} className="grid gap-4 md:grid-cols-[1fr_auto] rounded-3xl border border-slate-200 bg-slate-50 p-5">
                        <div>
                          <p className="text-lg font-semibold text-slate-900">{title}</p>
                          {category && <p className="text-sm text-slate-500">{category}</p>}
                          <p className="text-sm text-slate-500 mt-2">Quantity: {item.quantity}</p>
                          <p className="text-sm text-slate-500">Unit price: {formatPrice(price)}</p>
                          <p className="text-sm text-slate-900 font-semibold mt-2">Total: {formatPrice(price * item.quantity)}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          disabled={removingId === item.id}
                          className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    );
                  })}

                  <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-slate-500 text-sm">Cart total</p>
                      <p className="text-3xl font-black text-slate-900">{formatPrice(totalAmount)}</p>
                    </div>
                    <Link href="/checkout" className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                      Proceed to Checkout
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
