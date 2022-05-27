import emitter from "@/scripts/emitter";
import { Modal } from "bootstrap";

// Toast
export const pushMessage = (msg) => {
  emitter.emit("push-message", msg);
};

// Modal
export const bsModal = (id) => new Modal(document.getElementById(id));

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
