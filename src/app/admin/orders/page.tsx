"use client";

import { useEffect, useState } from "react";
import { AdminProvider } from "@/components/admin/AdminContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Order } from "@/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/orders");
        const data = await res.json();
        if (!cancelled) setOrders(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <AdminProvider>
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="md:ml-64 pt-16 md:pt-0 p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black">Orders</h1>
            <p className="text-white/40">View recent orders and details</p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-white/30 text-lg">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{order.customerName} — {order.phone}</p>
                    <p className="text-sm text-white/40">{order.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.total.toFixed(0)}</p>
                    <p className="text-sm text-white/40">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3 border-t border-white/5 pt-3">
                  <p className="text-sm font-semibold">Items</p>
                  <ul className="mt-2 list-disc pl-5 text-sm">
                    {order.items.map((it) => (
                      <li key={it.id}>{it.name} x {it.quantity} — Rs. {it.unitPrice}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </AdminProvider>
  );
}
