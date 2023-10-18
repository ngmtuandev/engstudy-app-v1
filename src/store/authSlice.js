import { createSlice } from "@reduxjs/toolkit"
import actionAsyncLogin from "./actionAsyncLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STORAGE_KEY } from "../constants/common";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: '',
        isLogin: false,
        isLoading: false,
        dataUser: '',
        isRememberAuth: false
    },
    reducers: {
      logout: (state, action) => {
        state.token = null,
        state.isLogin = false,
        state.dataUser = null
        AsyncStorage.removeItem(APP_STORAGE_KEY.USER_LOGIN)
      },
      // rememberAuth: async (state, action) => {
      //   const data_auth_remember = await AsyncStorage.getItem("REMEMBER_LOGIN")
      //   console.log('data_auth_remember', data_auth_remember)
      //   if (data_auth_remember)
      //   {
      //     // console.log('set remember true')
      //     state.isRememberAuth = true
      //   }
      //   else {
      //     // console.log('set remember false')
      //     state.isRememberAuth = false
      //   }
      // }
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
        // console.log('actionAsyncLogin full extra >>>>', action?.payload?.dataLogin)
        const jsonValue = JSON.stringify(action?.payload?.dataLogin?.accessToken);
        state.token = jsonValue
        state.isLoading = false
        state.dataUser = action?.payload?.dataLogin
        state.isLogin = true
        // console.log('check isRememberAuth >>>>', state.isRememberAuth)
        // console.log(' action?.payload?.isRemember &&&&&',  action?.payload?.isRemember)
        if ( !!action?.payload?.isRemember === true){
          (async()=>{
            // console.log('REMEMBER')
            await AsyncStorage.setItem(APP_STORAGE_KEY.REMEMBERED_USER,  JSON.stringify(action?.payload?.dataLogin));
          })()
          state.isRememberAuth = true
        }
        else {
          (async()=> {
            // console.log('NOT REMEMBER')
            await AsyncStorage.removeItem(APP_STORAGE_KEY.REMEMBERED_USER);
          })()
          state.isRememberAuth = false
        }
      });
  
      // erorr
      builder.addCase(actionAsyncLogin.rejected, (state, action) => {
        state.isLoading = false
      });
    },
  })
export const {logout, rememberAuth} = authSlice.actions;
export default authSlice.reducer

  