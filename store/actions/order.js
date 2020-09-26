export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => async (dispatch) => {
  const date = new Date()

  const res = await fetch(
    `https://rn-shop-e80c6.firebaseio.com/orders/u1.json`,
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

  const resData = await res.json()

  dispatch({
    type: ADD_ORDER,
    payload: {
      id: resData.name,
      items: cartItems,
      amount: totalAmount,
      date
    },
  });
};
