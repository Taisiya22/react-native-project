import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  // console.log(posts)
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginHorizontal: 16,
              marginTop: 32,
              //   alignItems: "center",
              //   justifyContent: "center",
              marginBottom: 15,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                width: Dimensions.get("window").width - 32,
                height: (Dimensions.get("window").width * 60) / 100,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Коментарі")}
              >
                <EvilIcons name="comment" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Мапи")}>
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};