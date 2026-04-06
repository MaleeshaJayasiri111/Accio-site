// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  weights: string[];
  benefits: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    fiber: number;
  };
}

// User types
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  address?: string;
  createdAt: string;
}

// Order types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  weight: string;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

// Message types
export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  reply?: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  weight: string;
}

// Admin types
export interface Admin {
  username: string;
  password: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
