<template>
  <div>
    <h3>Рейтинг участников</h3>
    <hr />
    <a @click="sortList()" class="btn btn-link">По общему количеству</a>
    <a @click="weeklyList()" class="btn btn-link">По недельному результату</a>
    <div v-for="raiting in raitingInTeams" :key="raiting.id" class="oneUser">
      <img src="@/assets/avatar.jpg" alt="photo" class="mediumAvatar" />
      <p>{{ raiting.user.name }}</p>
      <p>Заработанные баллы: {{ raiting.user.userPoints.pointQuantity }}</p>
      <div>
        За неделю заработано:
        <div
          v-if="+summOperations(raiting.user.userPoints.pointsOperation) > 0"
          class="up"
        >
          ↑ +{{ summOperations(raiting.user.userPoints.pointsOperation) }}
        </div>
        <div v-else class="down">
          ↓ {{ summOperations(raiting.user.userPoints.pointsOperation) }}
        </div>
      </div>
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
  },
  methods: {
    sortList() {
      this.raitingInTeams.sort(
        (a, b) =>
          parseFloat(b.user.userPoints.pointQuantity) -
          parseFloat(a.user.userPoints.pointQuantity)
      );
    },
    weeklyList() {
      this.raitingInTeams.sort(
        (a, b) =>
          parseFloat(this.summOperations(b.user.userPoints.pointsOperation)) -
          parseFloat(this.summOperations(a.user.userPoints.pointsOperation))
      );
    },
    summOperations(pointsOperation) {
      let summ = 0;
      for (let i = 0; i < pointsOperation.length; i++) {
        summ += pointsOperation[i].delta;
      }
      return summ;
    }
  }
};
</script>

<style>
.oneUser {
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px gray;
}
.mediumAvatar {
  height: 50px;
  border-radius: 25px;
}
.up {
  color: rgb(13, 135, 88);
}
.down {
  color: rgb(244, 96, 94);
}
</style>
