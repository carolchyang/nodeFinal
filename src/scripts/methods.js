import emitter from "@/scripts/emitter";
import { Modal } from "bootstrap";

export const pushMessage = (msg) => {
  emitter.emit("push-message", msg);
};

export const bsModal = (id) => new Modal(document.getElementById(id));

export const setToken = (token) => {
  const expries = new Date(Date.now() + 1000 * 60 * 30).toGMTString();
  document.cookie = `nodeFinal=${token}; expires=${expries}`;
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
