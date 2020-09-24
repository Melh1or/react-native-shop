import React from "react";
import { FlatList, Button, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";
import colors from "../../constants/colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = () => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {}}
        >
          <Button color={colors.primary} title="Edit" onPress={() => {}} />
          <Button
            color={colors.primary}
            title="Delete"
            onPress={() => dispatch(deleteProduct(item.id))}
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
});

export default UserProductsScreen;
