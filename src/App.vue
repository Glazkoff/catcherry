<template>
  <div id="app" v-if="!isAppLoading" v-cloak>
    <router-view></router-view>
  </div>
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Loader
  },
  async mounted() {
    // Для глобального лоадера
    this.$store.commit("SET_AUTH_LOADING", true);

    // Запрашиваем токены при запуске приложения
    this.$store.dispatch("GET_TOKENS").then(
      () => {
        this.$store.commit("SET_AUTH_LOADING", false);
      },
      err => {
        this.$store.commit("SET_AUTH_LOADING", false);
        console.warn(err);
      }
    );
  },
  computed: {
    isAppLoading() {
      return this.$store.getters.isAppLoading;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_classes.scss";
// @import "@/styles/_reset.scss";

#app {
  width: 100vw;
  max-width: 100vw;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  font-family: "Lato", sans-serif;
}

[v-cloak] {
  display: none;
}

.side-bar__nav-list {
  a {
    text-decoration: none;
  }
  &__nav-element {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
    padding-left: 0.8rem;
    display: flex;
    &__icon {
      height: 20px;
      width: 20px;
      margin-right: 0.8rem;
      svg {
        width: 100%;
        height: 100%;
      }
      & svg .fill {
        fill: $white;
      }
      & svg .fill-stroke {
        stroke: $white;
      }
      .nav-checked & svg .fill {
        fill: $bright_violet;
      }
      .nav-checked & svg .fill-stroke {
        stroke: $bright_violet;
      }
    }
    &__text {
      .nav-checked & {
        color: $bright_violet;
      }
      color: $white;
      text-decoration: none;
    }
  }
  .nav-checked {
    color: $bright_violet;
  }
}

.wrapOfLoader {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: $dark_blue;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  padding-top: calc(50vh - 100px);
}

.side-bar__nav-list__back-btn {
  border-bottom: 2px solid $violet_3;
  margin-bottom: 0.5rem;
  & > * {
    transition: transform 400ms ease;
  }
  &:hover > * {
    transform: translateX(-4px);
  }
}
</style>
