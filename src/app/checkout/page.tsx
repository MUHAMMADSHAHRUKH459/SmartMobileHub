"use client";

import { useEffect, useState, type FormEvent } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AlertTriangle } from "lucide-react";
import { CartItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [instructionAcknowledged, setInstructionAcknowledged] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (paymentMethod !== "Online Payment") {
      setInstructionAcknowledged(false);
    }
  }, [paymentMethod]);

  useEffect(() => {
    let cancelled = false;
    async function loadCart() {
      setLoading(true);
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        if (!cancelled) setCartItems(data || []);
      } catch (err) {
        console.error(err);
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

  const totalAmount = cartItems.reduce((sum, item) => {
    const price = item.product?.price ?? item.accessory?.price ?? 0;
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (paymentMethod === "Online Payment" && !instructionAcknowledged) {
      setError("Please read the online payment instructions and acknowledge them before placing your order.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const items = cartItems.map((it) => ({
        productId: it.product?.id ?? undefined,
        accessoryId: it.accessory?.id ?? undefined,
        name: it.product?.name ?? it.accessory?.name ?? "Item",
        quantity: it.quantity,
        unitPrice: it.product?.price ?? it.accessory?.price ?? 0,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          phone,
          address,
          paymentMethod,
          items,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Failed to create order");
      }

      // clear cart items
      await Promise.all(
        cartItems.map((it) => fetch(`/api/cart/${it.id}`, { method: "DELETE" }))
      );

      setSuccess("Order placed successfully.");
      // optionally navigate to home or orders page after a short delay
      setTimeout(() => router.push("/"), 1800);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-12 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.3em]">Checkout</p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Complete your order</h1>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-28 rounded-3xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Name</label>
                    <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Phone</label>
                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Address</label>
                    <textarea required value={address} onChange={(e) => setAddress(e.target.value)} rows={4} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">Payment method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-400">
                      <option>Cash on Delivery</option>
                      <option>Online Payment</option>
                    </select>
                  </div>

                  {paymentMethod === "Online Payment" && (
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-6 space-y-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">Nayapay Account</p>
                        <p className="mt-2 text-2xl font-bold text-slate-900">03218939868</p>
                        <p className="mt-1 text-sm text-slate-600">Account Name: AHSAN</p>
                      </div>

                      <div className="rounded-3xl border border-red-200 bg-white p-4 flex flex-col gap-4">
                        <div className="flex items-start gap-3 text-red-700">
                          <AlertTriangle className="w-6 h-6" />
                          <p className="text-sm leading-6">
                            If you have completed your payment, you must send a screenshot to us on WhatsApp before your order can be processed.
                          </p>
                        </div>

                        <a
                          href="https://wa.me/923218939868"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 transition"
                        >
                          Send Screenshot on WhatsApp
                        </a>
                      </div>

                      <label className="inline-flex items-center gap-3 mt-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={instructionAcknowledged}
                          onChange={(e) => setInstructionAcknowledged(e.target.checked)}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        I have read the payment instructions and agree to send the WhatsApp screenshot before processing.
                      </label>
                    </div>
                  )}

                  <div className="pt-4 flex gap-3">
                    <button type="submit" disabled={submitting || (paymentMethod === "Online Payment" && !instructionAcknowledged)} className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-50">
                      {submitting ? "Placing order..." : "Place Order"}
                    </button>
                  </div>

                  {error && <p className="text-red-600 mt-2">{error}</p>}
                  {success && <p className="text-green-600 mt-2">{success}</p>}
                </form>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Order summary</h2>
                  {cartItems.length === 0 ? (
                    <p className="text-slate-600">Your cart is empty.</p>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((it) => (
                        <div key={it.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{it.product?.name ?? it.accessory?.name}</p>
                            <p className="text-sm text-slate-500">Qty: {it.quantity}</p>
                          </div>
                          <div className="text-slate-900 font-semibold">{formatPrice((it.product?.price ?? it.accessory?.price ?? 0) * it.quantity)}</div>
                        </div>
                      ))}

                      <div className="border-t pt-4 flex items-center justify-between">
                        <p className="text-slate-600">Total</p>
                        <p className="text-2xl font-black text-slate-900">{formatPrice(totalAmount)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
