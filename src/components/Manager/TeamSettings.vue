<template>
  <div>
    <div v-for="team in teams" :key="team.id">
      <div v-if="team.id == id">
        <h1>Команда {{ team.name }}</h1>
        <div class="every">
          <NavBar class="navig" />
          <router-view class="cont" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/manager/NavBar";
import { TEAMS_QUERY } from "@/graphql/queries";
export default {
  apollo: {
    teams: {
      query: TEAMS_QUERY
    }
  },
  components: {
    NavBar
  },
  data() {
    return {
      id: this.$route.params.id
    };
  }
};
</script>

<style lang="scss">
.every {
  display: flex;
}

.navig {
  width: 25%;
}

.cont {
  width: 50%;
}
</style>
