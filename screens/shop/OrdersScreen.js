import React from "react";
import { StyleSheet, Text, View, FlatList, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.order.orders);

  return (
    <FlatList
      data={orders}
      key={(item) => item.id}
      renderItem={({ item }) => (
        <OrderItem
          date={item.readableDate}
          amount={item.totalAmount}
          items={item.items}
        />
      )}
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
