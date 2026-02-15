import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrderSubscription } from "@/src/api/orders/subscriptions";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function OrderDetailScreen() {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  useUpdateOrderSubscription(id);
  const { data: order, error, isLoading } = useOrderDetails(id);
  // const order = orders.find((order) => order.id === Number(id));
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

  if (!order) {
    return <Text>Order not found</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 10, gap: 20 }}>
      <Stack.Screen options={{ title: `Order #${id}` }} />
      <OrderListItem order={order} />
      <FlatList
        data={order.order_items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
}
