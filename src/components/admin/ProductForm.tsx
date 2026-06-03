"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { X, Upload, Plus, Trash2, Smartphone } from "lucide-react";
import { Product } from "@/types";

interface ProductFormState {
  name: string;
  description: string;
  price: number;
  oldPrice: number | "";
  category: string;
  condition: string | null;
  inStock: boolean;
  featured: boolean;
}

interface ProductFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editProduct?: Product;
}

const categories = ["Smartphones", "Tablets", "Keypad", "Accessories"];

export default function ProductForm({
  onClose,
  onSuccess,
  editProduct,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>(editProduct?.images || []);
  const [specsInput, setSpecsInput] = useState<{ key: string; value: string }[]>(
    editProduct?.specs
      ? Object.entries(editProduct.specs).map(([key, value]) => ({ key, value: value as string }))
      : [{ key: "", value: "" }]
  );
  const [form, setForm] = useState<ProductFormState>({
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    price: editProduct?.price || 0,
    oldPrice: editProduct?.oldPrice ?? "",
    category: editProduct?.category || "",
    condition: editProduct?.condition ?? null,
    inStock: editProduct?.inStock ?? true,
    featured: editProduct?.featured ?? true,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      const parsedValue = value === "" ? (name === "oldPrice" ? "" : 0) : Number(value);
      setForm((prev) => ({ ...prev, [name]: parsedValue }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }
    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("bucket", "products");
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          setImages((prev) => [...prev, data.url]);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
    setSpecsInput((prev) =>
      prev.map((spec, i) => (i === index ? { ...spec, [field]: value } : spec))
    );
  };

  const addSpec = () => {
    setSpecsInput((prev) => [...prev, { key: "", value: "" }]);
  };

  const removeSpec = (index: number) => {
    setSpecsInput((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const specs: Record<string, string> = {};
      specsInput.forEach(({ key, value }) => {
        if (key.trim() && value.trim()) specs[key.trim()] = value.trim();
      });

      const url = editProduct ? `/api/products/${editProduct.id}` : "/api/products";
      const method = editProduct ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          featured: editProduct ? form.featured : true,
          price: parseFloat(String(form.price)),
          oldPrice: form.oldPrice !== "" ? Number(form.oldPrice) : null,
          images,
          specs,
          condition: form.condition || null,
        }),
      });

      if (res.ok) {
        onSuccess();
        onClose();
      } else {
        const data = await res.json();
        alert(data.error || "Error saving product");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                {editProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-xs text-white/40">Fill in product details</p>
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

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              required
              placeholder="Samsung Galaxy S24"
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
              placeholder="Write product description..."
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

          {form.category === "Smartphones" && (
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Condition
              </label>
              <select
                name="condition"
                value={form.condition ?? ""}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm outline-none focus:border-white/30 transition-all"
              >
                <option value="">Select condition...</option>
                <option value="new">New</option>
                <option value="used">Used</option>
              </select>
            </div>
          )}

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
                placeholder="50000"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-1">
                Old Price (PKR) — Optional
              </label>
              <input
                type="number"
                name="oldPrice"
                value={form.oldPrice}
                onChange={handleInputChange}
                min="0"
                placeholder="60000"
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30 transition-all"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleInputChange}
                className="w-4 h-4 accent-white"
              />
              <span className="text-white/70 text-sm">Featured on Home</span>
            </label>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              Product Images (Max 4)
            </label>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                  <Image src={img} alt="" className="w-full h-full object-cover" fill sizes="200px" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-lg flex items-center justify-center"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-white/40 transition-colors">
                  <Upload className="w-6 h-6 text-white/30 mb-1" />
                  <span className="text-white/30 text-xs">
                    {uploading ? "Uploading..." : "Add Image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Specs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white/70">
                Specifications (Optional)
              </label>
              <button
                type="button"
                onClick={addSpec}
                className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors"
              >
                <Plus className="w-3 h-3" />
                Add Spec
              </button>
            </div>
            <div className="space-y-2">
              {specsInput.map((spec, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. RAM"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30"
                  />
                  <input
                    type="text"
                    placeholder="e.g. 8GB"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/20 text-sm outline-none focus:border-white/30"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              ))}
            </div>
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
              {loading ? "Saving..." : editProduct ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}