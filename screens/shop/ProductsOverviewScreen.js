import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

const ProductsOverviewScreen = () => {
  const products = useSelector((state) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <Text>{item.item.title}</Text>}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All products"
}

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
