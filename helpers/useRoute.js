import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { PostsScreen } from "../Screens/main/PostsScreen";
import { CreatePostsScreen } from "../Screens/main/CreatePostsScreen";
import { ProfileScreen } from "../Screens/main/ProfileScreen";

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
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="posts"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="create"
        component={CreatePostsScreen}
        options={{ headerShown: false }}
      />
      <MainTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </MainTab.Navigator>
  );
};
