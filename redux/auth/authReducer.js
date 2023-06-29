import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        userId: null,
        nickname:null
    },
    reducer: {
        updateUserProfile: ((state, { payload}) => ({...state, userId: payload.userId}))
    }
})

// console.log(authSlice)