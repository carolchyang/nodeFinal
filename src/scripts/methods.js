import emitter from "@/scripts/emitter";
import { Modal } from "bootstrap";

export const pushMessage = (msg) => {
  emitter.emit("push-message", msg);
};

export const bsModal = (id) => new Modal(document.getElementById(id));
