<template>
  <div class="main_team">
    <h1>Организация "Название"</h1>
    <h3>Команды</h3>
    <div v-for="t in team" :key="t.id" class="card">
      <h3>{{ t.name }}</h3>
      <router-link
        :to="{ name: 'TeamSettings', params: { id: t.id } }"
        class="btn btn-alternate"
        >Перейти в управление</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
import { TEAM_IN_ORG_QUERY } from "@/graphql/queries";

export default {
  apollo: {
    // Массив команд организации
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: +this.$route.params.id
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";

.card {
  padding-right: 20px;
  .btn-alternate {
    margin-left: auto;
    margin-right: 60px;
  }
}

.main_team {
  padding: 0 50px;
}
</style>
