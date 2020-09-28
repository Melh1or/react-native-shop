import Order from "../../models/Order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, totalAmount) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  const userId = getState().auth.userId;
  const date = new Date();

  const res = await fetch(
    `https://rn-shop-e80c6.firebaseio.com/orders/${userId}.json?auth=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: date.toISOString(),
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  const resData = await res.json();

  dispatch({
    type: ADD_ORDER,
    payload: {
      id: resData.name,
      items: cartItems,
      amount: totalAmount,
      date,
    },
  });
};

export const fetchOrders = () => async (dispatch, getState) => {
  const userId = getState().auth.userId;

  try {
    const response = await fetch(
      `https://rn-shop-e80c6.firebaseio.com/orders/${userId}.json`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const responseData = await response.json();
    const loadedOrders = [];

    for (const key in responseData) {
      loadedOrders.push(
        new Order(
          key,
          responseData[key].cartItems,
          responseData[key].totalAmount,
          new Date(responseData[key].date)
        )
      );
    }

    dispatch({
      type: SET_ORDERS,
      payload: loadedOrders,
    });
  } catch (err) {
    throw err;
  }
};
