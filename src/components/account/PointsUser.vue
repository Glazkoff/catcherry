<template>
  <div class="pointsUser account-view">
    <p class="pointsName">Баллы</p>
    <hr class="" />
    <div v-if="$apollo.loading">
      <h3>
        <i18n path="loading">{{ $t("loading") }}</i18n
        >...
      </h3>
    </div>
    <div v-if="!$apollo.loading">
      <p class="pointsQan">{{ getPointsUser.pointQuantity }} балла</p>
      <div>
        <ul v-if="isMini">
          <li
            v-for="operation in miniPointsOperation"
            :key="operation.pointAccountId"
            class="pointsOperation"
          >
            <span class="pointsDate">{{
              $d(operation.createdAt, "long")
            }}</span>
            <span class="pointsDelta">{{ operation.delta }}</span>
            <span class="pointsDescription">{{
              operation.operationDescription
            }}</span>
          </li>
        </ul>
        <ul v-if="isBig">
          <li
            v-for="operation in getOperationPointsUser"
            :key="operation.pointAccountId"
            class="pointsOperation"
          >
            <span class="pointsDate">{{
              $d(operation.createdAt, "long")
            }}</span>
            <span class="pointsDelta">{{ operation.delta }}</span>
            <span class="pointsDescription">{{
              operation.operationDescription
            }}</span>
          </li>
        </ul>
      </div>
      <button class="showAllPoints" @click="showFull()" v-if="isMini">
        Показать полностью
      </button>
    </div>
  </div>
</template>

<script>
import {
  USER_OPERATION_POINTS_QUERY,
  GET_POINTS_QUERY
} from "@/graphql/queries";
export default {
  apollo: {
    getOperationPointsUser: {
      query: USER_OPERATION_POINTS_QUERY,
      variables() {
        return {
          pointAccountId: +this.$route.params.id
        };
      }
    },
    getPointsUser: {
      query: GET_POINTS_QUERY,
      variables() {
        return {
          userId: +this.$route.params.id
        };
      }
    }
  },
  data() {
    return {
      isMini: true,
      isBig: false
    };
  },
  methods: {
    showFull() {
      this.isMini = false;
      this.isBig = true;
    }
  },
  computed: {
    miniPointsOperation() {
      return this.getOperationPointsUser.filter((el, index) => {
        return index < 3;
      });
    }
  }
};
</script>

<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}
li {
  list-style-type: none;
}
.showAllPoints {
  margin-left: 40px;
}
.pointsQan {
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 59px;
  padding-left: 40px;
}
.pointsName {
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  padding-left: 40px;
}
.pointsOperation {
  font-family: Montserrat;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  text-align: center;
  width: 80%;
  font-size: 20px;
  padding: 1%;
  span {
    width: 33%;
  }
}
</style>
