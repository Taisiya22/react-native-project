import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import { store } from "./redux/store.js";
import { Main } from "./components/Main.js";
const App = () => {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;

  return (
    <Provider store={store}>
      <Main />
    </Provider>
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
