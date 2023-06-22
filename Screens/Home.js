import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { IconButton } from "@react-native-material/core";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { PostsScreen } from "../Screens/main/PostsScreen";
import { CreatePostsScreen } from "../Screens/main/CreatePostsScreen";
import { ProfileScreen } from "../Screens/main/ProfileScreen";

const MainTab = createBottomTabNavigator();
function create() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}
export const Home = () => {
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
            letterSpacing: -0.408,
          },
          headerRight: () => (
            <IconButton
              style={{ paddingRight: 16 }}
              icon={(props) => (
                <MaterialIcons
                  name="logout"
                  {...props}
                  color="#BDBDBD"
                  size={24}
                />
              )}
            />
          ),

          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "#FF6C00" : "transparent",
                  borderRadius: 20,
                  paddingLeft: 28,
                  paddingRight: 28,
                  paddingBottom: 13,
                  paddingTop: 13,
                }}
              >
                <Feather
                  name="grid"
                  size={24}
                  color={focused ? "#FFF" : "#212121CC"}
                />
              </View>
            );
          },
        }}
      />
      <MainTab.Screen
        name="create"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <IconButton
              style={{ paddingLeft: 16 }}
              onPress={() => {
                navigation.goBack();
              }}
              icon={(props) => (
                <Ionicons
                  name="arrow-back"
                  {...props}
                  color="#BDBDBD"
                  size={24}
                />
              )}
            />
          ),
          title: "Створити публікацію",
          headerTintColor: "#212121",
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            textAlign: "center",
            lineHeight: 22,
            letterSpacing: -0.408,
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "#FF6C00" : "transparent",
                  borderRadius: 20,
                  paddingLeft: 28,
                  paddingRight: 28,
                  paddingBottom: 13,
                  paddingTop: 13,
                }}
              >
                <Feather
                  name="plus"
                  size={24}
                  color={focused ? "#FFF" : "#212121CC"}
                />
              </View>
            );
          },
        })}
      />
      <MainTab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? "#FF6C00" : "transparent",
                  borderRadius: 20,
                  paddingLeft: 28,
                  paddingRight: 28,
                  paddingBottom: 13,
                  paddingTop: 13,
                }}
              >
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#FFF" : "#212121CC"}
                />
              </View>
            );
          },
        }}
      />
    </MainTab.Navigator>
  );
};
