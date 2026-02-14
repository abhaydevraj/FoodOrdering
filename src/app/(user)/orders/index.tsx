import { useMyOrdersList } from "@/src/api/orders";
import OrderListItem from "@/src/components/OrderListItem";
import React from "react";
import { FlatList, Text } from "react-native";

export default function OrderScreen() {
  const { data: orders, error, isLoading } = useMyOrdersList();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return (
      <Text>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </Text>
    );
  }
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ padding: 10, gap: 10 }}
    />
  );
}
