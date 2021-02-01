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
  height: 25vh;
  width: 100%;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.stub p {
  margin-top: 10px;
  text-align: center;
}
</style>
