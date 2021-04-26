import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    setAppList(state, list) {
      if (Array.isArray(list)) {
        state.list = list;
      }
    }
  },
  actions: {},
  modules: {}
});
