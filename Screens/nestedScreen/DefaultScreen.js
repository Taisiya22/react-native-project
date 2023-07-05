import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { db } from "../../firebase/config";

import { collection, query, onSnapshot } from "firebase/firestore";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    const postsRef = query(collection(db, "post"));
    onSnapshot(postsRef, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

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
            <View>
              <Text style={styles.title}>{item.photoTitle}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Коментарі", {
                    id: item.id,
                    photo: item.photo,
                  })
                }
              >
                <EvilIcons name="comment" size={24} color="#BDBDBD" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Мапи", { location: item.location })
                }
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={{}}>{item.photoLocation}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: "#212121",
    fontFamily: "roboto",
  },
});
