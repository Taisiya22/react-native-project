import React from 'react';
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import {useRoute} from "./helpers/useRoute.js"


const App = () => {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;
const routing = useRoute(true)
 
  return (
    <NavigationContainer>
      {routing}
    </NavigationContainer>
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
