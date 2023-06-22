import React, { useState} from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { Camera } from "expo-camera";
import { IconButton } from "@react-native-material/core";
import { MaterialIcons } from '@expo/vector-icons';



export const
    CreatePostsScreen = () => { 
        const [camera, setCamera] = useState(null);
        const [photo, setPhoto] = useState(null);

        const takePhoto = async () => { 
            const photo = await camera.takePictureAsync();
            setPhoto(photo.uri);
            console.log(photo);
        }

        return (<View style={styles.container}>
            <Camera style={styles.camera} ref={setCamera}> 
                {photo && <View style={styles.photoContainer}>
                    <Image source={{ uri: photo }} style={{width: 180, height:220} } />
                </View>}
                
                <IconButton style={styles.iconBorder} onPress={takePhoto}
              icon={(props) => (
                        <MaterialIcons          
                  name="camera-alt"
                  {...props}
                  color="#BDBDBD"
                  size={24}
                />
              )}
            />
                </Camera>
    </View>)
    }

styles = StyleSheet.create({
    container: {
        flex: 1,
      
    },
    camera: {
        // height: 600,
      
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 16,
        marginTop: 32,
      
    },
    iconBorder: {
        borderRadius: 50, 
        width: 60,
        height: 60,
        backgroundColor:"#FFF"
       
    },
    photoContainer: {
        position: "absolute",
        top: 30,
        left:30,
        borderWidth: 1,
        borderColor:"#FFF"
    }
})