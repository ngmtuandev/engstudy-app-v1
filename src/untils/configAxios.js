import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
const instance = axios.create({
  baseURL: "http://192.168.1.58:5000/api",
});

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// instance.interceptors.request.use(function (config) {
//     (async() => {
//       var localStorageDataUserLogin = await AsyncStorage.getItem('USER_LOGIN')
//       if (localStorageDataUserLogin && typeof localStorageDataUserLogin === 'string') {
//         console.log('string')
//       localStorageDataUserLogin = JSON.parse(localStorageDataUserLogin)
//       console.log('localStorageDataUserLogin parse >>> : ', localStorageDataUserLogin)
//       config.headers = {author : `Bearer ${localStorageDataUserLogin}`}
//       // console.log('config >>>', config)
//       return config
//     } else return config
//     })()

//   })

// DỮ LIỆU TRẢ VỀ
// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // response chính là những có nó trả về trong option axios
    // data axios trả về luôn có dạng : config: {}, data: {}. headers: {} .... ==> data luôn nằm trong data => response.data luôn
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error.data;
  }
);

export default instance;
