import React, { useState, useEffect} from "react";
import {
    View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList,
    Image
} from "react-native";
import { AntDesign } from "@expo/vector-icons";


import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { collection, query, doc, addDoc, onSnapshot } from "firebase/firestore";
import { format } from "date-fns";

export const CommentsScreen = ({route }) => { 
        const [comments, setComments] = useState([]);
        const titleTextHandler = (text) => setText(text);
        const [text, setText] = useState("");
    
    const { id, photo } = route.params;
// console.log(route.params)
        const { nickName, userId  } = useSelector((state) => state.auth);

       useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
      const commentRef = query(collection(doc(db, "post", id), "comments"));
      onSnapshot(commentRef, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

    const onAddComment = async () => {
      if (text.trim() === "") {
      return;
    }
    const data = format(new Date(), "dd MMMM yyyy | HH : mm");
    const comment = {
      text,
      data,
      nickName,
      userId,
   
    };

    const docRef = await addDoc(
      collection(doc(db, "post", id), "comments"),
      comment
    );
    setText("");
  };

        

    return (<View style={styles.container}>
        <View style={{marginHorizontal:16, marginTop: 32} }>
            <Image source={{ uri: photo }} style={styles.photo} />
            </View>
     
        <FlatList 
        data={comments}
        keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
           <View style={styles.commentWrapper}>
            <Text style={styles.comment}>{item.text}</Text>
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />
           <View>
            <TextInput
                value={text}
                style={styles.input}
                onChangeText={titleTextHandler} />
           
           </View>
           <View style={styles.inputContainer}>
           <TouchableOpacity style={styles.iconContainer} onPress={onAddComment}>
               <AntDesign name="arrowup" size={24} color="#FFF" />
               </TouchableOpacity>
            </View>
        </View>)
    
    
    }

styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
 input: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    fontFamily: "roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
     padding: 16,
    marginHorizontal:16
    },
 
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    top: -46,
    left: 30,
    },
  inputContainer: {
    flexDirection: "row-reverse",
  },
    commentWrapper: {
    padding: 16,
    marginLeft: 16,
    marginTop: 32,
    marginBottom: 24,
    width: 299,
    height: 103,
    flexShrink: 0,
    borderRadius: 6,
    backgroundColor: "#F6F6F6",
    },
     comment: {
    color: "#212121",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 18,
    },
     data: {
    fontFamily: "roboto",
    fontSize: 10,
    color: "#BDBDBD",
    textAlign: "right",
    },
    photo: {
       
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    },
    
})



