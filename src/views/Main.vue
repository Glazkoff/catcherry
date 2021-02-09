<template>
  <div id="main-view">
    <div id="side-bar">
      <div class="logo-block">
        <router-link :to="{ name: 'FeedOfPosts' }">
          <FullLogo class="logo-img"></FullLogo>
        </router-link>
      </div>
      <router-view name="sidebar" class="side-bar__inner"></router-view>
      <div class="bottom-panel-list">
        <div class="side-bar__locales">
          <div class="locales">
            <a @click="setLocale('en')">eng</a>
            <a @click="setLocale('ru')">rus</a>
          </div>
        </div>
        <div class="side-bar__nav-list">
          <router-link to="/" :exact="true" active-class="nav-checked">
            <div class="side-bar__nav-list__nav-element">
              <div class="side-bar__nav-list__nav-element__icon">
                <SettingsIcon></SettingsIcon>
              </div>
              <div class="side-bar__nav-list__nav-element__text">
                {{ $t("sideBar.settings") }}
              </div>
            </div>
          </router-link>
        </div>
        <button id="logOutBtn" class="btn btn-alternate" @click="logOut()">
          {{ $t("sideBar.quit") }}
        </button>
      </div>
    </div>
    <div id="main-content">
      <div id="top-bar"><TopBar></TopBar></div>
      <router-view name="main" id="main-router-view"></router-view>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import FullLogo from "@/assets/full_logo.svg?inline";
import SettingsIcon from "@/assets/svg/sidebar/settings_icon.svg?inline";
import { setI18nLanguage } from "@/i18n/i18n";

export default {
  name: "Main",
  components: {
    TopBar,
    FullLogo,
    SettingsIcon
  },
  methods: {
    logOut() {
      this.$store.dispatch("LOG_OUT");
    },
    setLocale(locale) {
      setI18nLanguage(locale);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";

@media screen and (max-device-width: 420px) {
  #side-bar {
    position: absolute;
    top: 0;
    left: 0;
  }

  #main-view {
    display: grid;
    grid-template-columns: 1fr !important;
  }
  #main-content {
    grid-area: 1/1/3/3 !important;
    width: 100vw !important;
    max-width: 100vw !important;
  }
}
#main-view {
  display: grid;
  grid-template-columns: $sideBarWidth 5fr;
  grid-template-rows: $topBarHeight calc(100vh - #{$topBarHeight});
  position: relative;

  #side-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12000;
    height: 100vh;
    width: $sideBarWidth;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    grid-area: 1/1/2/3;
    background-color: $violet;

    .logo-block {
      & .logo-img {
        padding-left: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        width: 10rem;
      }
    }
  }

  #main-content {
    grid-area: 1/2/3/3;
    width: calc(100vw - #{$sideBarWidth});
    max-width: calc(100vw - #{$sideBarWidth});
    overflow-x: auto;
    background: $dark_blue;
    color: $white;
    position: relative;
    #top-bar {
      position: sticky;
      width: 100%;
      top: 0;
      z-index: 10000;
      height: $topBarHeight;
      box-sizing: border-box;
    }
  }
  .side-bar__inner {
    height: 60%;
  }
}
.bottom-panel-list {
  padding-bottom: 1rem;
  #logOutBtn {
    margin: 0 auto;
  }
  .side-bar__locales {
    padding-left: 0.8rem;
  }
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
