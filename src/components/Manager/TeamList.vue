<template>
<div>
  <h1>Организация "Название"</h1>
  <h3>Команды</h3>
  <hr />
  <div v-for="t in team" :key="t.id" class="team">
    <p>{{ t.name }}</p>
    <router-link :to="{ name: 'TeamSettings', params: { id: t.id} }">Перейти в управление</router-link>
  </div>
</div>
</template>

<script>
import {
  TEAM_IN_ORG_QUERY
} from "@/graphql/queries";

export default {
  apollo: {
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: 1
        };
      }
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
