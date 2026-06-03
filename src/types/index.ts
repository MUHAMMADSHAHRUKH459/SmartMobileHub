export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;
  condition?: string;
  category: string;
  inStock: boolean;
  featured: boolean;
  images: string[];
  specs?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId?: string | null;
  accessoryId?: string | null;
  name: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: string;
  status: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  createdAt: string;
  items: OrderItem[];
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