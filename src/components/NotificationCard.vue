<template>
  <div class="notification">
    <div class="header">
      <h2>{{ notification.body.header }}</h2>
      <div class="icon" @click="onCheckNotification(notification.id)">
        <Cross></Cross>
      </div>
    </div>
    <div class="main">
      <p>{{ notification.body.text }}</p>
      <!-- <div v-if="notification.body.button" class="blockForButton">
        <a v-bind:href="notification.body.buttonLink" target="_blank">{{
          notification.body.button
        }}</a>
      </div> -->
    </div>
    <div class="footer">
      <small>{{ $d(notification.createdAt, "number") }}</small>
    </div>
  </div>
</template>

<script>
import Cross from "@/assets/cross.svg?inline";
export default {
  name: "NotificationCard",
  props: ["notification"],
  components: {
    Cross
  },
  data() {
    return {};
  },
  methods: {
    onCheckNotification(id) {
      this.$emit("check", { id: id });
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
  padding-right: 1.7rem;
  & h2 {
    margin-top: 0;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  & .icon {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
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
