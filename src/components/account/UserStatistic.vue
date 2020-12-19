<template>
  <div class="main_stat">
    <breadcrumbs></breadcrumbs>
    <h3>Личная статистика</h3>
    <div v-if="$apollo.queries.usersInTeams.loading" class="wrapOfLoader">
      <loader></loader>
    </div>
    <div v-else>
      <div>
        <div class="statistics">
          <div>
            <p>За текущую неделю:</p>
            <p
              class="points_now"
              :class="{
                more: pointsLastWeek[0] > pointsLastWeek[1],
                less: pointsLastWeek[0] < pointsLastWeek[1]
              }"
            >
              <userStatisticsDown
                v-show="pointsLastWeek[0] < pointsLastWeek[1]"
              ></userStatisticsDown>
              <userStatisticsUp
                v-show="pointsLastWeek[0] > pointsLastWeek[1]"
              ></userStatisticsUp>
              {{ pointsLastWeek[0] }} баллов
            </p>
            <small v-if="pointsLastWeek[0] > pointsLastWeek[1]">
              на {{ pointsLastWeek[0] - pointsLastWeek[1] }} баллов больше, чем
              за предыдущую неделю
            </small>
            <small v-if="pointsLastWeek[0] < pointsLastWeek[1]">
              на {{ pointsLastWeek[1] - pointsLastWeek[0] }} баллов меньше, чем
              за предыдущую неделю
            </small>
          </div>
          <div>
            <p>На прошлой неделе:</p>
            <p v-if="pointsLastWeek !== null" class="points_now">
              {{ pointsLastWeek[1] }} баллов
            </p>
          </div>
        </div>
      </div>
      <p>Заработанные баллы: {{ personalUserStatistics.pointQuantity }}</p>

      <h3>История:</h3>
      <div
        v-for="(statistic, index) in personalUserStatistics.pointsOperation"
        :key="index"
        class="card"
      >
        <div>
          <p>Дата: {{ $d(statistic.createdAt, "long") }}</p>
          <p>
            Баллов:
            {{ statistic.delta }} за "{{ statistic.operationDescription }}"
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userStatisticsDown from "@/assets/svg/manager/userStatisticsDown.svg?inline";
import userStatisticsUp from "@/assets/svg/manager/userStatisticsUp.svg?inline";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import Loader from "@/components/Loader.vue";
import {
  PERSONAL_USER_STATISTIC_QUERY,
  USERS_IN_TEAMS_QUERY,
  GET_POINTS_OPERATION_QUERY,
  GET_POINTS_LAST_WEEK_QUERY
} from "@/graphql/queries";

export default {
  components: {
    userStatisticsDown,
    userStatisticsUp,
    breadcrumbs,
    Loader
  },
  apollo: {
    personalUserStatistics: {
      query: PERSONAL_USER_STATISTIC_QUERY,
      variables() {
        return {
          userId: 21 //this.$route.params.id
        };
      }
    },
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    },
    pointsLastWeek: {
      query: GET_POINTS_LAST_WEEK_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    },
    getOperationPointsUser: {
      query: GET_POINTS_OPERATION_QUERY,
      variables() {
        return {
          pointAccountId: this.$route.params.id
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";

.main_stat {
  padding: 0 50px;
}

@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
.form-control {
  display: inline-block;
}

.oneUser {
  /* margin: 15px; */
  padding: 15px;
  /* border-radius: 8px;
  box-shadow: 0 2px 5px gray; */
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

.mini {
  width: 170px;
  font-size: 14px;
  height: 40px;
  display: inline-block;
}

.btn-link {
  display: inline-block;
}

.main_rating {
  padding: 2%;
}

.rotate {
  transform: rotate(0.25turn);
  transition: 0.25s;
}

.card_more small {
  color: $gray_3;
  padding: 0;
  margin: 0;
}

.points_now {
  font-size: 28px;
  font-weight: 500;
  padding: 0;
  margin: 0 0 5px 0;
}

.more {
  color: $blue;
}

.less {
  color: $red;
}

.statistics {
  display: grid;
  grid-template-columns: 47% 47%;
  grid-column-gap: 6%;
}
.wrapOfLoader {
  overflow: hidden;
  background: $dark_blue;
  z-index: 99999;
  width: 100%;
  height: 40vh;
  padding-top: calc(20vh - 100px);
  position: relative;
}
</style>
