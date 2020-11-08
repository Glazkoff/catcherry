import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { i18n } from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";

import { directive as onClickaway } from "vue-clickaway";
Vue.directive("on-clickaway", onClickaway);

import FingerprintJS from "@fingerprintjs/fingerprintjs";
Vue.prototype.$fingerprint = FingerprintJS;

Vue.use(Vuelidate);
Vue.use(FlagIcon);
Vue.config.productionTip = process.env.NODE_ENV === "development";

// TODO: разобраться с заголовками
// https://blog.logrocket.com/handling-authentication-in-your-graphql-powered-vue-app/

// Заголовки с получением токена из localstorage
// const getHeaders = () => {
//   const headers = {};
//   const token = store.state.accessToken || "";
//   if (token) {
//     headers["authorization"] = `Bearer ${token}`;
//   }
//   console.log("!!!", headers, token);
//   return headers;
// };

// Добавление контекста заголовков (access токен)
const authLink = setContext(async (_, { headers }) => {
  let token = store.state.accessToken;
  if (!store.getters.hasAccessToken && !store.getters.isAuthError) {
    try {
      token = await store.dispatch("GET_TOKENS");
    } catch (error) {
      store.state.authError = error;
    }
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

// let refreshingPromise = null;

const customFetch = async (uri, options) => {
  // TODO: ВОССТАНОВИТЬ НИЖЕ
  // if (!store.getters.hasAccessToken) {
  //   if (!refreshingPromise) {
  //     refreshingPromise = true;
  //     store.dispatch("GET_TOKENS").then(
  //       newAccessToken => {
  //         options.headers.authorization = `Bearer ${newAccessToken}`;
  //         refreshingPromise = null;
  //         return fetch(uri, options);
  //       },
  //       err => {
  //         console.log(err);
  //         refreshingPromise = null;
  //       }
  //     );
  //   }
  // } else {
  //   let decodedToken = store.getters.decodedToken;
  //   if (decodedToken !== null) {
  //     console.log(decodedToken);
  //     console.log("IAT: ", decodedToken.iat);
  //     console.log("EXP: ", decodedToken.exp);
  //     console.log("DIFF: ", decodedToken.exp - decodedToken.iat);
  //     console.log("---: ", Math.ceil(Date.now() / 1000) - decodedToken.exp);
  //     console.log("NOW: ", Math.ceil(Date.now() / 1000));
  //     if (Math.ceil(Date.now() / 1000) - decodedToken.exp >= -20) {
  //       if (!refreshingPromise) {
  //         console.log("НУЖЕН РЕФРЕШ!");
  //         // TODO: refresh
  //       }
  //     }
  //   }
  //   return fetch(uri, options);
  // }
  // ..............................................................................
  let initialRequest = fetch(uri, options);
  return initialRequest;
};

// Создание ссылки для Apollo
const link = new createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL,
  fetch: customFetch
});

// Кэш Apollo (Graphql)
const cache = new InMemoryCache({
  addTypename: true
});

// Клиент Apollo
const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache
});

Vue.use(VueApollo);

// Провайдер Apollo (Graphql)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

const app = new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");

// Добавляем доступ Vue(vm) instance в Vuex
store.$app = app;
