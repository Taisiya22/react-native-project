import React from "react";
import { View, Text } from "react-native";

export const PostsScreen = ({ route }) => {
  console.log(route.params)
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text> PostsScreen</Text>
    </View>
  );
};
