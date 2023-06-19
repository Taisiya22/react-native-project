// import React from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen";
import { useFonts } from "expo-font";
import { LoginScreen } from "./Screens/auth/LoginScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;

  const AuthStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <AuthStack.Screen
          name="registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen name="login" component={LoginScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>

    //   <RegistrationScreen/>
    //   {/* <LoginScreen/> */}

    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
