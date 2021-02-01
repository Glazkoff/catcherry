<template>
  <div class="stub">
    <Info></Info>
    <p><slot name="body"></slot></p>
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

<style>
.stub {
  display: flex;
  height: 75vh;
  width: 50vw;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.stub p {
  margin-top: 20px;
}
</style>
