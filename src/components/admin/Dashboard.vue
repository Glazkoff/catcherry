<template>
  <div>
    <h1>
      <i18n path="adminPanel">{{ $t("adminPanel") }}</i18n>
    </h1>
    <h2>
      <i18n path="systemStatistics">{{ $t("systemStatistics") }}</i18n>
    </h2>
    <div v-if="$apollo.loading">
      <h3>
        <i18n path="loading">{{ $t("loading") }}</i18n
        >...
      </h3>
    </div>
    <div class="graphs" v-if="!$apollo.loading">
      <NewStatistics
        v-if="!this.$apollo.loading"
        :users="statisticsNew.statisticsNewUsers"
        :orgs="statisticsNew.statisticsNewOrgs"
      ></NewStatistics>
      <DeleteStatistics
        v-if="!this.$apollo.loading"
        :users="statisticsDelete.statisticsDeleteUsers"
        :orgs="statisticsDelete.statisticsDeleteOrgs"
      ></DeleteStatistics>
    </div>
  </div>
</template>

<script>
import NewStatistics from "@/components/admin/charts/NewStatistics.vue";
import DeleteStatistics from "@/components/admin/charts/DeleteStatistics.vue";
import {
  STATISTICS_NEW_QUERY,
  STATISTICS_DELETE_QUERY
} from "@/graphql/queries";

export default {
  components: { NewStatistics, DeleteStatistics },
  apollo: {
    statisticsNew: {
      query: STATISTICS_NEW_QUERY,
      update(data) {
        return data;
      }
    },
    statisticsDelete: {
      query: STATISTICS_DELETE_QUERY,
      update(data) {
        return data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.graphs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 3vw;
}
</style>
