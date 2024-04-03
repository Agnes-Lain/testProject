import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessStatus: false,
  checkingToken: true,
}

export const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    updateAccess: (state=initialState.accessStatus, action) => {
      // console.log("called access action in slice")
      return{
        ...state,
        accessStatus: action.payload,
      }
    },
    updateCheckingToken:(state=initialState.checkingToken, action) =>{
      // console.log("called token action in slice")
      return {
        ...state,
        checkingToken: action.payload, // Assuming action.payload contains the new value for checkingToken
      };
    }
  },
});

export const { updateAccess, updateCheckingToken } = authSlice.actions;
export default authSlice.reducer;
