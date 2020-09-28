import React, { useState } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import thunk from "redux-thunk";

import ShopNavigator from "./navigation/ShopNavigator";

import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Font.loadAsync({
    regular: require("./assets/fonts/OpenSans-Regular.ttf"),
    bold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.error}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
