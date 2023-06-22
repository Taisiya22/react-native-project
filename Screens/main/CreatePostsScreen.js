import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { IconButton } from "@react-native-material/core";
import { MaterialIcons } from '@expo/vector-icons';

export const
    CreatePostsScreen = () => { 
        return (<View style={styles.container}>
            <Camera style={styles.camera}>
  <IconButton style={styles.iconBorder}
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
        height: 240,
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
       

    }
})