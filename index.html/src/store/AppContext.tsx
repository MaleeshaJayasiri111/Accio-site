import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Product, User, Order, Message, CartItem, OrderStatus } from '@/types';
import { products as initialProducts, initialUsers, initialOrders, initialMessages } from '@/data/products';

// State interface
interface AppState {
  // Products
  products: Product[];
  // Users
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  // Orders
  orders: Order[];
  // Cart
  cart: CartItem[];
  // Messages
  messages: Message[];
  // Admin
  admin: { username: string; password: string } | null;
  isAdminAuthenticated: boolean;
}

// Action types
type Action =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: OrderStatus } }
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_ITEM'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'REPLY_MESSAGE'; payload: { messageId: string; reply: string } }
  | { type: 'DELETE_MESSAGE'; payload: string }
  | { type: 'ADMIN_LOGIN'; payload: { username: string; password: string } }
  | { type: 'ADMIN_LOGOUT' }
  | { type: 'UPDATE_ADMIN_CREDENTIALS'; payload: { username: string; password: string } }
  | { type: 'LOAD_STATE'; payload: AppState };

// Initial state
const initialState: AppState = {
  products: initialProducts,
  users: initialUsers,
  currentUser: null,
  isAuthenticated: false,
  orders: initialOrders,
  cart: [],
  messages: initialMessages,
  admin: { username: 'Kavindu Jayasiri', password: 'Accio@2026' },
  isAdminAuthenticated: false,
};

// Reducer
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.payload.id ? action.payload : u)),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };
    case 'LOGIN':
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, currentUser: null, isAuthenticated: false };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.orderId ? { ...o, status: action.payload.status, updatedAt: new Date().toISOString() } : o
        ),
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(
        (item) => item.product.id === action.payload.product.id && item.weight === action.payload.weight
      );
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.product.id && item.weight === action.payload.weight
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      };
    case 'UPDATE_CART_ITEM':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.productId ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'REPLY_MESSAGE':
      return {
        ...state,
        messages: state.messages.map((m) =>
          m.id === action.payload.messageId ? { ...m, reply: action.payload.reply } : m
        ),
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((m) => m.id !== action.payload),
      };
    case 'ADMIN_LOGIN':
      return { ...state, isAdminAuthenticated: true };
    case 'ADMIN_LOGOUT':
      return { ...state, isAdminAuthenticated: false };
    case 'UPDATE_ADMIN_CREDENTIALS':
      return { ...state, admin: { username: action.payload.username, password: action.payload.password } };
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('accioState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: { ...initialState, ...parsedState } });
      } catch (e) {
        console.error('Failed to load state from localStorage', e);
      }
    }
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    const stateToSave = {
      users: state.users,
      orders: state.orders,
      messages: state.messages,
      admin: state.admin,
    };
    localStorage.setItem('accioState', JSON.stringify(stateToSave));
  }, [state.users, state.orders, state.messages, state.admin]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

// Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Helper hooks
export function useProducts() {
  const { state } = useApp();
  return state.products;
}

export function useProduct(id: string) {
  const { state } = useApp();
  return state.products.find((p) => p.id === id);
}

export function useCart() {
  const { state, dispatch } = useApp();
  return {
    cart: state.cart,
    addToCart: (item: CartItem) => dispatch({ type: 'ADD_TO_CART', payload: item }),
    removeFromCart: (productId: string) => dispatch({ type: 'REMOVE_FROM_CART', payload: productId }),
    updateCartItem: (productId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_CART_ITEM', payload: { productId, quantity } }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    cartTotal: state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
    cartCount: state.cart.reduce((count, item) => count + item.quantity, 0),
  };
}

export function useAuth() {
  const { state, dispatch } = useApp();
  return {
    user: state.currentUser,
    isAuthenticated: state.isAuthenticated,
    login: (user: User) => dispatch({ type: 'LOGIN', payload: user }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    register: (user: User) => dispatch({ type: 'ADD_USER', payload: user }),
  };
}

export function useAdmin() {
  const { state, dispatch } = useApp();
  return {
    admin: state.admin,
    isAdminAuthenticated: state.isAdminAuthenticated,
    login: (username: string, password: string) => {
      if (state.admin && state.admin.username === username && state.admin.password === password) {
        dispatch({ type: 'ADMIN_LOGIN', payload: { username, password } });
        return true;
      }
      return false;
    },
    logout: () => dispatch({ type: 'ADMIN_LOGOUT' }),
    updateCredentials: (username: string, password: string) =>
      dispatch({ type: 'UPDATE_ADMIN_CREDENTIALS', payload: { username, password } }),
  };
}
