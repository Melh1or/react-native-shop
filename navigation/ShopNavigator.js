import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import colors from "../constants/colors";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primary : "white",
      },
      headerTitleStyle: {
        fontFamily: "bold",
      },
      headerTintColor: Platform.OS === "ios" ? colors.primary : "white",
      headerBackTitleStyle: {
        fontFamily: "regular",
      },
    },
  }
);

export default createAppContainer(ProductsNavigator);
