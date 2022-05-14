import { createApp } from "vue";

import "bootstrap";
import axios from "axios";
import VueAxios from "vue-axios";
import emitter from "@/scripts/emitter";
import { pushMessage } from "@/scripts/methods";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$pushMessage = pushMessage;
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
