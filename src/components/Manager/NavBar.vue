<template>
<nav>
  <h1>Команда "{{team.name}}"</h1>
  <p>
    <router-link to="team_members">Участники</router-link>
  </p>
  <p>
    <router-link to="requests">Заявки на вхождение</router-link>
  </p>
  <p>
    <router-link to="team_edit">Редактирование</router-link>
  </p>
  <router-view />
</nav>
</template>

<script>
export default {
  props: ['team']

}
</script>

<style lang="scss" scoped>
nav {
  margin: 1rem;
  margin-right: 5rem;
}

nav p {
  background-color: wheat;
  margin: 0;
  border: 1px solid rgb(247, 77, 77);
  padding: 1rem;
}
</style>
