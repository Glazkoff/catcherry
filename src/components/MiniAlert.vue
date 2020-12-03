<template>
  <transition name="alert">
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
  width: 15vw;
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.33);
  border-radius: 10px;
  padding: 1%;
  text-align: center;
  position: fixed;
  bottom: 2%;
  right: 1%;
  transition: all 0.3s ease;
  z-index: 10000;
  background: $white;
  color: $violet;
}

.alert-enter .alert,
.alert-leave-active .alert {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
