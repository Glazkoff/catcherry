<template>
  <div>
    <div>
      <h2>User {{ $route.params.id }}</h2>
      <router-link :to="'/user/' + $route.params.id + '/user_org'"
        >Организации</router-link
      >
      <router-link :to="'/user/' + $route.params.id + '/list_req'"
        >Заявки</router-link
      >
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
};
</script>

<style></style>
