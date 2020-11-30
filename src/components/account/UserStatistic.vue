<template>
  <div>
    <h3>Личная статистика</h3>
    <p>Заработанные баллы: {{ personalUserStatistics.pointQuantity }}</p>
    <div
      v-for="(statistic, index) in personalUserStatistics.pointsOperation"
      :key="index"
    >
      <div>
      <hr />
      <p>Дата: {{$d(statistic.createdAt, "long")}}</p>
      <p>Баллов: {{ personalUserStatistics.pointQuantity - statistic.delta }} за "{{ statistic.operationDescription }}"</p>
      </div>
    </div>
  </div>
</template>

<script>
import { PERSONAL_USER_STATISTIC_QUERY } from "@/graphql/queries";
export default {
  apollo: {
    personalUserStatistics: {
      query: PERSONAL_USER_STATISTIC_QUERY,
      variables() {
        return {
          userId: 21 //this.$route.params.id
        };
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
