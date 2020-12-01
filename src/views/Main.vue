<template>
  <div id="main-view">
    <div id="side-bar">
      <div class="logo-block">
        <FullLogo class="logo-img"></FullLogo>
      </div>
      <router-view name="sidebar" class="side-bar__inner"></router-view>
      <div class="bottom-panel-list">
        <div class="side-bar__locales">
          <div class="locales">
            <a @click="setLocale('en')">eng<flag iso="us"></flag></a>
            <a @click="setLocale('ru')">rus<flag iso="ru"></flag></a>
          </div>
        </div>
        <div class="side-bar__nav-list">
          <router-link to="/" :exact="true" active-class="nav-checked">
            <div class="side-bar__nav-list__nav-element">
              <div class="side-bar__nav-list__nav-element__icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.8749 9.47513V9.00013V8.51888L17.0749 7.46888C17.2961 7.27391 17.4413 7.00702 17.4847 6.71538C17.5282 6.42374 17.4672 6.12612 17.3124 5.87513L15.8374 3.37513C15.7278 3.1853 15.5702 3.02762 15.3804 2.91792C15.1907 2.80822 14.9754 2.75036 14.7562 2.75013C14.6203 2.74909 14.4852 2.7702 14.3562 2.81263L12.8374 3.32513C12.5752 3.15089 12.3017 2.99429 12.0187 2.85638L11.6999 1.28138C11.6428 0.993635 11.4862 0.735157 11.2577 0.551196C11.0292 0.367235 10.7432 0.269511 10.4499 0.275132H7.52491C7.2316 0.269511 6.94565 0.367235 6.71713 0.551196C6.48861 0.735157 6.33207 0.993635 6.27491 1.28138L5.95616 2.85638C5.67112 2.99426 5.39552 3.15085 5.13116 3.32513L3.64366 2.78763C3.51322 2.75365 3.37815 2.74098 3.24366 2.75013C3.02446 2.75036 2.80917 2.80822 2.61939 2.91792C2.42961 3.02762 2.27202 3.1853 2.16241 3.37513L0.687414 5.87513C0.541531 6.12575 0.487321 6.41929 0.534069 6.70548C0.580818 6.99168 0.725616 7.25271 0.943664 7.44388L2.12491 8.52513V9.48138L0.943664 10.5314C0.719457 10.7239 0.570698 10.9896 0.523788 11.2813C0.476877 11.5731 0.534849 11.8721 0.687414 12.1251L2.16241 14.6251C2.27202 14.815 2.42961 14.9726 2.61939 15.0823C2.80917 15.192 3.02446 15.2499 3.24366 15.2501C3.37951 15.2512 3.51461 15.2301 3.64366 15.1876L5.16241 14.6751C5.42463 14.8494 5.69815 15.006 5.98116 15.1439L6.29991 16.7189C6.35707 17.0066 6.51361 17.2651 6.74213 17.4491C6.97065 17.633 7.2566 17.7308 7.54991 17.7251H10.4999C10.7932 17.7308 11.0792 17.633 11.3077 17.4491C11.5362 17.2651 11.6928 17.0066 11.7499 16.7189L12.0687 15.1439C12.3537 15.006 12.6293 14.8494 12.8937 14.6751L14.4062 15.1876C14.5352 15.2301 14.6703 15.2512 14.8062 15.2501C15.0254 15.2499 15.2407 15.192 15.4304 15.0823C15.6202 14.9726 15.7778 14.815 15.8874 14.6251L17.3124 12.1251C17.4583 11.8745 17.5125 11.581 17.4658 11.2948C17.419 11.0086 17.2742 10.7476 17.0562 10.5564L15.8749 9.47513ZM14.7562 14.0001L12.6124 13.2751C12.1106 13.7002 11.537 14.0325 10.9187 14.2564L10.4749 16.5001H7.52491L7.08116 14.2814C6.46768 14.0511 5.89724 13.7194 5.39366 13.3001L3.24366 14.0001L1.76866 11.5001L3.46866 10.0001C3.3531 9.35317 3.3531 8.69084 3.46866 8.04388L1.76866 6.50013L3.24366 4.00013L5.38741 4.72513C5.88925 4.30006 6.46279 3.96779 7.08116 3.74388L7.52491 1.50013H10.4749L10.9187 3.71888C11.5322 3.94915 12.1026 4.28085 12.6062 4.70013L14.7562 4.00013L16.2312 6.50013L14.5312 8.00013C14.6467 8.64709 14.6467 9.30942 14.5312 9.95638L16.2312 11.5001L14.7562 14.0001Z"
                    fill="white"
                    class="fill"
                  />
                  <path
                    d="M9.00012 12.75C8.25844 12.75 7.53342 12.5301 6.91673 12.118C6.30005 11.706 5.8194 11.1203 5.53558 10.4351C5.25175 9.74984 5.17748 8.99584 5.32218 8.26841C5.46687 7.54098 5.82403 6.8728 6.34847 6.34835C6.87292 5.8239 7.54111 5.46675 8.26853 5.32206C8.99596 5.17736 9.74996 5.25162 10.4352 5.53545C11.1204 5.81928 11.7061 6.29993 12.1181 6.91661C12.5302 7.5333 12.7501 8.25832 12.7501 9C12.7551 9.49385 12.6616 9.98374 12.4749 10.441C12.2882 10.8982 12.0122 11.3136 11.6629 11.6628C11.3137 12.0121 10.8983 12.2881 10.4411 12.4748C9.98386 12.6614 9.49397 12.755 9.00012 12.75ZM9.00012 6.5C8.66971 6.4923 8.34118 6.55171 8.03438 6.67462C7.72759 6.79753 7.44892 6.9814 7.21522 7.2151C6.98152 7.44879 6.79765 7.72747 6.67474 8.03426C6.55183 8.34106 6.49243 8.66959 6.50012 9C6.49243 9.33041 6.55183 9.65895 6.67474 9.96574C6.79765 10.2725 6.98152 10.5512 7.21522 10.7849C7.44892 11.0186 7.72759 11.2025 8.03438 11.3254C8.34118 11.4483 8.66971 11.5077 9.00012 11.5C9.33053 11.5077 9.65907 11.4483 9.96586 11.3254C10.2727 11.2025 10.5513 11.0186 10.785 10.7849C11.0187 10.5512 11.2026 10.2725 11.3255 9.96574C11.4484 9.65895 11.5078 9.33041 11.5001 9C11.5078 8.66959 11.4484 8.34106 11.3255 8.03426C11.2026 7.72747 11.0187 7.44879 10.785 7.2151C10.5513 6.9814 10.2727 6.79753 9.96586 6.67462C9.65907 6.55171 9.33053 6.4923 9.00012 6.5Z"
                    fill="white"
                    class="fill"
                  />
                </svg>
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
      <div id="top-bar"><top-bar></top-bar></div>
      <router-view name="main" id="main-router-view"></router-view>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import FullLogo from "@/assets/full_logo.svg";
import { setI18nLanguage } from "@/i18n/i18n";

export default {
  name: "Main",
  components: { TopBar, FullLogo },
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
    overflow-x: auto;
    padding-top: $topBarHeight;
    background: $dark_blue;
    color: $white;
    #top-bar {
      position: fixed;
      width: calc(100vw - #{$sideBarWidth} - #{$scrollBarVerticalWidth});
      top: 0;
      z-index: 10000;
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
</style>
