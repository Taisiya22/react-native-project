import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraType } from "expo-camera";
import { IconButton} from "@react-native-material/core";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";


export const CreatePostsScreen = ({ navigation }) => {
  // const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  // const [type, setType] = useState(CameraType.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    await MediaLibrary.createAssetAsync(photo.uri);
    // console.log(photo);
  };

  const send = () => {
    navigation.navigate("posts", { photo });
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={{ flex: 1 }} />
          </View>
        )}
        <IconButton
          style={styles.iconBorder}
          onPress={takePhoto}
          icon={(props) => (
            <MaterialIcons
              name="camera-alt"
              {...props}
              color="#BDBDBD"
              size={24}
            />
          )}
        />
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={{ fontSize: 18, marginTop: 10, color: "white" }}>
            {" "}
            Flip{" "}
          </Text>
        </TouchableOpacity>
      </Camera>
     
      <Text style={{marginLeft:16, marginTop:8, color:"#BDBDBD", fontFamily:"roboto", fontSize:16}}> Завантажте фото</Text>
      <TouchableOpacity style={{ marginTop: 20 }} onPress={send}>
        <View style={styles.inputWrapper }>
          <TextInput placeholder="Назва..." style={styles.input} />
          <View>
            <TextInput placeholder=" Місцевість..." style={{...styles.input, paddingLeft: 28} } />
            <EvilIcons name="location" size={24} color="#BDBDBD" style={styles.iconLocation } />
            </View>
          </View>
        <Text
          style={
            styles.btnSend
          }
        >
          Опублікувати
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  backgroundColor: "#FFF"},
  camera: {
    height: 240,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 32,
  },
  photoContainer: {
    position: "absolute",
    height: 240,
  },
  iconBorder: {
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
  },
  inputWrapper: {
gap: 20
  },
  input: {
    marginHorizontal: 16,
    height: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8"
  },
  iconLocation: { position: "absolute",
        top: 13,
        zIndex:1,
    width: 24,
    height: 24,
    marginLeft: 16
  },
  btnSend: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    textAlign: "center",
    padding: 15,
    color: "#BDBDBD"
  }
});
