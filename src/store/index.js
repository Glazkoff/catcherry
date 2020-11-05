import Vue from "vue";
import Vuex from "vuex";
import { UPDATE_TOKENS } from "@/graphql/queries.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: ""
  },
  getters: {
    isAuthenticated: state => {
      return !!((state.accessToken + "").length !== 0);
    }
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
    }
  },
  actions: {
    GET_TOKENS: async state => {
      const fingerprint = await getFingerprint();
      console.log("!!: ", fingerprint);
      let promise = new Promise((resolve, reject) => {
        if (fingerprint) {
          store.$app.$apollo
            .mutate({
              mutation: UPDATE_TOKENS,
              variables: {
                fingerprint
              }
            })
            .then(resp => {
              // Если сервер не вернул токен
              if (
                !resp.data.updateTokens ||
                resp.data.updateTokens.accessToken === null ||
                resp.data.updateTokens.error
              ) {
                if (store.$app.$route.path !== "/auth") {
                  store.$app.$router.push("/auth");
                }
                reject(resp.data.updateTokens.error);
              } else {
                state.commit(
                  "SET_ACCESS_TOKEN",
                  resp.data.updateTokens.accessToken
                );
                if (store.$route.path !== "/") {
                  store.$app.$router.push("/");
                }
                resolve(resp.data.updateTokens.accessToken);
              }
            })
            .catch(error => {
              console.error(error);
              reject(error);
            });
        } else {
          console.log("!!!");
          reject();
        }
      });
      return promise;
    }
  },
  modules: {}
});

async function getFingerprint() {
  try {
    console.log("!!!!");
    console.log(store);
    if (store.$app !== undefined) {
      const fp = await store.$app.$fingerprint.load();
      const result = await fp.get();
      const visitorId = result.visitorId;
      return visitorId;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default store;
