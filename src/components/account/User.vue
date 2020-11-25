<template>
  <div>
    <div>
      <!-- боковое меню для пользователя без команды -->
      <div class="sidebar">
        <router-link tag="a" :to="'/user/' + $route.params.id + '/user_org'"
          >Организации</router-link
        >
        <router-link tag="a" :to="'/user/' + $route.params.id + '/list_req'"
          >Заявки</router-link
        >
        <router-link tag="a" :to="'/user/' + 1 + '/points'">Баллы</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "User"
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
