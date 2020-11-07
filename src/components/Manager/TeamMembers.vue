<template>
<div>
  <h3>Участники</h3>
  <hr />
  <div v-for="userInTeam in usersInTeams" :key="userInTeam.id" class="member">
    <TeamMemberItem :userInTeam="userInTeam" @delete="toDeleteUser" />
  </div>
  <Minialert v-if="isShowAlert">
    <p slot="title">{{ message }}</p>
  </Minialert>
</div>
</template>

<script>
import TeamMemberItem from "@/components/Manager/TeamMemberItem.vue";
import Minialert from "@/components/admin/MiniAlert.vue";

import {
  USERS_IN_TEAMS_QUERY,
  DELETE_IN_TEAMS_QUERY
} from "@/graphql/queries";

export default {

  data() {
    return {
      isShowAlert: false,
      message: "",
      teamId: this.$route.params.id
    };
  },

  apollo: {
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.teamId
        }
      }
    },
  },

  components: {
    TeamMemberItem,
    Minialert
  },
  methods: {
    toDeleteUser(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_IN_TEAMS_QUERY,
          variables: {
            id
          },
          update: cache => {
            let data = cache.readQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: {
                teamId: this.teamId
              },
            });
            let index = data.usersInTeams.findIndex(el => el.id == id);
            data.usersInTeams.splice(index, 1);
            this.isShowAlert = true;
            setTimeout(() => {
              this.isShowAlert = false;
            }, 3000);
          }
        })
        .then(data => {
          this.message = "Участник удален";
          console.log(data);
        })
        .catch(error => {
          this.message = "Ошибка " + error;
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
