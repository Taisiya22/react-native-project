import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraType } from "expo-camera";
import { IconButton } from "@react-native-material/core";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { useHeaderHeight } from "@react-navigation/elements";
import { db, storage } from "../../firebase/config";

export const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoLocation, setPhotoLocation] = useState("");
  

  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  const { userId, nickName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageImage = await ref(storage, `postImage/${uniquePostId}`);
    await uploadBytes(storageImage, file);
    const addedPhoto = await getDownloadURL(storageImage);
    // console.log(addedPhoto)
    return addedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = {
      photo,
      photoTitle,
      photoLocation,
      location,
      userId,
      nickName,
    };
    uploadPostToDatabase(createPost);
    navigation.navigate("posts", {
      photo,
      photoTitle,
      photoLocation,
      location,
    });
    resetForm();
  };

  const uploadPostToDatabase = async (post) => {
    //  await addDoc(collection(db, "post"), post);
    const docRef = await addDoc(collection(db, "post"), post);
  };

  const resetForm = () => {
    setPhoto(null);
    setPhotoLocation("");
    setPhotoTitle("");
  };

  const takePhoto = async () => {
    // console.log(photoTitle);

    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    await MediaLibrary.createAssetAsync(photo.uri);
  };

  const send = async () => {
    // uploadPhotoToServer();
    uploadPostToServer();
    navigation.navigate("DefaultScreen");
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);

    // console.log(photo);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {photo === null ? (
            <Camera style={styles.camera} type={type} ref={setCamera}>
              {photo && (
                <View style={styles.photoContainer}>
                  <Image source={{ uri: photo }} style={{ flex: 1 }} />
                </View>
              )}
              <IconButton
                style={{ ...styles.iconBorder, backgroundColor: "#FFF" }}
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
                <Text style={{ fontSize: 18, marginTop: 10, color: "#BDBDBD" }}>
                  {" "}
                  Flip{" "}
                </Text>
              </TouchableOpacity>
            </Camera>
          ) : (
            <View style={{ ...styles.camera }}>
              <Image
                source={{ uri: photo }}
                style={{
                  ...styles.camera,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
              />
              <IconButton
                style={{
                  ...styles.iconBorder,
                  backgroundColor: "#rgba(255, 255, 255, 0.30)",
                }}
                onPress={() => setPhoto(null)}
                icon={(props) => (
                  <MaterialIcons
                    name="camera-alt"
                    {...props}
                    color="#BDBDBD"
                    size={24}
                  />
                )}
              />
            </View>
          )}

          <TouchableOpacity onPress={pickImage}>
            <Text
              style={{
                marginLeft: 16,
                marginTop: 8,
                color: "#BDBDBD",
                fontFamily: "roboto",
                fontSize: 16,
              }}
            >
              {photo === null ? "Завантажте фото" : "Редагувати фото"}
            </Text>
          </TouchableOpacity>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Назва..."
              style={styles.input}
              onChangeText={setPhotoTitle}
            />

            <View>
              <TextInput
                placeholder=" Місцевість..."
                style={{ ...styles.input, paddingLeft: 28 }}
                onChangeText={setPhotoLocation}
              />
              <EvilIcons
                name="location"
                size={24}
                color="#BDBDBD"
                style={styles.iconLocation}
                />
            </View>
          </View>

          <TouchableOpacity style={{ marginTop: 20 }} onPress={send}>
            <Text style={styles.btnSend}>Опублікувати</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 32,
  },
  photoContainer: {
    height: 240,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  iconBorder: {
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  inputWrapper: {
    gap: 20,
  },
  input: {
    marginHorizontal: 16,
    height: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  iconLocation: {
    position: "absolute",
    top: 13,
    zIndex: 1,
    width: 24,
    height: 24,
    marginLeft: 16,
  },
  btnSend: {
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
    textAlign: "center",
    padding: 15,
    color: "#BDBDBD",
  },
});
