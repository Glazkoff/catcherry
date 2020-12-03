<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "User"
};
</script>

<style lang="scss" scoped>
.main-account {
  display: grid;
  grid-template-columns: 15% 85%;
}
.sidebar {
  background-color: #ededed;
  padding: 20px;
  a {
    display: block;
  }
}
.account-view {
  float: right;
  width: 80%;
}
</style>
