<template>
<div class="every">
  <nav>
    <p>
      <router-link :to="{name:'TeamMembers'}">Участники</router-link>
    </p>
    <p>
      <router-link :to="{name:'RequestsList'}">Заявки на вхождение</router-link>
    </p>
    <p>
      <router-link :to="{name:'EditTeam'}">Редактирование</router-link>
    </p>
  </nav>
  <router-view class="cont" />
</div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
nav {
  margin: 1rem;
  margin-right: 5rem;
  width: 15%;
}

nav p {
  background-color: wheat;
  margin: 0;
  border: 1px solid rgb(247, 77, 77);
  padding: 1rem;
}

.every {
  display: flex;
}

.cont {
  width: 50%;
}
</style>
