import axios from '../untils/configAxios'
export function usePost() {
  const fetchCreatePost = (data, token) => 
  {
    const dataPost = axios({
    url: '/post/new-post',
    method: "post",
    data,
    headers: {
      author: `Bearer ${JSON.parse(token)}`
    }
  })
  return dataPost
  }

  const fetchGetAllPost = () => 
  {
    const dataAllPost = axios({
    url: '/post/all-post',
    method: "get",

  })
  return dataAllPost
  }

  const fetchLikePost = (id, token) => 
  {
    const data = axios({
    url: `/post/like/${id}`,
    method: "put",
    headers: {
      author: `Bearer ${JSON.parse(token)}`
    }

  })
  return data
  }

  return {
    fetchCreatePost, fetchGetAllPost, fetchLikePost
  };
}