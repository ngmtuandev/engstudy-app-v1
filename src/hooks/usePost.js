import axios from "../untils/configAxios";
export function usePost() {
  const fetchCreatePost = (data, token) => {
    const dataPost = axios({
      url: "/post/new-post",
      method: "post",
      data,
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
      },
    });
    return dataPost;
  };

  const fetchGetAllPost = () => {
    const dataAllPost = axios({
      url: "/post/all-post",
      method: "get",
    });
    return dataAllPost;
  };

  const fetchLikePost = (id, token) => {
    const data = axios({
      url: `/post/like/${id}`,
      method: "put",
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
      },
    });
    return data;
  };

  const fetchPostImg = (id, token, formData) => {
    console.log("formData: ", formData);
    const config = {
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "multipart/form-data",
      },
    };

    return axios.post(`/post/up-img/${id}`, formData, config);
  };

  return {
    fetchCreatePost,
    fetchGetAllPost,
    fetchLikePost,
    fetchPostImg,
  };
}
