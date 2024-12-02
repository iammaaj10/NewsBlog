import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUsers:null,
        profile:null
    },
    reducers:{
        getUsers:(state, action)=>{
            state.user = action.payload;
        },
        getOtherUsers:(state,action)=>{
            state.otherUsers = action.payload;
        },
        getprofile:(state,action)=>{
            state.profile=action.payload
        },
        followingUpdate :(state ,action)=>{
            if(state.user.following.includes(action.payload))
            {
              state.user.following = state.user.following.filter((ItemId)=>{
                return ItemId !== action.payload
              })
            }
            else{
              state.user.following.push(action.payload)
            }
          }
    },
   

});
export const {getUsers,getOtherUsers,getprofile,followingUpdate} =userSlice.actions;
export default userSlice.reducer;
