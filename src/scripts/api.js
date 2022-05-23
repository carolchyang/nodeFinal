import axios from "axios";

const api = process.env.VUE_APP_API;

// Users
export const apiUserSignUp = (data) => axios.post(`${api}/users/sign_up`, data);
export const apiUserSignIn = (data) => axios.post(`${api}/users/sign_in`, data);
export const apiUserUpdatePassword = (data) =>
  axios.post(`${api}/user/updatePassword`, data);
export const apiUserProfile = () => axios.get(`${api}/users/profile`);
export const apiUserUpdateProfile = (data) =>
  axios.patch(`${api}/users/profile`, data);
