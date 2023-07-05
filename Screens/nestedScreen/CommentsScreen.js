import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
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
        const { nickName, userId  } = useSelector((state) => state.auth);

       useEffect(() => {
    getAllComments();
  }, []);

  const getAllComments = async () => {
    const commentRef = query(collection(doc(db, "post", id), "comments"));
    const unsubscribe = onSnapshot(commentRef, (querySnapshot) => {
      const commentArr = [];
      querySnapshot.forEach((doc) => {
        commentArr.push({ ...doc.data(), id: doc.id });
      });
      setComments(commentArr );
    });
  };

  const onAddComment = async () => {
    const data = format(new Date(), "dd MMMM yyyy | HH : mm");
    const comment = {
      text,
      data,
      nickName,
      userId,
    //   photo
    };

    const docRef = await addDoc(
      collection(doc(db, "post", id), "comments"),
      comment
    );
    setText("");
  };

        

       return (<View style={styles.container}>
           <View>
           <TextInput value={text}
              style={styles.input}
              onChangeText={titleTextHandler}/>
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

})