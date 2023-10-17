import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'USER_LOGIN',
  version: 1,
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store)