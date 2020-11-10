import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: "",
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
    },
  },
  actions: {},
  modules: {},
});
