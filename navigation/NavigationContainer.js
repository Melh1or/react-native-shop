import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { NavigationActions } from "react-navigation";

import ShopNavigator from "./ShopNavigator";

const NavigationContainer = () => {
  const nawRef = useRef();
  const isAuth = useSelector((state) => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      nawRef.current.dispatch(NavigationActions.navigate({ routeName: "Auth" }));
    }
  }, [isAuth]);

  return <ShopNavigator ref={nawRef} />;
};

export default NavigationContainer;
