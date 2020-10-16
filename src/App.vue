<template>
  <div id="app">
    <div class="locales">
      <a @click="setLocale('en')"><flag iso="us"></flag></a>
      <a @click="setLocale('ru')"><flag iso="ru"></flag></a>
    </div>
    <h1>{{ $t("welcomeMsg") }}</h1>
    <hr />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>

<style lang="scss">
h1 {
  color: purple;
}
h1,
h4,
p {
  font-family: sans-serif;
}
.locales {
  display: flex;
  a {
    margin-right: 1rem;
    display: block;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
