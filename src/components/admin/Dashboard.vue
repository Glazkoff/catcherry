<template>
  <div>
    <BreadCrumbs></BreadCrumbs>
    <h2>{{ $t("systemStatistics") }}</h2>
    <div class="wrapOfLoader" v-if="$apollo.loading">
      <loader></loader>
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
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import Loader from "@/components/Loader.vue";
import NewStatistics from "@/components/admin/charts/NewStatistics.vue";
import DeleteStatistics from "@/components/admin/charts/DeleteStatistics.vue";
import {
  STATISTICS_NEW_QUERY,
  STATISTICS_DELETE_QUERY
} from "@/graphql/queries";

export default {
  components: { NewStatistics, DeleteStatistics, BreadCrumbs, Loader },
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
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
.graphs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-gap: 3vw;
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
