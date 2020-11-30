import Vue from "vue";
import VueI18n from "vue-i18n";

// import messages from "@/i18n/locales/ru.json";
import getBrowserLocale from "@/i18n/get-browser-locale.js";
import { supportedLocalesInclude } from "@/i18n/supported-locales.js";

Vue.use(VueI18n);

const dateTimeFormats = {
  en: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric"
    }
  },
  ru: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric"
    },
    long: {
      year: "numeric",
      month: "long",
      day: "numeric",
      // weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric"
    }
  }
};

function loadLocaleMessages() {
  const locales = require.context(
    "@/i18n/locales",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

function getStartingLocale() {
  let lang = localStorage.getItem("lang");
  if (lang) {
    return lang;
  } else {
    const browserLocale = getBrowserLocale({ countryCodeOnly: true });
    if (supportedLocalesInclude(browserLocale)) {
      localStorage.setItem("lang", browserLocale);
      return browserLocale;
    } else {
      localStorage.setItem("lang", process.env.VUE_APP_I18N_LOCALE || "en");
      return process.env.VUE_APP_I18N_LOCALE || "en";
    }
  }
}

export const i18n = new VueI18n({
  locale: getStartingLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  dateTimeFormats,
  messages: loadLocaleMessages()
});

// Функция установки языка
export function setI18nLanguage(lang) {
  i18n.locale = lang;
  // axios.defaults.headers.common["Accept-Language"] = lang;
  localStorage.setItem("lang", lang);
  document.querySelector("html").setAttribute("lang", lang);
  return lang;
}
