import axios from "axios";

const api = process.env.VUE_APP_API;

// Users
export const apiUserSignUp = (data) => axios.post(`${api}/users/sign_up`, data);
export const apiUserSignIn = (data) => axios.post(`${api}/users/sign_in`, data);
export const apiUpdatePassword = (data) =>
  axios.post(`${api}/users/updatePassword`, data);
export const apiGetProfile = () => axios.get(`${api}/users/profile`);
export const apiUpdateProfile = (data) =>
  axios.patch(`${api}/users/profile`, data);
export const apiGetLikePosts = (id) => axios.get(`${api}/users/${id}/likes`);
