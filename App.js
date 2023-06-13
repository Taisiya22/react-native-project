// import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Dimensions} from 'react-native';
import { RegistrationScreen } from './Screens/RegistrationScreen';


const App = () => (
  <View style={styles.container}>
    <ImageBackground source={require('./assets/images/photo-bg.jpg')} style={styles.image}>
      <RegistrationScreen/>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    position: 'absolute',
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1
   
  }
});

export default App;