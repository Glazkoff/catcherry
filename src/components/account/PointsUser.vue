<template>
  <div v-if="!this.$apollo.queries.getPointsUser.loading">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1>{{ pointQuantity }}</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div
        class="row"
        v-for="point in getPointsUser.userPointsOperation"
        :key="point.id"
        :point="point"
      >
        <div class="col-12 class">
          <small class="mr-1">{{ $d(point.createdAt, "number") }}</small>
          <small class="mr-1">{{ $d(point.createdAt, "time") }}</small>
          <small class="mr-1">{{ point.operationDescription }}</small>
          <small class="float">
            <small v-if="point.delta > 0">+</small>
            {{ $tc("pointsMsg", point.delta) }}</small
          >
        </div>
      </div>
    </div>
  </div>
  <div v-else class="wrapOfLoader">
    <Loader></Loader>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import { GET_POINTS_USER_QUERY } from "@/graphql/queries";
export default {
  name: "PointsUser",
  components: {
    Loader,
    BreadCrumbs
  },
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
  methods: {},
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
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_grid.scss";

h1 {
  margin-top: 1.5rem;
  margin-bottom: 2rem;
}
.mr-1 {
  margin-right: 0.4rem;
}
.class {
  padding-bottom: 1rem;
  border-bottom: 1px solid $violet_2;
}
.float {
  float: right;
  padding-top: 4px;
  color: $gray;
}
</style>
