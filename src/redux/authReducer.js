import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const INITIAL_AUTH_STATE = {isLogin : false}

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_AUTH_STATE,
    reducers : {
        login : (state, action)=> {
            state.isLogin = !state.isLogin;
            toast.success("Logged in successfully");
        },
        logout: (state, action)=>{
            state.isLogin = !state.isLogin;
            toast.error("Logged out successfully");
        }
    }

})

// Exporting the auth reducer 
export const authReducer = authSlice.reducer;

// Exporting the actions
export const { login, logout } = authSlice.actions;

// Exporting the auth selector 
export const authSelector = (state)=> state.authReducer;
