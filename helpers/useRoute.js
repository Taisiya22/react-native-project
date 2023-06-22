import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { Home } from "../Screens/Home";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <Stack.Navigator>
        <AuthStack.Screen
          name="registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  return <Home />;
};
