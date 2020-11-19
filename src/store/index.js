import Vue from "vue";
import Vuex from "vuex";
import { UPDATE_TOKENS } from "@/graphql/queries.js";
import jwt from "jsonwebtoken";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    accessToken: "",
    authLoading: false,
    authError: null
  },
  getters: {
    isAuthenticated: state => {
      return !!((state.accessToken + "").length !== 0);
    },
    isAuthError: state => {
      return state.authError !== null;
    },
    hasAccessToken: state => {
      return state.accessToken != null;
    },
    isAppLoading: state => {
      return state.authLoading;
    },
    decodedToken: state => {
      let decode = jwt.decode(state.accessToken);
      return decode;
    },
    accessToken: state => {
      return state.accessToken;
    }
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    SET_AUTH_LOADING: (state, boolean) => {
      state.authLoading = boolean;
    }
  },
  actions: {
    GET_TOKENS: async state => {
      // Устанавливаю загрузку в приложении
      state.authLoading = true;

      // Получаю отпечаток браузера
      const fingerprint = await getFingerprint();

      // Собственный промис с запросом к серверу
      let promise = new Promise((resolve, reject) => {
        // Если есть отпечаток (не пустой)
        if (fingerprint) {
          // Делаю запрос к серверу за токенами
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
                state.authError = resp.data.updateTokens.error;
                if (store.$app.$route.path !== "/auth") {
                  store.$app.$router.replace({ name: "Authentication" });
                }
                state.authLoading = false;
                reject(resp.data.updateTokens.error);
              }
              // Если запрос произошёл удачно
              else {
                // Записываем в store новый access-токен
                state.commit(
                  "SET_ACCESS_TOKEN",
                  resp.data.updateTokens.accessToken
                );

                if (store.$app.$route.path !== "/") {
                  store.$app.$router.replace({ path: "/" });
                }

                // Никаких ошибок, загрузка завершена
                state.authError = null;
                state.authLoading = false;

                // Разрешаю промис
                resolve(resp.data.updateTokens.accessToken);
              }
            })
            .catch(error => {
              console.warn(error);
              state.authError = error;
              state.authLoading = false;
              reject(error);
            });
        }
        // Если нет отпечатка браузера
        else {
          state.authError = true;
          state.authLoading = false;
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
    const fp = await store._vm.$fingerprint.load();
    const result = await fp.get();
    const visitorId = result.visitorId;
    return visitorId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default store;
