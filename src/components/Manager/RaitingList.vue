<template>
  <div>
    <div v-for="raiting in raitingInTeams" :key="raiting.id" class="oneUser">
      <p>{{ raiting.user.name }}</p>
      <p>Заработанные баллы: {{ raiting.user.userPoints.pointQuantity }}</p>
    </div>
  </div>
</template>

<script>
import { RAITING_IN_TEAMS_QUERY } from "@/graphql/queries";
export default {
  apollo: {
    raitingInTeams: {
      query: RAITING_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    }
  }
};
</script>

<style>
.oneUser{
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px gray;
}</style>
