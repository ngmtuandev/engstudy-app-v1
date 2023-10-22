import axios from "../untils/configAxios";
export function useComment() {
  const fetchCreateComment = (data, token, pid) => {
    console.log(pid, data);
    const newComment = axios({
      url: `/comment/new-comment/${pid}`,
      method: "post",
      data,
      headers: {
        author: `Bearer ${JSON.parse(token)}`,
      },
    });
    return newComment;
  };

  const fetchAllCommentItem = () => {
    const allCommentItem = axios({
      url: `/comment/allComment`,
      method: "get",
    });
    return allCommentItem;
  };

  return {
    fetchCreateComment,
    fetchAllCommentItem,
  };
}
