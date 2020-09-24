import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../../constants/colors";

import CartItem from "./CartItem";

const OrderItem = (props) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={colors.primary}
        title="Show the details"
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "regular",
    fontSize: 16,
    color: "#888",
  },
});

export default OrderItem;
