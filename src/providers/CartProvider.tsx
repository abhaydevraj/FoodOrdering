import { CartItem, Product } from "@/src/types";
import { randomUUID } from "expo-crypto";
import { createContext, PropsWithChildren, useContext, useState } from "react";

// type CartItem = number ; // Replace with your actual item type if needed

interface CartType {
  items: CartItem[];
  AddItem: (Product: Product, size: CartItem["size"]) => void;
  updateQuantity?: (itemId: string, amount: -1 | 1) => void; // Optional for now
  total: number;
}

const CartContext = createContext<CartType>({
  items: [],
  AddItem: () => {},
  updateQuantity: () => {},
  total: 0,
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const AddItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size,
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1); // Increase quantity if item already exists
      return;
      // If item already exists in cart, increase quantity
    }
    // if  alredy in cart, increase quantity
    const newCartItem: CartItem = {
      id: randomUUID(), // generate unique id in real app
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems((prevItems) => [...prevItems, newCartItem]); // some changed from video
    console.log("Adding item to cart:", items, newCartItem.id);
  };
  // update quantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + amount };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove items with quantity 0
    });
  };
  return (
    <CartContext.Provider value={{ items, AddItem, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
