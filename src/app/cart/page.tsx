"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CartItem, Order } from "@/types";
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

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [processing, setProcessing] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [orderResult, setOrderResult] = useState<any | null>(null);

  const openCheckout = () => setCheckoutOpen(true);
  const closeCheckout = () => {
    setCheckoutOpen(false);
    setShowPaymentOptions(false);
    setOrderResult(null);
  };

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const proceedToPaymentOptions = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill all customer details");
      return;
    }
    setShowPaymentOptions(true);
  };

  const createOrder = async (method: "COD" | "ONLINE") => {
    setProcessing(true);
    try {
      const items = cartItems.map((it) => ({
        productId: it.productId || null,
        accessoryId: it.accessoryId || null,
        name: it.product?.name || it.accessory?.name || "Item",
        quantity: it.quantity,
        unitPrice: it.product?.price ?? it.accessory?.price ?? 0,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customer.name,
          phone: customer.phone,
          address: customer.address,
          paymentMethod: method,
          items,
          deliveryCharge: 100,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Order failed");

      setOrderResult({ method, order: data });
      // Optionally: clear cart via API
    } catch (error: any) {
      console.error("Order error:", error);
      alert(error.message || "Failed to create order");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
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
              <button onClick={openCheckout} className="w-full md:w-auto rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    {/* Checkout modal */}
    {checkoutOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <div className="bg-white rounded-2xl max-w-xl w-full p-6">
          {!showPaymentOptions && !orderResult && (
            <div>
              <h2 className="text-xl font-bold">Checkout - Customer Details</h2>
              <p className="text-sm text-slate-600">Enter your information to proceed.</p>
              <div className="mt-4 space-y-3">
                <input name="name" value={customer.name} onChange={handleCustomerChange} placeholder="Full name" className="w-full p-2 border rounded" />
                <input name="phone" value={customer.phone} onChange={handleCustomerChange} placeholder="Phone number" className="w-full p-2 border rounded" />
                <textarea name="address" value={customer.address} onChange={handleCustomerChange} placeholder="Full delivery address" className="w-full p-2 border rounded" />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={closeCheckout} className="px-4 py-2 rounded border">Cancel</button>
                <button onClick={proceedToPaymentOptions} className="px-4 py-2 rounded bg-blue-600 text-white">Process to Checkout</button>
              </div>
            </div>
          )}

          {showPaymentOptions && !orderResult && (
            <div>
              <h2 className="text-xl font-bold">Choose Payment Method</h2>
              <div className="mt-4 space-y-3">
                <div className="p-3 border rounded">
                  <h3 className="font-semibold">Cash On Delivery</h3>
                  <p className="text-sm text-slate-600">Pay when your order arrives.</p>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => createOrder("COD")} disabled={processing} className="px-4 py-2 rounded bg-green-600 text-white">Cash On Delivery</button>
                  </div>
                </div>
                <div className="p-3 border rounded">
                  <h3 className="font-semibold">Pay Online</h3>
                  <p className="text-sm text-slate-600">Complete payment and send screenshot to confirm.</p>
                  <div className="mt-2 flex gap-2">
                    <button onClick={() => createOrder("ONLINE")} disabled={processing} className="px-4 py-2 rounded bg-blue-600 text-white">Pay Online</button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={() => setShowPaymentOptions(false)} className="px-4 py-2 rounded border">Back</button>
                <button onClick={closeCheckout} className="px-4 py-2 rounded bg-gray-200">Close</button>
              </div>
            </div>
          )}

          {orderResult && (
            <div>
              {orderResult.method === "COD" ? (
                <div>
                  <h2 className="text-xl font-bold">Order Confirmed</h2>
                  <p className="text-sm text-slate-600 mt-2">Thank you! Your order has been placed.</p>
                  <div className="mt-4 p-4 border rounded bg-slate-50">
                    <p><strong>Order ID:</strong> {orderResult.order.id}</p>
                    <p><strong>Total:</strong> {formatPrice(orderResult.order.total)}</p>
                    <p className="mt-2 font-semibold">Order Summary</p>
                    <ul className="mt-2 list-disc pl-5 text-sm">
                      {orderResult.order.items.map((it: any) => (
                        <li key={it.id}>{it.name} x {it.quantity} — {formatPrice(it.unitPrice)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded">Continue Shopping</Link>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold">Order Created Successfully!</h2>
                  <p className="text-sm text-slate-600 mt-2">Order ID: {orderResult.order.id}</p>
                  <div className="mt-4 p-4 border rounded bg-slate-50">
                    <p className="font-semibold">Order Summary</p>
                    <p>Total Items: {orderResult.order.items.length}</p>
                    <p>Subtotal: {formatPrice(orderResult.order.subtotal)}</p>
                    <p>Delivery Charges: {formatPrice(orderResult.order.deliveryCharge)}</p>
                    <p className="font-bold">Total to Pay: {formatPrice(orderResult.order.total)}</p>

                    <div className="mt-4">
                      <h4 className="font-semibold">Complete Your Payment</h4>
                      <ol className="list-decimal pl-5 mt-2 text-sm space-y-2">
                        <li>
                          Send payment to Nayapay<br />
                          <strong>Account Number:</strong> 0321 8939868<br />
                          <strong>Account Name:</strong> AHSAN<br />
                          <strong>Amount:</strong> {formatPrice(orderResult.order.total)}
                        </li>
                        <li>Take a screenshot of payment — make sure transaction details are visible.</li>
                        <li>Send screenshot on WhatsApp — click the button below to send.</li>
                      </ol>
                      <div className="mt-3">
                        <a className="inline-block px-4 py-2 bg-green-600 text-white rounded" href={`https://wa.me/92?text=${encodeURIComponent("I have paid for order " + orderResult.order.id)}"`} target="_blank" rel="noreferrer">Send on WhatsApp</a>
                      </div>
                      <p className="text-sm text-red-600 mt-3">⚠️ PAYMENT IS COMPULSORY ⚠️ Send your payment screenshot on our WhatsApp to confirm your order.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )}
    </>
  );
}
