<template>
  <div class="main_team">
    <div v-for="t in team" :key="t.id">
      <div v-if="t.id == id">
        <h1>Команда {{ t.name }}</h1>
        <router-view />
      </div>
    </div>
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
          organizationId: 1
        };
      }
    }
  },
  data() {
    return {
      id: this.$route.params.id // id команды
    };
  }
};
</script>

<<<<<<< HEAD
<style lang="scss">
.every {
  display: flex;
}

.navig {
  width: 25%;
}

.cont {
  width: 50%;
=======
<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
.main_team {
  padding: 0 50px;
>>>>>>> origin/dev
}
</style>
