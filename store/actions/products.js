export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({
    type: DELETE_PRODUCT,
    payload: {
      productId,
    },
  });
};

export const createProduct = (title, description, imageUrl, price) => async (
  dispatch
) => {
  const response = await fetch(
    "https://rn-shop-e80c6.firebaseio.com/products.json",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, imageUrl, price }),
    }
  );
  const responseData = await response.json(response);

  dispatch({
    type: CREATE_PRODUCT,
    payload: { id: responseData.name, title, description, imageUrl, price },
  });
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    payload: { id, title, description, imageUrl },
  };
};
