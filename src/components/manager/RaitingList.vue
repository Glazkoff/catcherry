<template>
  <div class="main_rating">
    <breadcrumbs></breadcrumbs>
    <h2>{{ $t("ratingOfTeamMembers.ratingOfTeamMembers") }}</h2>
    <div v-if="$apollo.queries.usersInTeams.loading" class="wrapOfLoader">
      <loader></loader>
    </div>
    <div v-if="usersInTeams == null">
      <p>Нет пользователей в команде</p>
    </div>
    <div>
      <div v-for="oneUser in usersInTeams" :key="oneUser.id">
        <div
          class="card"
          :class="{
            bigCard: isShowFullInformation && oneUser.user.id === userId
          }"
        >
          <div class="card_img">
            <img src="~@/assets/avatar.jpg" />
          </div>
          <div class="card_body">
            <p>
              {{ oneUser.user.surname }} {{ oneUser.user.name }}
              {{ oneUser.user.patricity }}
            </p>
            <p>Пользователь</p>
          </div>
          <div
            @click="showFullInformation(oneUser)"
            class="card_action"
            v-if="oneUser.user.id !== userId"
          >
            <ArrowRight></ArrowRight>
          </div>
          <div
            @click="closeFullInformation()"
            class="card_action"
            v-if="isShowFullInformation && oneUser.user.id === userId"
          >
            <ArrowRight class="rotate"></ArrowRight>
          </div>
        </div>
        <div
          class="card_more"
          v-if="
            $apollo.loading &&
              isShowFullInformation &&
              oneUser.user.id === userId
          "
        >
          {{ $t("loading") }}...
        </div>
        <div
          class="card_more"
          v-if="
            isShowFullInformation &&
              oneUser.user.id === userId &&
              !$apollo.loading
          "
        >
          <div>
            <h3>{{ $t("ratingOfTeamMembers.history") }}</h3>
            <p
              v-for="pointsOperation in getOperationPointsUser"
              :key="pointsOperation.id"
              class="history"
            >
              <small v-if="pointsOperation.delta > 0">+</small
              >{{ $tc("pointsMsg", pointsOperation.delta) }}
              {{ pointsOperation.operationDescription }}
            </p>
          </div>
          <div>
            <h3>{{ $t("ratingOfTeamMembers.statistics") }}</h3>
            <div class="statistics">
              <div>
                <p>{{ $t("ratingOfTeamMembers.forTheCurrentWeek") }}:</p>
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
                  {{ $tc("pointsMsg", pointsLastWeek[0]) }}
                </p>
                <small v-if="pointsLastWeek[0] > pointsLastWeek[1]">
                  на {{ pointsLastWeek[0] - pointsLastWeek[1] }} баллов больше,
                  чем за предыдущую неделю
                </small>
                <small v-if="pointsLastWeek[0] < pointsLastWeek[1]">
                  на {{ pointsLastWeek[1] - pointsLastWeek[0] }} баллов меньше,
                  чем за предыдущую неделю
                </small>
              </div>
              <div>
                <p>{{ $t("ratingOfTeamMembers.lastWeek") }}:</p>
                <p v-if="pointsLastWeek !== null" class="points_now">
                  {{ $tc("pointsMsg", pointsLastWeek[1]) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ArrowRight from "@/assets/svg/admin/arrow_right.svg?inline";
import userStatisticsDown from "@/assets/svg/manager/userStatisticsDown.svg?inline";
import userStatisticsUp from "@/assets/svg/manager/userStatisticsUp.svg?inline";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import Loader from "@/components/Loader.vue";
import {
  USERS_IN_TEAMS_QUERY,
  GET_POINTS_OPERATION_QUERY,
  GET_POINTS_LAST_WEEK_QUERY
} from "@/graphql/queries";
export default {
  components: {
    ArrowRight,
    userStatisticsDown,
    userStatisticsUp,
    breadcrumbs,
    Loader
  },
  data() {
    return {
      isShowFullInformation: false,
      userId: 0
    };
  },
  apollo: {
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
          id: this.userId
        };
      }
    },
    getOperationPointsUser: {
      query: GET_POINTS_OPERATION_QUERY,
      variables() {
        return {
          pointAccountId: this.userId
        };
      }
    }
  },
  methods: {
    showFullInformation(user) {
      this.userId = user.user.id;
      this.isShowFullInformation = true;
    },
    closeFullInformation() {
      this.isShowFullInformation = false;
      this.userId = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  color: $gray;
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
