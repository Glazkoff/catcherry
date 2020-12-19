<template>
<<<<<<< HEAD
  <div v-if="!this.$apollo.queries.team.loading">
    <div class="container">
      <bread-crumbs class="bread-crumbs"></bread-crumbs>
      <div v-if="!this.isEmpty">
        <div v-for="t in team" :key="t.id" class="card">
          <img src="../../assets/avatar.jpg" v-bind:alt="t.name" class="img" />
          <h3 v-on:click="onLink(t.id)">{{ t.name }}</h3>
          <More class="icon" v-on:click="onLink(t.id)"></More>
        </div>
      </div>
      <h3 v-else>Команд нет, ничего нет</h3>
=======
  <div class="main_team" v-if="!this.$apollo.loading">
    <h1>Организация "Название"</h1>
    <h3>Команды</h3>
    <div v-for="t in team" :key="t.id" class="card">
      <h3>{{ t.name }}</h3>
      <router-link
        :to="{ name: 'TeamMembers', params: { id: t.id } }"
        class="btn btn-alternate"
        >Перейти в управление</router-link
      >
>>>>>>> c0e70744471f813ac3e5a5df47a4c0883941ba77
    </div>
  </div>
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import { TEAM_IN_ORG_QUERY } from "@/graphql/queries";
<<<<<<< HEAD
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import More from "@/assets/more.svg?inline";
=======
import loader from "@/components/Loader.vue";

>>>>>>> c0e70744471f813ac3e5a5df47a4c0883941ba77
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
<<<<<<< HEAD
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
=======
  components: {
    loader
>>>>>>> c0e70744471f813ac3e5a5df47a4c0883941ba77
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";

.bread-crumbs {
  margin-bottom: 2.5rem;
  padding-left: 0;
}
.container {
  padding: 3rem;
  padding-top: 0.625rem;
}
.card {
  padding-right: 2.4rem;
  padding-left: 2.4rem;
  margin-bottom: 1rem;
  position: relative;
  & .img {
    max-height: 3.5rem;
    border-radius: 50%;
    margin-right: 1.25rem;
  }
  & h3 {
    cursor: pointer;
  }
  & .icon {
    position: absolute;
    right: 2.4rem;
    cursor: pointer;
  }
}
</style>
