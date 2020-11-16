<template>
  <div>
    <div class="main-account">
      <!-- боковое меню для пользователя без команды -->
      <div class="sidebar">
        <router-link tag="a" :to="'/user/' + $route.params.id"
          >Профиль</router-link
        >
        <router-link tag="a" :to="'/user/' + $route.params.id + '/user_org'"
          >Организации</router-link
        >
        <router-link tag="a" :to="'/user/' + $route.params.id + '/feed'"
          >Лента новостей</router-link
        >
        <router-link tag="a" :to="'/user/' + $route.params.id + '/list_req'"
          >Заявки</router-link
        >
        <router-link tag="a" :to="'/user/' + 1 + '/points'">Баллы</router-link>
        <router-link tag="a" :to="'/user/' + $route.params.id + '/tasks'"
          >Задания</router-link
        >
      </div>
      <div>
      <router-view></router-view>
      </div>
    </div>
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
