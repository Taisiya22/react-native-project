import React from "react";
// import { moduleName } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultScreen } from "../nestedScreen/DefaultScreen";
import { MapScreen } from "../nestedScreen/MapScreen";
import { CommentsScreen } from "../nestedScreen/CommentsScreen";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="Мапи" component={MapScreen} />
      <NestedScreen.Screen name="Коментарі" component={CommentsScreen} />
    </NestedScreen.Navigator>
  );
};
