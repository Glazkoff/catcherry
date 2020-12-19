<template>
  <div class="main_team" v-if="!this.$apollo.loading">
    <div v-for="t in team" :key="t.id">
      <div v-if="t.id == id">
        <h1>Команда {{ t.name }}</h1>
        <router-view />
      </div>
    </div>
  </div>
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import { TEAM_IN_ORG_QUERY } from "@/graphql/queries";
import loader from "@/components/Loader.vue";
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
  },
  data() {
    return {
      id: +this.$route.params.id // id команды
    };
  },
  components: {
    loader
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
.main_team {
  padding: 0 50px;
}
</style>
