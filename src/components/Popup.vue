<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-exit">
        <slot name="exit"></slot>
      </div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <slot name="footer" class="modal-footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";

.modal-mask {
  position: fixed;
  z-index: 15000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  overflow-y: scroll;
  height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.modal-container {
  width: 50vw;
  margin: 0px auto;
  padding: 2%;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  position: relative;
}

.modal-header {
  margin-top: 0;
  text-align: center;
  font-size: 36px;
  font-weight: 700;
}

.modal-exit {
  position: absolute;
  right: 2rem;
  top: 1rem;
  user-select: none;
  line-height: 2rem;
  cursor: pointer;
  font-size: 3.5rem;
  color: $red;
  font-weight: 900;
  &:hover {
    color: $bright_red;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  button {
    width: 100%;
    margin: 0 5%;
  }
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
