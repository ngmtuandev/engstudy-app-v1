import axios from '../untils/configAxios'
export function useAuth() {
  const fetchRegister = (data) => 
  axios({
    url: '/user/register',
    method: "post",
    data,
    withCredentials: true
  })

  const fetchLogin = (data) => axios({
    url: '/user/login',
    method: "post",
    data,
    withCredentials: true
  })
  

  return {
    fetchRegister,
    fetchLogin
  };
}