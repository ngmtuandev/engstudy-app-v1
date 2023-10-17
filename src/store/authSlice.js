import { createSlice } from "@reduxjs/toolkit"
import actionAsyncLogin from "./actionAsyncLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: '',
        isLogin: false,
        isLoading: false,
        dataUser: ''
    },
    reducers: {
      logout: (state, action) => {
        state.token = null,
        state.isLogin = false,
        state.dataUser = null
        AsyncStorage.removeItem('USER_LOGIN')
      }
    },
    extraReducers: (builder) => {
      // Peding ...
      builder.addCase(actionAsyncLogin.pending, (state, action) => {
        state.isLogin = false
        state.isLoading = true
      });
  
      // full fill ...
      builder.addCase(actionAsyncLogin.fulfilled, (state, action) => {
        // console.log('check action user in userSlice >>>', action.payload)
        console.log('actionAsyncLogin full extra >>>>', action?.payload)
        const jsonValue = JSON.stringify(action?.payload?.accessToken);
        state.token = jsonValue
        state.isLoading = false
        state.dataUser = action?.payload
        state.isLogin = true
      });
  
      // erorr
      builder.addCase(actionAsyncLogin.rejected, (state, action) => {
        state.isLoading = false
      });
    },
  })
export const {logout} = authSlice.actions;
export default authSlice.reducer

  