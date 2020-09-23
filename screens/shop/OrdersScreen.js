import React from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <FlatList
      data={orders}
      key={(item) => item.id}
      renderItem={({ item }) => <Text>{item.totalAmount}</Text>}
    />
  );
};

OrdersScreen.navigationOptions = ({ navigation }) => ({
  title: "Your orders",
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

const styles = StyleSheet.create({});

export default OrdersScreen;
