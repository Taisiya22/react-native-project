import { useState } from "react";
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
const ColorBorders = {
  name: "#E8E8E8",
  email: "#E8E8E8",
  password: "#E8E8E8",
  
};
export const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [borderColor, setBorderColor] = useState(ColorBorders);
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
            <Image style={styles.avatar} />
            <Image
              style={styles.add}
              source={require("../assets/images/add.png")}
            />
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.title}>Registration</Text>
            <TextInput
              style={[styles.input, { borderColor: borderColor.name }]}
              onFocus={() => {
                setIsShowKeyboard(true);
                setBorderColor((prev) => ({ ...prev, name: "#FF6C00" }));
              }}
              onBlur={() => {
                setBorderColor((prev) => ({ ...prev, name: "#E8E8E8" }));
              }}
            />
            <TextInput
              style={[styles.input, { borderColor: borderColor.email }]}
              onFocus={() => {
                setIsShowKeyboard(true);
                setBorderColor((prev) => ({ ...prev, email: "#FF6C00" }));
              }}
              onBlur={() => {
                setBorderColor((prev) => ({ ...prev, email: "#E8E8E8" }));
              }}
            />
            <TextInput
               style={[styles.input, { borderColor: borderColor.password }]}
              onFocus={() => {
                setIsShowKeyboard(true);
                setBorderColor((prev) => ({ ...prev,  password: "#FF6C00" }));
              }}
              onBlur={() => {
                setBorderColor((prev) => ({ ...prev,  password: "#E8E8E8" }));
              }}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={styles.btnTitle}>Registration</Text>
            </TouchableOpacity>
            <Text style={styles.text}>
              Do you have already account? Log in.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarWrapper: {
    top: -60,
    position: "absolute",
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
});
