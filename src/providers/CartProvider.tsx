import { CartItem, Product } from "@/src/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";

// type CartItem = number ; // Replace with your actual item type if needed

interface CartType {
  items: CartItem[];
  AddItem: (Product: Product, size: CartItem["size"]) => void;
}

const CartContext = createContext<CartType>({
  items: [],
  AddItem: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const AddItem = (product: Product, size: CartItem["size"]) => {
    // if  alredy in cart, increase quantity
    const newCartItem: CartItem = {
      id: "1", // generate unique id in real app
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems((prevItems) => [...prevItems, newCartItem]); // some changed from video
    console.log("Adding item to cart:", items);
  };
  // update quantity

  return (
    <CartContext.Provider value={{ items, AddItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
