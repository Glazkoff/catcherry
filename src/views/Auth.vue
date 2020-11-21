<template>
  <div id="auth-screen">
    <div class="bg-half">
      <div class="logo-block">Catcherry</div>
    </div>
    <div class="form-half">
      <router-view name="form"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth"
};
</script>

<style lang="scss">
@import "@/styles/_variables.scss";

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
  }

  .form-half {
    grid-area: 1/2/2/3;
  }

  .bg-half,
  .form-half {
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
