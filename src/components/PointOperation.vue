<template>
  <div class="container">
    <div
      class="row border-block"
      v-for="point in getPointsUser.userPointsOperation"
      :key="point.id"
      :point="point"
    >
      <small class="col-2"
        >{{ $d(point.createdAt, "number") }}
        {{ $d(point.createdAt, "time") }}</small
      >
      <small class="col-8">{{ point.operationDescription }}</small>
      <small class="col-2 grey">
        <small v-if="point.delta > 0">+</small
        >{{ $tc("pointsMsg", point.delta) }}</small
      >
    </div>
  </div>
</template>

<script>
import { GET_POINTS_USER_QUERY } from "@/graphql/queries";
export default {
  name: "PointsOperation",
  apollo: {
    getPointsUser: {
      query: GET_POINTS_USER_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_grid.scss";

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
