<template>
  <div id="auth-screen">
    <div class="bg-half">
      <div class="logo-block">
        <!-- <img src="../assets/full_logo.svg" alt="Catcherry's logo" /> -->
        <FullLogo class="logo-img"></FullLogo>
      </div>
    </div>
    <div class="form-half">
      <router-view name="form"></router-view>
      <!-- <hr /> -->
      <!-- <TestGraphql></TestGraphql> -->
    </div>
  </div>
</template>

<script>
// import TestGraphql from "@/components/TestGraphql.vue";
import FullLogo from "@/assets/full_logo.svg?inline";
export default {
  name: "Auth",
  components: {
    // TestGraphql,
    FullLogo
  }
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";

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
    .logo-block .logo-img {
      width: 14rem;
      padding-left: 2rem;
      padding-top: 3rem;
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
    }
  }

  .bg-half,
  .form-half {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
