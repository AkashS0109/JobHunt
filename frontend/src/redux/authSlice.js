import { createSlice } from "@reduxjs/toolkit";

//data reagarding user data
const authSlice=createSlice({
    name:"auth",
    initialState:{
         loading:false,
         user:null
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },
    setUser:(state,action)=>{
        state.user=action.payload;
    }
    }
});
export const {setLoading ,setUser}=authSlice.actions;
export default authSlice.reducer;