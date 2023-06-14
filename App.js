// import React from 'react';
import {ImageBackground, StyleSheet, View, Dimensions} from 'react-native';
import { RegistrationScreen }  from './Screens/RegistrationScreen';
import { useFonts } from 'expo-font';



const App = () => {
  const [fontsLoaded] = useFonts({
    'roboto':require('./assets/fonts/Roboto/Roboto-Medium.ttf')
    });
  if (!fontsLoaded) return null;
  return( <View style={styles.container}>
    <ImageBackground source={require('./assets/images/photo-bg.jpg')} style={styles.image}>
      <RegistrationScreen/>
    </ImageBackground>
  </View>)
 
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
    // resizeMode: 'cover',
    // position: 'absolute',
    // flex: 1,
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // zIndex: -1,
//     // justifyContent:'flex-end'
   
//   }
// });
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    flex: 1,
      justifyContent: 'center',
      resizeMode: 'cover',
      justifyContent:'flex-end',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
   
  },
});
export default App;