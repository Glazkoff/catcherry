<template>
<div>
  <h3>Редактирование</h3>
  <hr />
  <div v-for="team in teams" :key="team.id">
    <div v-if="team.id==id">
      <EditForm :team="team" @update="toSaveEditTeam" />
    </div>
  </div>
</div>
</template>

<script>
import {
  TEAMS_QUERY,
  UPDATE_TEAMS_QUERY
} from "@/graphql/queries";
import EditForm from "@/components/manager/EditForm"
export default {
  apollo: {
    teams: {
      query: TEAMS_QUERY
    }
  },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  components: {
    EditForm
  },
  methods: {
    toSaveEditTeam(name, description, maxUsersLimit) {
      this.$apollo
        .mutate({
          mutation: UPDATE_TEAMS_QUERY,
          variables: {
            id: this.id,
            name: name,
            description: description,
            maxUsersLimit: maxUsersLimit
          },
          update: cache => {
            let data = cache.readQuery({
              query: TEAMS_QUERY
            });
            data.teams.find(el => el.id === this.id).name = name;
            data.teams.find(
              el => el.id === this.id
            ).description = description;
            data.teams.find(
              el => el.id === this.id
            ).maxUsersLimit = maxUsersLimit;
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
