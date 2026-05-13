export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  inStock: boolean;
  featured: boolean;
  images: string[];
  specs?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Accessory {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  inStock: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}