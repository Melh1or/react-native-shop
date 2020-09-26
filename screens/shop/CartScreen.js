import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/UI/Card";
import CartItem from "../../components/shop/CartItem";
import colors from "../../constants/colors";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Button
            title="Order Now"
            onPress={sendOrderHandler}
            color={colors.accent}
            disabled={cartItems.length === 0}
          />
        )}
      </Card>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            deletable
            onRemove={() => dispatch(removeFromCart(item.productId))}
          />
        )}
        keyExtractor={(item) => item.productId}
      />
    </View>
  );
};

CartScreen.navigationOptions = {
  title: "Your Cart",
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});

export default CartScreen;
