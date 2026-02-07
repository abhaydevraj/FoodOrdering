import products from "@/assets/data/products";
import Colors from "@/src/constants/Colors";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const productDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { AddItem } = useCart();
  const router = useRouter();

  const product = products.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) return;
    AddItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: "Menu",
          headerRight: () => (
            <Link href="/(admin)/menu/create?id=${id}" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      <Stack.Screen options={{ headerTitle: product.name }} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.price}>${product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  sizesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
  },

  price: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default productDetailsScreen;
