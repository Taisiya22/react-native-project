// import React from 'react';
import { StyleSheet, View, Dimensions} from 'react-native';
import { RegistrationScreen }  from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';
import { LoginScreen } from './Screens/LoginScreen';



const App = () => {
  const [fontsLoaded] = useFonts({
    'roboto':require('./assets/fonts/Roboto/Roboto-Medium.ttf')
    });
  if (!fontsLoaded) return null;
  return( <View style={styles.container}>
   
      <RegistrationScreen/>
      {/* <LoginScreen/> */}
  
  </View>)
 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center",
  }
  
});
export default App;