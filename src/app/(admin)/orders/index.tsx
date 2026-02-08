import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";
import React from "react";
import { FlatList } from "react-native";

export default function OrderScreen() {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
}
