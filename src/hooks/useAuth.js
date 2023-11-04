import axios from "../untils/configAxios";
export function useAuth() {
  const fetchRegister = (data) =>
    axios({
      url: "/user/register",
      method: "post",
      data,
      withCredentials: true,
    });

  const fetchLogin = (data) =>
    axios({
      url: "/user/login",
      method: "post",
      data,
      withCredentials: true,
    });

  const fetchUpdateUser = (data, token) =>
    axios({
      url: "/user/update",
      method: "put",
      data,
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
      },
    });

  const fetchUserCurrent = (token) =>
    axios({
      url: "/user/current",
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
  };
}
