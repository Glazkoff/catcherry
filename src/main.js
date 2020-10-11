import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApollo from "vue-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { i18n } from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";
Vue.use(FlagIcon);
Vue.config.productionTip = process.env.NODE_ENV === "development";

// Заголовки с получением токена из localstorage
const getHeaders = () => {
  const headers = {};
  const token = window.localStorage.getItem("apollo-token");
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

// Создание ссылки для Apollo
const link = new createHttpLink({
  uri: process.env.VUE_APP_GRAPHQL_URL,
  fetch,
  headers: getHeaders(),
});

// Кэш Apollo (Graphql)
const cache = new InMemoryCache({
  addTypename: true,
});

// Клиент Apollo
const apolloClient = new ApolloClient({
  link,
  cache,
});

Vue.use(VueApollo);

// Провайдер Apollo (Graphql)
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

new Vue({
  router,
  store,
  i18n,
  apolloProvider,
  render: (h) => h(App),
}).$mount("#app");
