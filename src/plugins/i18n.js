import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: "ru",
  fallbackLocale: "en",
  messages: {
    en: {
      welcomeMsg: "Hello, PolyWeb!",
      startMsg: "The start of the {title} project",
      projectTitle: "FISHKA"
    },
    ru: {
      welcomeMsg: "Привет, Поливеб!",
      startMsg: "Старт проекта {title}",
      projectTitle: "ФИШКА"
    }
  }
});
