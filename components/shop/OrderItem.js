import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../../constants/colors";

import CartItem from "./CartItem";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={colors.primary}
        title={showDetails ? "Hide details" : "Show details"}
        onPress={() => setShowDetails((state) => !state)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {props.items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.sum}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
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
  detailItems: {
    width: "100%",
  },
});

export default OrderItem;
