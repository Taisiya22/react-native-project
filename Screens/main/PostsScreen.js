import React from "react";
import { IconButton } from "@react-native-material/core";
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
export const
    PostsScreen = () => {

        return (
            // <View >
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text> PostsScreen</Text>
    </View>
            /* <View style={styles.header}><Text style={styles.headerTitle}>Публікації</Text>
                <View style={styles.WrapLogoutBtn}>
                    <IconButton icon={props => <MaterialIcons name="logout"{...props} style={styles.logoutIcon} />} />
                    </View>
            </View>
            <View style={styles.container}><Text>PostsScreen</Text></View> */
        // </View>
            )
    }

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },

    header: {
        backgroundColor:
            '#FF6C00',
        //  position: 'relative',
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        height:88
        
       
      
    },
    headerTitle: {
        fontFamily: 'roboto',
        fontWeight: 500,
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center',
        color: "#212121",
        marginTop: 'auto',
        padding:11
      
        
    },
    logoutIcon: {
     
        color: "#BDBDBD",

        width: 24,
        height: 24,
      
    },
    WrapLogoutBtn: {
         position: 'absolute',
        top: 0,
        left: '85%',
        width: 24,
        height: 24,
    }
})

