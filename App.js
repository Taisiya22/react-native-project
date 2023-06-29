import React, { useState } from 'react';
import { StyleSheet} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";

import { useRoute } from "./helpers/useRoute.js";
import { store } from './redux/store.js';
// import { auth } from './firebase/config.js';
// import { onAuthStateChanged } from 'firebase/auth';

const App = () => {
  const [fontsLoaded] = useFonts({
    roboto: require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
  if (!fontsLoaded) return null;
//   const [user, setUser] = useState(null);
//  onAuthStateChanged(auth, user => setUser(user));

const routing = useRoute(false)
  
  return (
    <Provider store={store}>
    <NavigationContainer>
      {routing}
      </NavigationContainer>
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
