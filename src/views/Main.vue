<template>
  <div id="main-view">
    <div id="side-bar">
      <div class="logo-block">
        <img src="../assets/full_logo.svg" alt="Catcherry's logo" />
      </div>
      <router-view name="sidebar"></router-view>
    </div>
    <div id="main-content">
      <div><top-bar></top-bar></div>
      <router-view name="main"></router-view>
      <!--
      <div v-if="!isAppLoading" v-cloak>
        <div class="locales">
          <a @click="setLocale('en')"><flag iso="us"></flag></a>
          <a @click="setLocale('ru')"><flag iso="ru"></flag></a>
        </div>
        <h1>{{ $t("welcomeMsg") }}</h1>
        <nav> -->
      <!-- FIXME: сделать id пользователя динамическим -->
      <!-- <router-link to="/user/1">Профиль</router-link> |
          <router-link to="/admin">Админпанель</router-link>
        </nav>
        <hr />
        <router-view></router-view>
      </div>
      <div v-else>Загрузка... Здесь будет спиннер!</div> -->
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
export default {
  name: "Main",
  components: { TopBar },
  methods: {},
  computed: {
    isAppLoading() {
      return this.$store.getters.isAppLoading;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";
#main-view {
  display: grid;
  grid-template-columns: 1.2fr 5fr;
  grid-template-rows: auto;
  #side-bar {
    grid-area: 1/1/2/2;
    background-color: $violet;

    .logo-block img {
      padding-left: 1rem;
      padding-top: 1rem;
      padding-bottom: 1rem;
      width: 10rem;
    }
  }

  #main-content {
    grid-area: 1/2/2/3;
  }
}
</style>
