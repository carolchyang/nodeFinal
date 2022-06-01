import { createApp } from "vue";

import "bootstrap";
import axios from "axios";
import VueAxios from "vue-axios";
import { createPinia } from "pinia";
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

import emitter from "@/scripts/emitter";
import { pushMessage } from "@/scripts/methods";

import App from "./App.vue";
import router from "./router";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
defineRule("password", (value, [limit]) => {
  if (value.length < limit) {
    return `密碼 不能小於 ${limit} 字元`;
  }
  if (!/^(?:[0-9]+[a-z]|[a-z]+[0-9])[a-z0-9]*$/i.test(value)) {
    return "密碼 必須為英數混和";
  }
  return true;
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true, // 調整為輸入字元立即進行驗證
});
setLocale("zh_TW");

const pinia = createPinia();
const app = createApp(App);
app.config.globalProperties.$emitter = emitter;
app.config.globalProperties.$pushMessage = pushMessage;
app.use(router);
app.use(VueAxios, axios);
app.use(pinia);
app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.mount("#app");
