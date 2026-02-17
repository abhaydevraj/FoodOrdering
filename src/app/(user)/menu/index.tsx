import { useProductList } from "@/src/api/products";
import ProductListItem from "@/src/components/ProductListItem";
import { FlatList, Text } from "react-native";

export default function MenuScreen() {
  const { data: products, isLoading, error } = useProductList();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    throw new Error(error.message);
  }
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
    />
  );
}
