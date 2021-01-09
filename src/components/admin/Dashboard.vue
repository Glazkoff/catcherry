<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2>{{ $t("systemStatistics") }}</h2>
        </div>
      </div>
      <div class="wrapOfLoader" v-if="$apollo.loading">
        <loader></loader>
      </div>
      <div class="row" v-if="!$apollo.loading">
        <NewStatistics
          class="col-6"
          v-if="!this.$apollo.loading"
          :users="statisticsNew.statisticsNewUsers"
          :orgs="statisticsNew.statisticsNewOrgs"
        ></NewStatistics>
        <DeleteStatistics
          class="col-6"
          v-if="!this.$apollo.loading"
          :users="statisticsDelete.statisticsDeleteUsers"
          :orgs="statisticsDelete.statisticsDeleteOrgs"
        ></DeleteStatistics>
      </div>
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
@import "@/styles/_grid.scss";
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
