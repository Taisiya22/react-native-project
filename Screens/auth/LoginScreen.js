
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ImageBackground
} from "react-native";

import { useDispatch } from "react-redux";
import { authSingInUser } from '../../redux/auth/authOperations';

const intialRegistration = {
  email: "",
  password: "",
};

const width = Dimensions.get("window").width;
export const LoginScreen = ({navigation}) => {
  
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [registration, setRegistration] = useState(intialRegistration);
  const [activeInput, setActiveInput] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();

 const closeKeyboard = () => {setIsShowKeyboard(false);
    Keyboard.dismiss();
  }
  
  useEffect(() => {
    setIsShowKeyboard(false);
  }, [handleSubmit]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    dispatch(authSingInUser(registration))
    // console.log(registration);
    setRegistration(intialRegistration);
    
  };

  return (
     <TouchableWithoutFeedback
      onPress={closeKeyboard}
    >
     <ImageBackground source={require('../../assets/images/photo-bg.jpg')} style={styles.image}>
    <TouchableWithoutFeedback
      onPress={closeKeyboard}
    >
      <View style={{ ...styles.wrapper, flex: isShowKeyboard ? 0.65 : 0.6 }}>
        
        <Text style={styles.text}>Увійти</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{ ...styles.inputWrapper }}>
            
            <View>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: activeInput === "email" ? "#FF6C00" : "#f6f6f6",
                }}
                value={registration.email}
                placeholder="Адреса електронної пошти"
                onChangeText={(value) =>
                  setRegistration((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
                onFocus={() => setActiveInput("email")}
                placeholderTextColor="#BDBDBD"
              />
            </View>
            <View>
             
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    activeInput === "password" ? "#FF6C00" : "#f6f6f6",
                }}
                value={registration.password}
                placeholder="Пароль"
                onChangeText={(value) =>
                  setRegistration((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
                onFocus={() => setActiveInput("password")}
                placeholderTextColor="#BDBDBD"
                secureTextEntry={showPassword}
              />
              <Text
                style={styles.showPassword}
                onPress={() => setShowPassword(false)}
              >
                Показати
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={{ ...styles.submitBtn, width: width - 32 }}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Text style={styles.submitTitle}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 16 }} onPress={() => { navigation.navigate('registration') }} activeOpacity={0.8}>
              <Text style={styles.logo}>Немає акаунту?
                <Text style={{ }}>Зареєструватися </Text>
              </Text>
            </TouchableOpacity> 
        
      </View>
      </TouchableWithoutFeedback>
      </ImageBackground>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FFFFFF",
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  text: {
    textAlign: "center",
    color: "#212121",
    paddingTop: 32,
    fontSize: 30,
  },
  
  inputWrapper: {
    // paddingRight: 16,
    // paddingLeft: 16,
    // paddingTop: 33,
    // paddingBottom: 43,
    // gap: 16,
    marginHorizontal: 30,
    gap: 16,
    paddingTop: 32,
    paddingBottom: 43,
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },

  submitBtn: {
    marginRight: 16,
    marginLeft: 16,
    height: 51,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  submitTitle: {
    color: "#FFFFFF",
    textAlign: "center",
  },
  logo: {
    textAlign: "center",
    color: "#1B4371",
  },

  add: {
    position: "absolute",
    top: 90,
    right: -10,
    width: 25,
    height: 25,
    resizeMode: "cover",
  },
  remove: {
    position: "absolute",
    top: 86,
    right: -17,
    width: 37,
    height: 37,
    resizeMode: "cover",
  },
  showPassword: {
    fontFamily: "roboto",
    position: "absolute",
    top: 16,
    right: 32,
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
  image: {
    flex: 1,
      justifyContent: 'center',
      resizeMode: 'cover',
    justifyContent: 'flex-end',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
   
  },
});
