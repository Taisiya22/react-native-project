import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from '@expo/vector-icons';
import { IconButton } from "@react-native-material/core";
import { MaterialIcons } from '@expo/vector-icons';

import { PostsScreen } from "../Screens/main/PostsScreen";
import { CreatePostsScreen } from "../Screens/main/CreatePostsScreen";
import { ProfileScreen } from "../Screens/main/ProfileScreen";
// import { useNavigation } from '@react-navigation/native';
import { Image} from 'react-native'

const MainTab = createBottomTabNavigator();
export const Home = ({ navigation}) => {
    // const navigation = useNavigation();
    return (
        <MainTab.Navigator>
      <MainTab.Screen
        name="posts"
        component={PostsScreen}
        options={{
            title: "Публікації",
             headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.408
          },
            headerRight: () => (
                <IconButton style={{ paddingRight: 16 }} icon={props => <MaterialIcons name="logout"{...props} color='black' size={24 } />} />
              
            ),
        
           tabBarShowLabel: false,
           tabBarIcon: ({ focused, color, size }) => {
               return <Feather name="grid" size={24} color="#212121CC" />
            }

       }}
      />
      <MainTab.Screen
        name="create"
        component={CreatePostsScreen}
       options={{
           title: "Створити публікацію",
           headerTintColor: "#212121",
           headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.408
           },
          headerLeft: () => (
                <IconButton style={{ paddingRight: 40 }}  icon={props => <MaterialIcons name="logout"{...props} color="black" size={24 } />} />
              
            ),
         tabBarShowLabel: false,
         tabBarIcon: ({ focused, color, size }) => {
             return   <Feather name="plus" size={24} color="#212121CC" />
            }
       }}
      />
      <MainTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
           tabBarIcon: ({ focused, color, size }) => {
             return  <Feather name="user" size={24} color="#212121CC" />
            }
       }}
      />
    </MainTab.Navigator>
   
    )
 }


// import React from "react";
// import { View, Text, StyleSheet } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";

// function Settings() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

// const Tabs = createBottomTabNavigator();

// export const Home = () => {
//   return (
//     <Tabs.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === "Profile") {
//             iconName = focused
//               ? "ios-information-circle"
//               : "ios-information-circle-outline";
//           } else if (route.name === "Settings") {
//             iconName = focused ? "list-circle" : "ios-list";
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//       tabBarOptions={{
//         activeTintColor: "tomato",
//         inactiveTintColor: "gray",
//       }}
//     >
//       <Tabs.Screen name="Settings" component={Settings} />
//       <Tabs.Screen name="Profile" component={Profile} />
//     </Tabs.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });