import Order from "../../models/Order";
import { ADD_ORDER } from "../actions/order";

const initialState = {
  orders: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ORDER:
      const newOrder = new Order(
        payload.id,
        payload.items,
        payload.amount,
        payload.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      }
    default:
      return state;
  }
};
