import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'USER_LOGIN',
  storage: AsyncStorage,
}
const userPersistConfig = {
  ...persistConfig,
  whitelist: ['token', 'isLogin']
}

export const store = configureStore({
  reducer: {
    auth: persistReducer(userPersistConfig, authSlice)
  },
});

export const persistor = persistStore(store)