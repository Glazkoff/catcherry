<template>
  <div v-if="!this.$apollo.queries.getPointsUser.loading">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>{{ $tc("pointsMsg", pointQuantity) }}</h1>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="wrapOfLoader">
    <Loader></Loader>
  </div>
</template>

<script>
import { GET_POINTS_USER_QUERY } from "@/graphql/queries";
export default {
  name: "PointsQuantity",
  apollo: {
    getPointsUser: {
      query: GET_POINTS_USER_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  computed: {
    pointQuantity() {
      if (this.getPointsUser == undefined) {
        return "-";
      } else {
        return this.getPointsUser.pointQuantity;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_grid.scss";

h1 {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
</style>
