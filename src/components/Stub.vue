<template>
  <div class="stub">
    <Info class="mb-4"></Info>
    <slot name="body"></slot>
  </div>
</template>

<script>
import Info from "@/assets/svg/manager/info.svg?inline";
export default {
  components: {
    Info
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_grid.scss";

.stub {
  display: flex;
  height: 75vh;
  width: 50vw;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & * {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
