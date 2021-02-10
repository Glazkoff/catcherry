<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <BreadCrumbs></BreadCrumbs>
      </div>
    </div>
    <div v-if="!this.$apollo.queries.managerTeams.loading">
      <div class="row">
        <div class="col-12">
          <div
            v-for="team in managerTeams"
            :key="team.id"
            class="card"
            @click="onLink(team.team.id)"
          >
            <div class="card_img">
              <img src="../../assets/avatar.jpg" />
            </div>
            <div class="card_body">
              <h3>{{ team.team.name }}</h3>
            </div>
            <div class="card_action">
              <ArrowRight></ArrowRight>
            </div>
          </div>
          <router-link :to="{ name: 'NewTeam' }" :exact="true">
            <button class="btn btn-primary block">
              {{ $t("team.createNewTeam") }}
            </button>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else class="wrapOfLoader"><Loader></Loader></div>
  </div>
</template>

<script>
import { MANAGER_TEAMS_QUERY } from "@/graphql/queries";
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import ArrowRight from "@/assets/svg/admin/arrow_right.svg?inline";
export default {
  components: {
    Loader,
    BreadCrumbs,
    ArrowRight
  },
  apollo: {
    // Массив команд организации
    managerTeams: {
      query: MANAGER_TEAMS_QUERY,
      variables() {
        return {
          userId: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    onLink(id) {
      this.$router.push({ name: "TeamMembers", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
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
