<template>
  <div v-if="!this.$apollo.queries.loading">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>
    <PointQuantity class="sticky w-100"></PointQuantity>
    <PointOperation :limit="0" ref="pOperation"></PointOperation>
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
export default {
  name: "PointsUser",
  components: {
    Loader,
    BreadCrumbs,
    PointOperation,
    PointQuantity
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.$refs.pOperation.refreshQuery();
      next();
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/styles/_grid.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";

.sticky{
  position: sticky;
  background-color: $dark_blue;
  z-index: 7000;
  top: $topBarHeight;
}
</style>
