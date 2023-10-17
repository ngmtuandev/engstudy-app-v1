import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: '',
        isLogin: false,
        isLoading: false,
        dataUser: ''
    },
    reducers: {}
  })

export default authSlice.reducer

  