import { Text, View } from "@/src/components/Themed";
import { Product } from "@/src/types";
import { Image, StyleSheet } from "react-native";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};
const ProductListItem = ({ product }: ProductListItemProps) => {
  //console.log(product);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
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
    flex: 1,
    margin: 10,
    borderRadius: 20,
    maxWidth: "50%",
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
    resizeMode: "contain",
  },
});
