<template>
  <transition name="fade">
    <div class="alert">
      <div class="alert-container">
        <slot name="title"></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
.alert {
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.33);
  border-radius: 10px;
  padding: 2%;
  text-align: center;
  position: fixed;
  bottom: 2%;
  right: 1%;
  z-index: 10000;
  background: $white;
  color: $violet;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
