import emitter from "@/scripts/emitter";
import { Modal } from "bootstrap";
import moment from "moment";

// Toast
export const pushMessage = (msg) => {
  emitter.emit("push-message", msg);
};

// Modal
export const bsModal = (id) => new Modal(document.getElementById(id));

// 取得時間
export const getTime = (time) => {
  const newTime = moment(time).format("YYYY/MM/DD HH:mm");
  return newTime;
};

// 取得距離時間
export const getDiffTime = (time) => {
  const newTime = moment(time).fromNow();
  return newTime;
};

// token 相關

export const setToken = (token) => {
  const expries = new Date(Date.now() + 1000 * 60 * 30).toGMTString();
  document.cookie = `nodeFinal=${token}; expires=${expries}; path=/`;
};

export const getToken = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)nodeFinal\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return token;
};

export const clearToken = () => {
  document.cookie = "nodeFinal=;expires=;path=/";
};
