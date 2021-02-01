<template>
  <div id="auth-screen">
    <div class="bg-half">
      <div class="logo-block">
        <FullLogo class="logo-img"></FullLogo>
      </div>
    </div>
    <div class="form-half">
      <router-view
        name="form"
        @onShowTestComponent="onShowTestComponent"
      ></router-view>
      <hr v-if="openTestComponent" />
      <TestGraphql v-if="openTestComponent"></TestGraphql>
    </div>
  </div>
</template>

<script>
import TestGraphql from "@/components/TestGraphql.vue";
import FullLogo from "@/assets/full_logo.svg?inline";

export default {
  name: "Auth",
  components: {
    TestGraphql,
    FullLogo
  },
  data() {
    return {
      openTestComponent: false
    };
  },
  methods: {
    onShowTestComponent() {
      this.openTestComponent = true;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";

#auth-screen {
  display: grid;
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;

  .bg-half {
    grid-area: 1/1/2/2;
    background: url("../assets/bg_auth.png") no-repeat, $dark_blue;
    .logo-block {
      & .logo-img {
        width: 14rem;
        padding-left: 2rem;
        padding-top: 3rem;
      }
    }
  }

  .form-half {
    grid-area: 1/2/2/3;
    display: flex;
    flex-direction: column;
    & .form-auth {
      padding-top: 3rem;
      margin: 0 auto;
      max-width: 30rem;
      width: 50%;
      min-width: 20rem;
      min-height: 100vh;

      & > h1 {
        padding-bottom: 0.5rem;
      }
      & > p {
        padding-bottom: 1rem;
      }
    }
  }

  .bg-half,
  .form-half {
    overflow-x: hidden;
    overflow-y: auto;
  }
}

@media (max-width: $tabletBreakpoint) {
  #app {
    width: unset;
  }
  #auth-screen {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    background: url("../assets/bg_auth.png") no-repeat, $dark_blue;
    overflow-x: hidden;
    overflow-y: auto;
    height: unset;
    min-height: 100vh;
    width: unset;
    .bg-half {
      grid-area: 1/1/2/2;
      .logo-block {
        display: flex;
        justify-content: space-around;
        padding-top: 2rem;
        padding-bottom: 1.5rem;
        & .logo-img {
          width: 60%;
          max-width: 16rem;
          padding-left: unset;
          padding-top: unset;
        }
      }
    }

    .form-half {
      grid-area: 2/1/3/2;
      padding-bottom: 1.5rem;
      display: flex;
      align-content: center;
      & > * {
        display: block;
        margin: auto;
      }
      .form-auth h1,
      .form-auth > p,
      .form-auth label,
      .form-auth a {
        color: $white;
      }
      .form-auth {
        min-height: unset;
        min-width: unset;
        h1 {
          text-align: center;
          padding-bottom: 1rem;
        }
        & > p {
          padding-bottom: 1rem;
        }
        padding-top: 0;
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
        margin: auto;
      }
    }

    .bg-half,
    .form-half {
      overflow-x: hidden;
      overflow-y: unset !important;
    }
  }
}
</style>
