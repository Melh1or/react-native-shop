import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Platform } from "react-native";

import colors from "../constants/colors";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primary : "white",
      },
      headerTintColor: Platform.OS === "ios" ? colors.primary : "white",
    },
  }
);

export default createAppContainer(ProductsNavigator);
