<template>
  <div>
    <h3>Рейтинг участников</h3>
    <hr>
    <div v-for="raiting in raitingInTeams" :key="raiting.id" class="oneUser">
      <img src="@/assets/avatar.jpg" alt="photo" class="mediumAvatar"/>
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
}
.mediumAvatar {
  height: 50px;
  border-radius: 25px;
}</style>
