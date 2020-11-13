<template>
<div>
  <h1>Организация "Название"</h1>
  <h3>Команды</h3>
  <hr />
  <div v-for="team in teams" :key="team.id" class="team">
    <p>{{ team.name }}</p>
    <router-link :to="{ name: 'TeamSettings', params: { id: team.id} }">Перейти в управление</router-link>
  </div>
</div>
</template>

<script>
import {
  TEAMS_QUERY
} from "@/graphql/queries";

export default {
  apollo: {
    teams: {
      query: TEAMS_QUERY
    }
  }
};
</script>

<style lang="scss" scoped>
.team {
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
