import { Text, View } from "@/src/components/Themed";
import { Image, StyleSheet } from "react-native";

const ProductListItem = ({ product }: { product: any }) => {
  console.log(product);
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;

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
