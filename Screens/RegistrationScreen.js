import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";


const intialRegistration = {
  login: "",
  email: "",
  password: "",
};

const width = Dimensions.get("window").width;
export const RegistrationScreen = () => {
  const [image, setImage] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [registration, setRegistration] = useState(intialRegistration);
  const [activeInput, setActiveInput] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    setIsShowKeyboard(false);
  }, [handleSubmit]);

  const handleSubmit = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    setRegistration(intialRegistration);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
      }}
    >
      <View style={{ ...styles.wrapper, flex: isShowKeyboard ? 0.8 : 0.7 }}>
        <View style={{ ...styles.imageWrapper, left: (width - 120) / 2 }}>
          <TouchableOpacity onPress={pickImage}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 120, height: 120, borderRadius: 16 }}
              />
            )}
            {!image && (
              <Image
                fadeDuration={0}
                style={styles.add}
                source={require("../assets/images/add.png")}
              />
            )}
            {image && (
              <Image
                fadeDuration={0}
                style={styles.remove}
                source={require("../assets/images/remove.png")}
              />
            )}
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Реєстрація</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={{ ...styles.inputWrapper }}>
            <View>
              <TextInput
                style={{
                  ...styles.input,
                  borderColor: activeInput === "login" ? "#FF6C00" : "#f6f6f6",
                }}
                value={registration.login}
                placeholder="Логін"
                onChangeText={(value) =>
                  setRegistration((prevState) => ({
                    ...prevState,
                    login: value,
                  }))
                }
                onFocus={() => setActiveInput("login")}
                placeholderTextColor="#BDBDBD"
              />
            </View>
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
          <Text style={styles.submitTitle}>Зареєструватися</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>Вже є акаунт? Увійти</Text>
      </View>
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
    paddingTop: 92,
    fontSize: 30,
  },
  imageWrapper: {
    position: "absolute",
    top: -60,
    borderRadius: 16,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    // zIndex:1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  inputWrapper: {
    paddingRight: 16,
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 43,
    gap: 16,
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
    paddingTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },

  iconContainer: {
    zIndex: 999,
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
});
