"use client";

import { useEffect, useState } from "react";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { RefreshCw, Trash2, ShoppingCart } from "lucide-react";

export default function AdminCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (!cancelled) setCartItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleRemove = async (id: string) => {
    setRemovingId(id);
    try {
      await fetch(`/api/cart/${id}`, { method: "DELETE" });
      handleRefresh();
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.product?.price ?? item.accessory?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="md:ml-64 pt-16 md:pt-0 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Cart Items</h1>
            <p className="text-white/40 text-sm mt-1">
              All cart activity is visible here instantly.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-wrap gap-4">
              <div className="rounded-3xl bg-white/10 px-4 py-3">
                <p className="text-xs text-white/50">Items</p>
                <p className="text-2xl font-black text-white">{totalItems}</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-4 py-3">
                <p className="text-xs text-white/50">Cart Value</p>
                <p className="text-2xl font-black text-white">{formatPrice(totalAmount)}</p>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-24 rounded-3xl bg-white/5 animate-pulse" />
              ))}
            </div>
          ) : cartItems.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
              <p className="text-white/30 text-lg font-semibold mb-2">No cart items yet</p>
              <p className="text-white/40 text-sm">Products added to cart will show up here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const productName = item.product?.name ?? item.accessory?.name ?? "Item";
                const price = item.product?.price ?? item.accessory?.price ?? 0;
                const category = item.product?.category ?? item.accessory?.category ?? "";

                return (
                  <div key={item.id} className="grid gap-4 md:grid-cols-[1fr_auto] rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div>
                      <p className="text-lg font-semibold text-white">{productName}</p>
                      <p className="text-sm text-white/50">{category}</p>
                      <p className="text-sm text-white/40 mt-2">Quantity: {item.quantity}</p>
                      <p className="text-sm text-white/40">Price per unit: {formatPrice(price)}</p>
                      <p className="text-sm text-white/40">Total: {formatPrice(price * item.quantity)}</p>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      disabled={removingId === item.id}
                      className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-400 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
