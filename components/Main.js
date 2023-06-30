
import React, { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "../helpers/useRoute";
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export const Main = () => {
    const [user, setUser] = useState(null);
    const state = useSelector((state) => state);
    // console.log(state);
    onAuthStateChanged(auth, (user) => setUser(user));
    useEffect(() => { }, []);
    const routing = useRoute(user);
    return (
        <NavigationContainer>
      {routing}
      </NavigationContainer>
    )
 }