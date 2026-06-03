"use client";

import { useState, useEffect } from "react";
import { AdminProvider } from "@/components/admin/AdminContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/types";
import { formatPrice, parseJsonArray } from "@/lib/utils";
import {
  Plus,
  Pencil,
  Trash2,
  Smartphone,
  RefreshCw,
  Star,
  StarOff,
} from "lucide-react";
import Image from "next/image";

function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await parseJsonArray<Product>(res);
        if (!cancelled) setProducts(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [refreshKey]);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      handleRefresh();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !product.featured }),
      });
      handleRefresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="md:ml-64 pt-16 md:pt-0 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Products</h1>
            <p className="text-white/40 text-sm mt-1">
              Manage your mobile phones inventory
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleRefresh}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4 text-white/50" />
            </button>
            <button
              onClick={() => { setEditProduct(undefined); setShowForm(true); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-all flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table/List */}
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/30 text-lg font-semibold mb-2">No products yet</p>
            <p className="text-white/20 text-sm mb-6">Add your first product to get started</p>
            <button
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Featured
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                            {product.images[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Smartphone className="w-5 h-5 text-white/20" />
                              </div>
                            )}
                          </div>
                          <p className="text-white text-sm font-medium line-clamp-1">
                            {product.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-lg">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white text-sm font-semibold">
                          {formatPrice(product.price)}
                        </p>
                        {product.oldPrice && (
                          <p className="text-white/30 text-xs line-through">
                            {formatPrice(product.oldPrice)}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                          product.inStock
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleFeatured(product)}
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-white/10"
                        >
                          {product.featured ? (
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          ) : (
                            <StarOff className="w-4 h-4 text-white/30" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <Pencil className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="w-8 h-8 bg-red-500/10 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden divide-y divide-white/5">
              {products.map((product) => (
                <div key={product.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                      {product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Smartphone className="w-5 h-5 text-white/20" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm line-clamp-1">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                          {product.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          product.inStock
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {product.inStock ? "In Stock" : "Out"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-bold">{formatPrice(product.price)}</p>
                      {product.oldPrice && (
                        <p className="text-white/30 text-xs line-through">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    <button
                      onClick={() => handleToggleFeatured(product)}
                      className="flex-1 px-3 py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition-colors hover:bg-white/10"
                    >
                      {product.featured ? (
                        <>
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white">Featured</span>
                        </>
                      ) : (
                        <>
                          <StarOff className="w-4 h-4 text-white/30" />
                          <span className="text-white/50">Mark</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 px-3 py-2 bg-white/10 rounded-lg flex items-center justify-center gap-2 text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deletingId === product.id}
                      className="flex-1 px-3 py-2 bg-red-500/10 rounded-lg flex items-center justify-center gap-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showForm && (
        <ProductForm
          onClose={() => { setShowForm(false); setEditProduct(undefined); }}
          onSuccess={handleRefresh}
          editProduct={editProduct}
        />
      )}
    </div>
  );
}

export default function AdminProductsPage() {
  return (
    <AdminProvider>
      <ProductsContent />
    </AdminProvider>
  );
}