<template>
  <div>
    <div>
      <div class="sidebar">
        <router-link tag="a" :to="'/user/' + $route.params.id + '/user_org'"
          >Организации</router-link
        >
        <router-link tag="a" :to="'/user/' + $route.params.id + '/list_req'"
          >Заявки</router-link
        >
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
};

</script>

<style lang="scss" scoped>
.sidebar {
  position: absolute;
  left: 0;
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
