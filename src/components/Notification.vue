<template>
  <div
    v-if="
      notification.forAllUsers == $route.params.id ||
        notification.forAllUsers == null
    "
    class="notification"
  >
    <div class="header">
      <h2>{{ notification.body.header }}</h2>
      <div class="icon" @click="onDelete(notification.id)">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fal"
          data-icon="times"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-times fa-w-10 fa-2x"
        >
          <path
            fill="white"
            d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="main">
      <p>{{ notification.body.text }}</p>
      <div v-if="notification.body.button" class="blockForButton">
        <a v-bind:href="notification.body.buttonLink" target="_blank">{{
          notification.body.button
        }}</a>
      </div>
    </div>
    <div class="footer">
      <small>{{ $d(notification.createdAt, "number") }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: ["notification"],
  data() {
    return {};
  },
  methods: {
    onDelete(id) {
      this.$emit("delete", { id: id });
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
.notification {
  width: 20rem;
  margin-bottom: 1rem;
}
.header {
  position: relative;
  & h2 {
    margin-top: 0;
    margin-bottom: 0;
  }
  & .icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    width: 1.7rem;
    height: 1.7rem;
  }
}
.main p {
  margin-top: 0.5rem;
}
.blockForButton {
  text-align: center;
}
.blockForButton a {
  display: block;
  text-decoration: none;
  width: 7.5rem;
  height: 2.4rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  line-height: 2.2rem;
  display: inline-block;
  background: rgba(138, 110, 167, 0.22);
  border: 1px solid #64507a;
  box-sizing: border-box;
  font-family: Montserrat;
  font-weight: 600;
  text-align: center;
  color: #514163;
  cursor: pointer;
  transition: all 0.2s ease-out;
}
.blockForButton a:hover {
  background: #fff;
}
span {
  color: #878787;
  font-size: 12px;
}
</style>