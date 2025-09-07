'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedWeight?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
}

interface AppStore {
  ageVerified: boolean;
  darkMode: boolean;
  locale: string;
  setAgeVerified: (verified: boolean) => void;
  toggleDarkMode: () => void;
  setLocale: (locale: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...items, { id: product.id, product, quantity }]
          });
        }
      },
      removeItem: (id) => {
        set({ items: get().items.filter(item => item.id !== id) });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      closeCart: () => set({ isOpen: false }),
      openCart: () => set({ isOpen: true }),
      getItemCount: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getSubtotal: () => get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items })
    }
  )
);

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      ageVerified: false,
      darkMode: true,
      locale: 'en',
      setAgeVerified: (verified) => set({ ageVerified: verified }),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
      setLocale: (locale) => set({ locale })
    }),
    {
      name: 'app-storage'
    }
  )
);