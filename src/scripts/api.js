import axios from "axios";
import { getToken } from "@/scripts/methods";

const api = process.env.VUE_APP_API;
const token = getToken();

// Users
export const apiUserSignUp = (data) => axios.post(`${api}/users/sign_up`, data);
export const apiUserSignIn = (data) => axios.post(`${api}/users/sign_in`, data);
export const apiUpdatePassword = (data) =>
  axios.post(`${api}/users/updatePassword`, data);
export const apiGetProfile = (id) => axios.get(`${api}/users/${id}`);
export const apiUpdateProfile = (data) =>
  axios.post(`${api}/users/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const apiGetLikePosts = (data) =>
  axios.get(`${api}/users/likes`, { params: data });

// Post
export const apiGetPosts = (data) =>
  axios.get(`${api}/article`, { params: data });
export const apiCreatePost = (data) =>
  axios.post(`${api}/article`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
export const apiDelPost = (id) => axios.delete(`${api}/article/${id}`);
export const apiClickLike = (id) => axios.get(`${api}/article/${id}/likes`);
export const apiDelLike = (id) => axios.delete(`${api}/article/${id}/likes`);

// Comment
export const apiGetComments = () => axios.get(`${api}/comments`);
export const apiCreateComment = (data) => axios.post(`${api}/comments`, data);
export const apiDelComment = (id) => axios.delete(`${api}/comments/${id}`);

// Forget
export const apiForgetPassword = (data) => axios.post(`${api}/forget`, data);
export const apiModifyPassword = (customToken, data) =>
  axios.post(`${api}/forget/Update`, data, {
    headers: {
      Authorization: `Bearer ${customToken}`,
    },
  });

// Follow
export const apiGetFollow = (data) =>
  axios.get(`${api}/follow`, { params: data });
export const apiCreateFollow = (data) => axios.post(`${api}/follow`, data);
export const apiDelFollow = (id) => axios.delete(`${api}/follow/${id}`);

// UpLoad
export const apiUpLoadFile = (data) => axios.post(`${api}/upload`, data);
