import React, { useState, useEffect} from "react";
import { View, FlatList, Image } from "react-native";

export const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params])
     }
      
   }, [route.params])
  console.log(posts)
  return (
    <View style={{ flex: 1}}>
      <FlatList data={posts} keyExtractor={(item, indx) => indx.toString()} renderItem={({ item }) => <View style={{alignItems: "center", justifyContent: "center", marginBottom: 15} }>
        <Image source={{ uri: item.photo }} style={{ height: 200, width: 350}} />
      </View> } />
    </View>
  );
};
