<template>
<div>
  <div v-for="t in team" :key="t.id">
    <div v-if="t.id==id">
      <h1>Команда {{ t.name }}</h1>
      <div class="every">
        <NavBar class="navig" />
        <router-view class="cont" />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@/components/Manager/NavBar";
import {
  TEAM_IN_ORG_QUERY
} from "@/graphql/queries";
export default {
  apollo: {
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: 1
        };
      }
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

<style lang="scss" scoped>
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
