<template>
  <div v-if="!this.$apollo.queries.getPointsUser.loading">
    <div class="container" v-if="!isEmpty">
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
    <div v-else class="container">
      <div class="row">
        <div class="col-12">
          <h3>Операций с Вашими баллами не найдено</h3>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Loader></Loader>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import { GET_POINTS_USER_QUERY } from "@/graphql/queries";
export default {
  name: "PointsOperation",
  components: {
    Loader
  },
  props: ["limit"],
  apollo: {
    getPointsUser: {
      query: GET_POINTS_USER_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id,
          limit: this.limit
        };
      }
    }
  },
  methods: {
    refreshQuery() {
      this.$apollo.queries.getPointsUser.refetch();
    }
  },
  computed: {
    isEmpty() {
      if (this.getPointsUser == undefined) {
        return true;
      } else {
        if (this.getPointsUser.userPointsOperation.length == 0) {
          return true;
        } else return false;
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
  color: $gray;
}
h3 {
  margin: 0;
}
</style>
