<template>
  <div v-if="!this.$apollo.queries.team.loading">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <bread-crumbs></bread-crumbs>
        </div>
      </div>
      <div v-if="!this.isEmpty">
        <div class="row">
          <div class="col-12">
            <div v-for="t in team" :key="t.id" class="card">
              <div class="card_img">
                <img src="../../assets/avatar.jpg" v-bind:alt="t.name" />
              </div>
              <div class="card_body">
                <h3 v-on:click="onLink(t.id)">{{ t.name }}</h3>
              </div>
              <div class="card_action">
                <More v-on:click="onLink(t.id)"></More>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 v-else>Команд нет, ничего нет</h3>
    </div>
  </div>
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import { TEAM_IN_ORG_QUERY } from "@/graphql/queries";
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import More from "@/assets/more.svg?inline";
export default {
  components: {
    Loader,
    BreadCrumbs,
    More
  },
  apollo: {
    // Массив команд организации
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: +this.$route.params.id
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
  },
  computed: {
    isEmpty() {
      if (!this.$apollo.queries.team.loading) {
        if (
          this.team != undefined ||
          this.team.length != 0 ||
          this.team.length != null
        )
          return false;
        else return true;
      } else return false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_grid.scss";
</style>
