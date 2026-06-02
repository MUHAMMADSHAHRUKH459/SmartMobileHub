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

export interface CartItem {
  id: string;
  productId?: string;
  accessoryId?: string;
  quantity: number;
  product?: Product;
  accessory?: Accessory;
  createdAt: string;
  updatedAt: string;
}