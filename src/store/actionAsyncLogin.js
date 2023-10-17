import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAuth } from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
const actionAsyncLogin = createAsyncThunk("auth/data_user", async (data) => {
    const {fetchLogin} = useAuth()
    const dataLogin = await fetchLogin(data)
    await AsyncStorage.setItem('USER_LOGIN', JSON.stringify(dataLogin?.accessToken));
    console.log('data login with redux-tookit', dataLogin?.accessToken)
    return dataLogin
})

export default actionAsyncLogin