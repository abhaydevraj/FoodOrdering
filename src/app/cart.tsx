import CartListItem from "@/src/components/CartListItem";
import { useCart } from "@/src/providers/CartProvider";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { FlatList, Platform, View } from "react-native";

const CartScreen = () => {
  const { items } = useCart();
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
