<template>
  <div class="pointsUser account-view">
    <p class="pointsName">Баллы</p>
    <hr class="">
    <p class="pointsQan">{{ getPointsUser.pointQuantity }} балла</p>
    <div class="pointsOperation"><ul>
      <li v-for="operation in userOperationPoints" :key="operation.pointAccountId">
        <span class="pointsDate">{{ operation.createdAt }}</span>
        <span class="pointsDelta">{{ operation.delta }}</span>
        <span>{{ operation.description }}</span>
        <hr>
      </li>
    </ul></div>
    <button class="showAllPoints">Показать полностью</button>
  </div>

</template>

<script>
import {
  USER_OPERATION_POINTS_QUERY, POINTS_USER_QUERY
} from "@/graphql/queries";
export default {
  apollo: {
    userOperationPoints: {
      query: USER_OPERATION_POINTS_QUERY,
      variables() {
        return {
          pointAccountId: +this.$route.params.id
        };
      }
    },
    getPointsUser: {
      query: POINTS_USER_QUERY,
      variables() {
        return {
          userId: +this.$route.params.id
        };
      }
    }
  },
}
</script>

<style>
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
.showAllPoints{
  margin-left: 40px;
   }
.pointsQan{
font-family: Montserrat;
font-style: normal;
font-weight: bold;
font-size: 48px;
line-height: 59px;
padding-left: 40px;
}
.pointsName{
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 24px;
line-height: 29px;
padding-left: 40px;
}
.pointsOperation{
  display: flex;
}
.pointsDate, .pointsDelta{
font-family: Montserrat;
font-style: normal;
font-weight: normal;
font-size: 18px;
line-height: 22px;
}
.pointsDelta{
  float: right;
  padding-left: 70px;
}
</style>