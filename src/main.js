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
import { i18n } from "./i18n/i18n";
import { directive as onClickaway } from "vue-clickaway";

import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

Vue.directive("on-clickaway", onClickaway);

import FingerprintJS from "@fingerprintjs/fingerprintjs";
Vue.prototype.$fingerprint = FingerprintJS;

Vue.use(Vuelidate);
Vue.config.productionTip = process.env.NODE_ENV === "development";

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

// Существует ли в данный момент разрешающийся промис с рефрешем токенов
let refreshingPromise = null;

// Функция при каждом запросе Apollo
const customFetch = async (uri, options) => {
  // Инициализируем запрос
  let initialRequest = fetch(uri, options);

  // Если acess-токен не хранится в Vuex и не существует промис рефреша
  if (!store.getters.hasAccessToken && !refreshingPromise) {
    // Запрашиваем новые токены и записываем acess-токен в заголовки
    try {
      refreshingPromise = true;
      let newAccessToken = await store.dispatch("GET_TOKENS");
      options.headers.authorization = `Bearer ${newAccessToken}`;
      refreshingPromise = false;
    } catch (error) {
      refreshingPromise = false;
      console.log(error);
    }
  }
  // Если acess-токен находится в Vuex и не существует промис рефреша
  else if (!refreshingPromise) {
    let decodedToken = store.getters.decodedToken;
    //  Если токен не равен null
    if (decodedToken !== null) {
      // Если срок действия токена заканчивается меньше, чем через 30 секунд
      if (
        Math.ceil(Date.now() / 1000) - decodedToken.exp >= -30 &&
        !refreshingPromise
      ) {
        // Запрашиваем новые токены и записываем acess-токен в заголовки
        try {
          refreshingPromise = true;
          let newAccessToken = await store.dispatch("GET_TOKENS");
          options.headers.authorization = `Bearer ${newAccessToken}`;
          refreshingPromise = false;
        } catch (error) {
          refreshingPromise = false;
          console.log(error);
        }
      }
    }
  }

  return initialRequest;
};

// Кэш Apollo (Graphql)
const cache = new InMemoryCache({
  addTypename: true
});

// Создание ссылки для Apollo
const httpLink = new createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL,
  fetch: customFetch
});

// Создание websocket ссылки для Subscription
const wsLink = new WebSocketLink({
  uri: "ws://localhost:3000/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Клиент Apollo
const apolloClient = new ApolloClient({
  link: authLink.concat(link),
  cache,
  connectToDevTools: true
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
