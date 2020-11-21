<template>
  <div>
    <nav>
      <p>
        <router-link :to="{ name: 'RaitingList' }"
          >Рейтинг участников</router-link
        >
      </p>
      <p>
        <router-link :to="{ name: 'TeamMembers' }">Участники</router-link>
      </p>
      <p>
        <router-link :to="{ name: 'RequestsList' }"
          >Заявки на вхождение</router-link
        >
      </p>
      <p>
        <router-link :to="{ name: 'EditTeam' }">Редактирование</router-link>
      </p>
      <p>
        <router-link :to="{ name: 'TasksTeam' }">Задания</router-link>
      </p>
    </nav>
  </div>
</template>

<script>
export default {};
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

.router-link-exact-active {
  font-weight: 700;
}
</style>
