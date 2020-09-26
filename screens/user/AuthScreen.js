import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import colors from "../../constants/colors";

const AuthScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email address."
              onInputChange={() => {}}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              minLength={5}
              required
              autoCapitalize="none"
              errorMessage="Please enter a valid password address."
              onInputChange={() => {}}
              initialValue=""
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button 
              title="Login" 
              color={colors.primary} 
              onPress={() => {}} 
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Switch to Sing Up"
              color={colors.accent}
              onPress={() => {}}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  title: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
