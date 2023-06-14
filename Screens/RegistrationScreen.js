import { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
const removeAvatar = null;
const intialRegistration = {
  name: "",
  email: "",
  password: "",
};
export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [registration, setRegistration] = useState(intialRegistration);
  const [activeInput, setActiveInput] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [image, setImage] = useState(removeAvatar);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    else {
      setImage(removeAvatar)
     }
  };

  useEffect(() => {
    setIsShowKeyboard(false);
  }, [handleSubmit]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    // console.log(registration);
    setRegistration(intialRegistration);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.form}>
          <View style={styles.avatarWrapper}>
            {/* <Image style={styles.avatar} /> */}
            <TouchableOpacity onPress={pickImage}>
              {image && <Image source={{ uri: image }} style={{ width: 120, height: 120, borderRadius: 16 }} />}
              {!image && <Image
                fadeDuration={0}
              style={styles.add}
              source={require("../assets/images/add.png")}
              /> }
              { image && <Image
                            fadeDuration={0}
                            style={styles.add} source={require('../assets/images/remove.png')} />}
              </TouchableOpacity>
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.title}>Реєстрація</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: activeInput === "login" ? "#FF6C00" : "#f6f6f6",
              }}
              value={registration.login}
              placeholder="Логін"
              onChangeText={(value) =>
                setRegistration((prevState) => ({ ...prevState, login: value }))
              }
              onFocus={() => setActiveInput("login")}
              placeholderTextColor="#BDBDBD"
            />
            <TextInput
              style={{
                ...styles.input,
                borderColor: activeInput === "email" ? "#FF6C00" : "#f6f6f6",
              }}
              value={registration.email}
              placeholder="Адреса електронної пошти"
              onChangeText={(value) =>
                setRegistration((prevState) => ({ ...prevState, email: value }))
              }
              onFocus={() => setActiveInput("email")}
              placeholderTextColor="#BDBDBD"
            />
            <View>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor:
                    activeInput === "password" ? "#FF6C00" : "#f6f6f6",
                }}
                value={registration.pass}
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.btn}
              onPress={handleSubmit}
            >
              <Text style={styles.btnTitle}>Реєстрація</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Вже є акаунт? Увійти.</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // avatar: {
  //   width: 120,
  //   height: 120,
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  // },
  avatarWrapper: {
    top: -60,
    position: "absolute",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  add: {
    position: "absolute",
    top: 81,
    right: -10,
  },

  form: {
    flex: 1,
    position: "relative",
    backgroundColor: "#FFFFFF",
    marginTop: 263,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    // top:'35%',
    justifyContent: "center",
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    borderWidth: 1,
    // borderColor:"#E8E8E8",
    // marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },

  title: {
    fontFamily: "roboto",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 500,
  },
  inputWrap: {
    marginHorizontal: 30,
    gap: 16,
    position: "absolute",
    //   zIndex:777
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    color: "#FFFFFF",
    paddingTop: 16,
    paddingBottom: 16,
    paddingRight: 32,
    paddingLeft: 32,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 43,
  },
  btnTitle: {
    fontFamily: "roboto",
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 400,
  },
  text: {
    fontFamily: "roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
    marginTop: 16,
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
});
