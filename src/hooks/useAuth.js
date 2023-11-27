import axiosconfig from "../untils/configAxios";
import axios from "axios";
export function useAuth() {
  const fetchRegister = (data) =>
    axiosconfig({
      url: "/user/register",
      method: "post",
      data,
      withCredentials: true,
    });

  const fetchLogin = (data) =>
    axiosconfig({
      url: "/user/login",
      method: "post",
      data,
      withCredentials: true,
    });

  const apiLogin = async (data) => {
    const rs = await axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      data: data,
    });
    console.log(rs);
  };

  const fetchUpdateUser = (data, token) =>
    axiosconfig({
      url: "/user/update",
      method: "put",
      data,
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
      },
    });

  const fetchUserCurrent = (token) =>
    axiosconfig({
      url: "/user/current",
      method: "get",
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
      },
    });

  const fetchGetDetailUser = (token) =>
    axiosconfig({
      url: `/user/${token}`,
      method: "get",
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
      },
    });

  return {
    fetchRegister,
    fetchLogin,
    fetchUpdateUser,
    fetchUserCurrent,
    apiLogin,
    fetchGetDetailUser,
  };
}
