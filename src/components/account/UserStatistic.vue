<template>
  <div class="main_stat">
    <h3>Личная статистика</h3>
    <h3 v-if="$apollo.loading">
      {{ $t("loading") }}
    </h3>
    <div v-else>
      <p>Заработанные баллы: {{ personalUserStatistics.pointQuantity }}</p>
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
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";

.main_stat {
  padding: 0 50px;
}
</style>
