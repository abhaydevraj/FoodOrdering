import {
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";
import Button from "@/src/components/Button";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { router, Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const { id } = useLocalSearchParams();
  console.log("Received id from params:", id);
  const isUpdating = !!id;

  async function pickImage() {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required.",
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const validateInput = () => {
    setError("");
    if (!name.trim()) {
      setError("Please enter a product name.");
      return false;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Price is not a number.");
      return false;
    }
    return true;
  };

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useProduct(Number(id));

  console.log("Updating product:", updatingProduct?.name);
  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const resetFields = () => {
    setName("");
    setPrice("");
    // setImage(null);
    // setError("");
  };

  const onSubmit = () => {
    if (isUpdating) {
      onUpdateCreate();
    } else {
      onCreate();
    }
  };
  const onUpdateCreate = async () => {
    if (!validateInput()) {
      return;
    }

    // save in database update logic here
    updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess() {
          resetFields();
          router.back();
        },
      },
    );
  };
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }

    // save in database create logic here
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      },
    );
  };
  const onDelete = () => {
    console.warn("Deleting product...");
    // delete from database logic here
  };
  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: isUpdating ? "Update Product" : "Create Product",
        }}
      />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.textButton} onPress={pickImage}>
        {" "}
        Select Image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        placeholder="Name"
        style={styles.input}
        placeholderTextColor="grey"
        onChangeText={setName}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        value={price}
        placeholder="9.99"
        style={styles.input}
        placeholderTextColor="grey"
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button
        text={isUpdating ? "Update Product" : "Create Product"}
        onPress={onSubmit}
      />
      {isUpdating && (
        <Text
          style={styles.textButton}
          onPress={() => {
            confirmDelete();
          }}
        >
          Delete Product
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
  },

  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    borderColor: "#ccc",
  },
  label: {
    color: "grey",
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
});

export default CreateProductScreen;
