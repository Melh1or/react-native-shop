import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/Product";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (item) => item.id !== payload.productId
        ),
        userProducts: state.userProducts.filter(
          (item) => item.id !== payload.productId
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        payload.id,
        "u1",
        payload.title,
        payload.imageUrl,
        payload.description,
        payload.price
      );

      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === payload.id
      );

      const updateProduct = new Product(
        payload.id,
        state.userProducts[productIndex].ownerId,
        payload.title,
        payload.imageUrl,
        payload.description,
        state.userProducts[productIndex].price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updateProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === payload.id
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updateProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    default:
      return state;
  }
};
