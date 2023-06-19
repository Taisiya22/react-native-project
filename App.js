// import React from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { useFonts } from "expo-font";
import { LoginScreen } from "./Screens/auth/LoginScreen";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { PostsScreen } from "./Screens/main/PostsScreen";
import { CreatePostsScreen } from "./Screens/main/CreatePostsScreen";
import { ProfileScreen } from "./Screens/main/ProfileScreen";

const Stack = createNativeStackNavigator();


const App = () => {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;

  const AuthStack = createNativeStackNavigator();
  const MainTab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <MainTab.Navigator>
        <MainTab.Screen name="posts" component={PostsScreen} options={{headerShown: false}}/>
        <MainTab.Screen name="create" component={CreatePostsScreen} options={{headerShown: false}}/>
        <MainTab.Screen name="profile" component={ProfileScreen} options={{headerShown: false}}/>
        </MainTab.Navigator>
    </NavigationContainer>
  );
};

// authNav
{/* <Stack.Navigator>
        <AuthStack.Screen
          name="registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
      </Stack.Navigator> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
