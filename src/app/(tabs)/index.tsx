import { Text, View } from "@/src/components/Themed";
import { Image, StyleSheet } from "react-native";
import products from "../../../assets/data/products";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: products[1].image }} style={styles.image} />
      <Text style={styles.title}>{products[1].name}</Text>
      <Text style={styles.price}>${products[1].price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    borderRadius: 20,
  },

  price: {
    fontSize: 16,
    color: "gray",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    marginBottom: 20,
  },
});
