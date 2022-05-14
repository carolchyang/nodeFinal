import emitter from "@/scripts/emitter";

export const pushMessage = (msg) => {
  emitter.emit("push-message", msg);
};
