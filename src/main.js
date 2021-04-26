import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueBemCn from "vue-bem-cn";
import VueTextareaAutosize from "vue-textarea-autosize";
import VueFileAgent from "vue-file-agent";
import VueCarousel from 'vue-carousel';
import "vue-file-agent/dist/vue-file-agent.css";

import { BEM_CONFIG } from "@/config";

Vue.config.productionTip = false;

Vue.use(vueBemCn, { delimiters: BEM_CONFIG });
Vue.use(VueTextareaAutosize);
Vue.use(VueFileAgent);
Vue.use(VueCarousel);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
