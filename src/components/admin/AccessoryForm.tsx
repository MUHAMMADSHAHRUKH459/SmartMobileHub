"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Upload, Package } from "lucide-react";
import { Accessory } from "@/types";

interface AccessoryFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editAccessory?: Accessory;
}

const categories = ["Earbuds", "Power Bank", "Charger", "Protector", "Cable", "Other"];

export default function AccessoryForm({
  onClose,
  onSuccess,
  editAccessory,
}: AccessoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<string>(editAccessory?.image || "");
  const [form, setForm] = useState({
    name: editAccessory?.name || "",
    description: editAccessory?.description || "",
    price: editAccessory?.price || 0,
    oldPrice: editAccessory?.oldPrice || "",
    category: editAccessory?.category || "",
    inStock: editAccessory?.inStock ?? true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("bucket", "accessories");
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) setImage(data.url);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editAccessory
        ? `/api/accessories/${editAccessory.id}`
        : "/api/accessories";
      const method = editAccessory ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(String(form.price)),
          oldPrice: form.oldPrice ? parseFloat(String(form.oldPrice)) : null,
          image: image || null,
        }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await res.json();
        alert(data.error || "Error saving accessory");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {editAccessory ? "Edit Accessory" : "Add New Accessory"}
              </h2>
              <p className="text-xs text-white/40">Fill in accessory details</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Accessory Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              placeholder="Samsung Earbuds Pro"
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Write accessory description..."
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30 transition-all resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-white/30 transition-all"
            >
              <option value="">Select category...</option>
              {categories.map((c) => (
                <option key={c} value={c} className="bg-zinc-900">{c}</option>
              ))}
            </select>
          </div>

          {/* Price & Old Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Price (PKR)
              </label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                required
                min="0"
                placeholder="2500"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Old Price — Optional
              </label>
              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleInputChange}
                min="0"
                placeholder="3000"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30 transition-all"
              />
            </div>
          </div>

          {/* In Stock */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleInputChange}
              className="w-4 h-4 accent-white"
            />
            <span className="text-white/70 text-sm">In Stock</span>
          </label>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Product Image
            </label>
            {image ? (
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-white/10">
                <Image src={image} alt="" className="w-full h-full object-cover" fill sizes="200px" />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ) : (
              <label className="w-32 h-32 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
                <Upload className="w-6 h-6 text-white/30 mb-1" />
                <span className="text-white/30 text-xs">
                  {uploading ? "Uploading..." : "Upload Image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 border border-white/20 text-white/70 text-sm font-medium rounded-xl hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 py-2.5 bg-white text-black text-sm font-bold rounded-xl hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : editAccessory ? "Update" : "Add Accessory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}