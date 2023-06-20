import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import { RegistrationScreen } from "../Screens/auth/RegistrationScreen";
import { LoginScreen } from "../Screens/auth/LoginScreen";
import { PostsScreen } from "../Screens/main/PostsScreen";
import { CreatePostsScreen } from "../Screens/main/CreatePostsScreen";
import { ProfileScreen } from "../Screens/main/ProfileScreen";
import { View, StyleSheet } from "react-native";

 


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
        options={{
          title: "Публікації",
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.408
          },
          headerRight: () => {
              
           }
           ,
           tabBarShowLabel: false,
           tabBarIcon: ({ focused, color, size }) => {
           return  <Feather name="grid" size={24} color="#212121CC" />
            }

       }}
      />
      <MainTab.Screen
        name="create"
        component={CreatePostsScreen}
       options={{
        title:"Створити публікацію",
         tabBarShowLabel: false,
         tabBarIcon: ({ focused, color, size }) => {
           return  <Feather name="plus" size={24} color="black" />
            }
       }}
      />
      <MainTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
           tabBarIcon: ({ focused, color, size }) => {
             return  <Feather name="user" size={24} color="#212121CC" />
            }
       }}
      />
    </MainTab.Navigator>
  );
};


const styles = StyleSheet.create({
  iconWrapper: {
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor:"#FF6C00"
  }
})