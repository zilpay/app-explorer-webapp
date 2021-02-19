import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueBemCn from "vue-bem-cn";
import VueTextareaAutosize from "vue-textarea-autosize";

import { BEM_CONFIG } from "@/config";

Vue.config.productionTip = false;

Vue.use(vueBemCn, { delimiters: BEM_CONFIG });
Vue.use(VueTextareaAutosize);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
