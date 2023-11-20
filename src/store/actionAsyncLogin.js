import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAuth } from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STORAGE_KEY } from "../constants/common";
const actionAsyncLogin = createAsyncThunk("auth/data_user", async (data) => {
  console.log("data", data);
  const { fetchLogin, apiLogin } = useAuth();
  const dataLogin = await fetchLogin(data);
  console.log("datalogin", dataLogin);
  const dataUser = {
    dataLogin: { ...dataLogin, password: data?.password },
    isRemember: data?.remember,
  };
  await AsyncStorage.setItem(
    APP_STORAGE_KEY.USER_LOGIN,
    JSON.stringify(dataLogin?.accessToken)
  );
  return dataUser;
});

export default actionAsyncLogin;
