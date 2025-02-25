"use client";
import { createContext, useContext, useState } from "react";
import { CartContextType, CartItem, Product } from "@/types";

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({
  children,
  style,
}: {
  children: React.ReactNode;
  style: object;
}) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setItems((prevItems) => {
      console.log("Previous items: ", prevItems);
      const existingItem = prevItems.find((item) => item.id === product.id);
      console.log("Existing item: ", existingItem);
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Updated items: ", updatedItems);
        return updatedItems;
      } else {
        const newItems = [...prevItems, { ...product, quantity: 1 }];
        console.log("New items: ", newItems);
        return newItems;
      }
    });
  };
  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  const getCartTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, getCartTotal }}
    >
      <div style={style}>{children}</div>
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
