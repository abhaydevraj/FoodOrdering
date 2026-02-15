import RemoteImage from "@/src/components/RemoteImage";
import { Text } from "@/src/components/Themed";
import { Tables } from "@/src/types";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<"products">;
};
const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments();
  const validSegment = segments[0] === "(admin)" ? "(admin)" : "(user)";
  return (
    <Link
      href={{
        pathname: `/${validSegment}/menu/[id]`,
        params: { id: product.id },
      }}
      asChild
    >
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
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
