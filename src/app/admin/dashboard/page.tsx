"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Smartphone, Package, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import { Product, Accessory } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [pRes, aRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/accessories"),
        ]);
        const [pData, aData] = await Promise.all([pRes.json(), aRes.json()]);
        if (!cancelled) {
          setProducts(pData);
          setAccessories(aData);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const totalProducts = products.length;
  const totalAccessories = accessories.length;
  const featuredProducts = products.filter((p) => p.featured).length;
  const outOfStock = products.filter((p) => !p.inStock).length;

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Smartphone,
      href: "/admin/products",
    },
    {
      label: "Total Accessories",
      value: totalAccessories,
      icon: Package,
      href: "/admin/accessories",
    },
    {
      label: "Featured Products",
      value: featuredProducts,
      icon: TrendingUp,
      href: "/admin/products",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: Eye,
      href: "/admin/products",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">
            Welcome back! Here is your store overview.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/50 text-sm">{stat.label}</p>
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-black text-white">
                  {loading ? "..." : stat.value}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="flex flex-col gap-3">
              <Link
                href="/admin/products"
                className="flex items-center gap-3 px-4 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition-all text-sm"
              >
                <Smartphone className="w-4 h-4" />
                Manage Products
              </Link>
              <Link
                href="/admin/accessories"
                className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm"
              >
                <Package className="w-4 h-4" />
                Manage Accessories
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-3 px-4 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm"
              >
                <Eye className="w-4 h-4" />
                View Website
              </Link>
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Recent Products</h2>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-white/5 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="text-white/30 text-sm">No products yet</p>
            ) : (
              <div className="space-y-3">
                {products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <div>
                      <p className="text-white text-sm font-medium line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-white/30 text-xs">{product.category}</p>
                    </div>
                    <p className="text-white font-bold text-sm">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}