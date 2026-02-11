import { useProduct } from "@/src/api/products";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { useCart } from "@/src/providers/CartProvider";
import { PizzaSize } from "@/src/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const productDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: product, error, isLoading } = useProduct(id);
  const { AddItem } = useCart();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) return;
    AddItem(product, selectedSize);
    router.push("/cart");
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    throw new Error(error.message);
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: product.name }} />

      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text>Select size</Text>

      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSizeButton,
            ]}
          >
            <Text
              style={
                selectedSize === size
                  ? styles.selectedSizeText
                  : styles.sizeText
              }
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
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
  sizeButton: {
    backgroundColor: "white",
    width: 50,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderRadius: 25,
    padding: 8,
  },
  sizeText: {
    color: "grey",
  },
  selectedSizeText: {
    color: "black",
    fontWeight: "bold",
  },
  selectedSizeButton: {
    backgroundColor: "gainsboro",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: "auto",
  },
});

export default productDetailsScreen;
