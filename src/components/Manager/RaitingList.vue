<template>
  <div>
    <h3>Рейтинг участников</h3>
    <hr />
    В период с
    <input type="date" v-model="weekAgo" class="form-control mini-date" /> по
    <input type="date" v-model="today" class="form-control mini-date" />
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
        <div
          v-else-if="
            +summOperations(raiting.user.userPoints.pointsOperation) < 0
          "
          class="down"
        >
          ↓ {{ summOperations(raiting.user.userPoints.pointsOperation) }}
        </div>
        <div v-else>0</div>
      </div>
    </div>
  </div>
</template>

<script>
import { RAITING_IN_TEAMS_QUERY } from "@/graphql/queries";
export default {
  data() {
    return {
      today: this.stampToDate(new Date()),
      weekAgo: this.stampToDate(new Date().setDate(new Date().getDate() - 7))
    };
  },
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
        if (
          this.stampToDate(+pointsOperation[i].createdAt) <
            this.stampToDate(this.today) &&
          this.stampToDate(+pointsOperation[i].createdAt) >=
            this.stampToDate(this.weekAgo)
        ) {
          summ += pointsOperation[i].delta;
        }
      }
      return summ;
    },
    stampToDate(stamp) {
      let a = new Date(stamp);
      let year = a.getFullYear();
      let month = a.getMonth() + 1;
      if (month < 10) month = "0" + month;
      let date = a.getDate();
      if (date < 10) date = "0" + date;
      let time = year + "-" + month + "-" + date;
      return time;
    }
  },
  computed: {}
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

.mini-date {
  width: 150px;
  display: inline-block;
}

.btn-link {
  display: inline-block;
}
</style>
