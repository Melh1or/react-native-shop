import React from "react";
import { FlatList, Button, Platform, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import colors from "../../constants/colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (id) => {
    navigation.navigate("EditProduct", { productId: id });
  };

  const deleteHandler = (itemId) => {
    Alert.alert("Are u sure?", "Do u really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(itemId)),
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => editProductHandler(item.id)}
        >
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => editProductHandler(item.id)}
          />
          <Button
            color={colors.primary}
            title="Delete"
            onPress={() => deleteHandler(item.id)}
          />
        </ProductItem>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => ({
  title: "Your Products",
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Add"
        iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
        onPress={() => navigation.navigate("EditProduct")}
      />
    </HeaderButtons>
  ),
});

export default UserProductsScreen;
