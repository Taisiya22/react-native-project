import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import { Camera, CameraType } from "expo-camera";
import { IconButton} from "@react-native-material/core";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Location from "expo-location";

import { useHeaderHeight } from '@react-navigation/elements';


export const CreatePostsScreen = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);

  const height = useHeaderHeight();
  

useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg ('Permission to access location was denied');
                return;
            }
        })();
    }, []);

  
  
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
   let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setLocation(coords);
    setPhoto(photo.uri);
    await MediaLibrary.createAssetAsync(photo.uri);


    // console.log(photo);
    // console.log(coords)
  };

  const send = () => {
    navigation.navigate("posts", { photo });
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
        };
  };
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}
>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}> 
          {photo === null ? <Camera style={styles.camera} type={type} ref={setCamera}>
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
          <Text style={{ fontSize: 18, marginTop: 10, color: "#BDBDBD" }}>
            {" "}
            Flip{" "}
          </Text>
        </TouchableOpacity>
          </Camera> :
            <View style={{...styles.camera } }>
              <Image source={{ uri: photo }} 
                style={{ ...styles.camera, position: "absolute", width: "100%", height: "100%" }}
              />
              <IconButton
          style={styles.iconBorder}
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
            
       }
     
    <TouchableOpacity onPress={pickImage}>
            <Text style={{ marginLeft: 16, marginTop: 8, color: "#BDBDBD", fontFamily: "roboto", fontSize: 16 }}>
              {photo === null? "Завантажте фото" : "Редагувати фото"} 
            </Text>
        </TouchableOpacity>
 
        <View style={styles.inputWrapper}>
          
            <TextInput placeholder="Назва..." style={styles.input} />
        
          <View>
           
            <TextInput placeholder=" Місцевість..." style={{...styles.input, paddingLeft: 28} } />
          <EvilIcons name="location" size={24} color="#BDBDBD" style={styles.iconLocation} />
       
            </View>
        </View>
        
          <TouchableOpacity style={{ marginTop: 20 }} onPress={send}>
            
            <Text
              style={
            styles.btnSend
          }
        >
          Опублікувати
        </Text>
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
    // position: "absolute",
    // backgroundColor: "#F6F6F6",
    height: 240,
    // width: "100%",
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
