import ProductListItem from "@/src/components/ProductListItem";
import { View } from "@/src/components/Themed";
import products from "../../../assets/data/products";

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[0]} />
      <ProductListItem product={products[1]} />
    </View>
  );
}
