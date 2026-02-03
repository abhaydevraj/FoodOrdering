import products from "@/assets/data/products";
import Button from "@/src/components/Button";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const sizes = ["S", "M", "L", "XL"];

const addToCart = () => {
  alert("Added to cart");
};

const productDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: product.name }} />

      <Image source={{ uri: product.image }} style={styles.image} />
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
