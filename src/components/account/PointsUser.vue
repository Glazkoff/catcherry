<template>
  <div v-if="!this.$apollo.queries.loading">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>
    <PointQuantity></PointQuantity>
    <PointOperation :limit="0"></PointOperation>
  </div>
  <div v-else class="wrapOfLoader">
    <Loader></Loader>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import PointOperation from "@/components/PointOperation.vue";
import PointQuantity from "@/components/PointQuantity.vue";
import { GET_POINTS_USER_QUERY } from "@/graphql/queries";
export default {
  name: "PointsUser",
  components: {
    Loader,
    BreadCrumbs,
    PointOperation,
    PointQuantity
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
.border-block {
  display: flex;
  align-items: center;
  height: 3rem;
  border-bottom: 1px solid $violet_2;
}
.grey {
  color: $gray_3;
}
</style>
