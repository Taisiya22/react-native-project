import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraType } from "expo-camera";
import { IconButton } from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";

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
      <TouchableOpacity style={{ marginTop: 20 }} onPress={send}>
        <Text
          style={{
            borderWidth: 1,
            borderColor: "black",
            marginHorizontal: 16,
            textAlign: "center",
            padding: 15,
          }}
        >
          Public
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
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
});
