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
  KeyboardAvoidingView
} from "react-native";
// import background from "../assets/images/photo-bg.png"

export const RegistrationScreen = () => {
    const[isShowKeyboard,setIsShowKeyboard]=useState(false)
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex:1}}>
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
        <TextInput style={styles.input} />
        <TextInput style={styles.input} />
        <TextInput style={styles.input} secureTextEntry={true} />
       
        <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
          <Text style={styles.btnTitle}>Registration</Text>
        </TouchableOpacity>
          </View>
          
        </View>
       </KeyboardAvoidingView>

  
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
  // circle: {
  //     display: "flex",
  //     borderWidth: 1,
  //     borderRadius: 50,
  //     width: 25,
  //     height: 25,
  //     justifyContent: "center",
  //     alignItems: 'center',
  //      borderColor: "#FF6C00",
  // },

  // plus: {
  //     fontSize: 25,
  //     color: "#FF6C00",
  //     top:-5

  // },
  form: {
    flex: 1,

    backgroundColor: "#FFFFFF",
    // height: 549,
    marginTop: 263,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  input: {
    width: 343,
    height: 50,
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: 500,
  },
  inputWrap: {
    marginHorizontal: 30,
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
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 400,
  },
});
