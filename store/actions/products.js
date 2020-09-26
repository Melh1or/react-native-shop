import Product from "../../models/Product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://rn-shop-e80c6.firebaseio.com/products.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const responseData = await response.json(response);
    const loadedProducts = [];

    for (const key in responseData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          responseData[key].title,
          responseData[key].imageUrl,
          responseData[key].description,
          responseData[key].price
        )
      );
    }

    dispatch({ type: SET_PRODUCTS, payload: loadedProducts });
  } catch (e) {
    throw err;
  }
};

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

export const updateProduct = (id, title, description, imageUrl) => async (
  dispatch
) => {
  try {
    await fetch(`https://rn-shop-e80c6.firebaseio.com/products/${id}.json`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, imageUrl }),
    });

    dispatch({
      type: UPDATE_PRODUCT,
      payload: { id, title, description, imageUrl },
    });
  } catch (e) {
    console.log(e);
  }
};
