"use client";

import { useEffect, useState } from "react";
import { AdminProvider } from "@/components/admin/AdminContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AccessoryForm from "@/components/admin/AccessoryForm";
import { Accessory } from "@/types";
import { formatPrice, parseJsonArray } from "@/lib/utils";
import { Plus, Pencil, Trash2, Package, RefreshCw, Smartphone } from "lucide-react";
import Image from "next/image";

function AccessoriesContent() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editAccessory, setEditAccessory] = useState<Accessory | undefined>(undefined);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function loadAccessories() {
      setLoading(true);
      try {
        const res = await fetch("/api/accessories");
        const data = await parseJsonArray<Accessory>(res);
        if (!cancelled) setAccessories(data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadAccessories();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const handleRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleEdit = (accessory: Accessory) => {
    setEditAccessory(accessory);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this accessory?")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/accessories/${id}`, { method: "DELETE" });
      handleRefresh();
    } catch (error) {
      console.error("Error deleting accessory:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar />
      <div className="md:ml-64 pt-16 md:pt-0 p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Accessories</h1>
            <p className="text-white/40 text-sm mt-1">
              Manage your accessory inventory and upload product images
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleRefresh}
              className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4 text-white/50" />
            </button>
            <button
              type="button"
              onClick={() => {
                setEditAccessory(undefined);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-all flex-1 sm:flex-none"
            >
              <Plus className="w-4 h-4" />
              Add Accessory
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="h-16 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : accessories.length === 0 ? (
          <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/30 text-lg font-semibold mb-2">No accessories yet</p>
            <p className="text-white/20 text-sm mb-6">Add your first accessory to populate the store</p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="px-6 py-2.5 bg-white text-black font-bold rounded-xl text-sm"
            >
              Add First Accessory
            </button>
          </div>
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Accessory</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Category</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Price</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {accessories.map((accessory) => (
                    <tr key={accessory.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                            {accessory.image ? (
                              <Image
                                src={accessory.image}
                                alt={accessory.name}
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
                            {accessory.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded-lg">
                          {accessory.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white text-sm font-semibold">
                          {formatPrice(accessory.price)}
                        </p>
                        {accessory.oldPrice && (
                          <p className="text-white/30 text-xs line-through">
                            {formatPrice(accessory.oldPrice)}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-lg font-medium ${
                          accessory.inStock
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {accessory.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(accessory)}
                            className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
                          >
                            <Pencil className="w-4 h-4 text-white" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(accessory.id)}
                            disabled={deletingId === accessory.id}
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
              {accessories.map((accessory) => (
                <div key={accessory.id} className="p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white/5 flex-shrink-0">
                      {accessory.image ? (
                        <Image
                          src={accessory.image}
                          alt={accessory.name}
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
                        {accessory.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                          {accessory.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          accessory.inStock
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {accessory.inStock ? "In Stock" : "Out"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white font-bold">{formatPrice(accessory.price)}</p>
                      {accessory.oldPrice && (
                        <p className="text-white/30 text-xs line-through">
                          {formatPrice(accessory.oldPrice)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => handleEdit(accessory)}
                      className="flex-1 px-3 py-2 bg-white/10 rounded-lg flex items-center justify-center gap-2 text-sm text-white hover:bg-white/20 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(accessory.id)}
                      disabled={deletingId === accessory.id}
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

        {showForm && (
          <AccessoryForm
            onClose={() => {
              setShowForm(false);
              setEditAccessory(undefined);
            }}
            onSuccess={handleRefresh}
            editAccessory={editAccessory}
          />
        )}
      </div>
    </div>
  );
}

export default function AdminAccessoriesPage() {
  return (
    <AdminProvider>
      <AccessoriesContent />
    </AdminProvider>
  );
}
