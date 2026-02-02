import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const productDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen options={{ headerTitle: "Product Details : " + id }} />
      <Text>productDetailsScreen for id: {id}</Text>
    </View>
  );
};

export default productDetailsScreen;
