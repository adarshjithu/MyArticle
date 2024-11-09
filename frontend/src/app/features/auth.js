import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: localStorage.getItem("userCredentials") ? JSON.parse(localStorage.getItem("userCredentials") || "") : null,
};


const authSlice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setUserCredentials:(state,action)=>{
            state.userData = action.payload;
            localStorage.setItem("userCredentials",JSON.stringify(action.payload))

        },
        userLogout:(state,action)=>{
            state.userData = null;
            localStorage.removeItem('userCredentials')
        }
    }
})


export const {setUserCredentials,userLogout} = authSlice.actions;
export default authSlice.reducer;