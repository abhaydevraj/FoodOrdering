import { CartItem, Tables } from "@/src/types";
import { randomUUID } from "expo-crypto";
import { useRouter } from "expo-router";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { useInsertOrderItems } from "../api/order-items";
import { useInsertOrder } from "../api/orders";

// type CartItem = number ; // Replace with your actual item type if needed

interface CartType {
  items: CartItem[];
  AddItem: (Product: Tables<"products">, size: CartItem["size"]) => void;
  updateQuantity?: (itemId: string, amount: -1 | 1) => void; // Optional for now
  total: number;
  checkout?: () => void; // Optional for now
}

const CartContext = createContext<CartType>({
  items: [],
  AddItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const { mutate: insertOrder } = useInsertOrder();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const router = useRouter();
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const AddItem = (product: Tables<"products">, size: CartItem["size"]) => {
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
    // console.log("Adding item to cart:", items, newCartItem.id);
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
  const clearCart = () => {
    setItems([]);
  };
  const checkout = () => {
    // Implement checkout logic here, e.g., create an order in the database
    console.log("Checking out with items:", items);
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems,
      },
    );
  };

  const saveOrderItems = (order: Tables<"orders">) => {
    const orderItems = items.map((cartItem) => ({
      order_id: order.id,
      product_id: cartItem.product_id,
      quantity: cartItem.quantity,
      size: cartItem.size,
    }));
    insertOrderItems(orderItems, {
      onSuccess() {
        clearCart();
        router.push(`/(user)/orders/${order.id}`);
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ items, AddItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
