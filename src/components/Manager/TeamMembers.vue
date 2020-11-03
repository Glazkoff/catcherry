<template>
<div>
  <div class="every">
    <NavBar class="navig" />
    <div class="partic">
      <h3>Участники</h3>
      <hr />
      <div v-for="userInTeam in usersInTeams" :key="userInTeam.id" class="member">
        <TeamMemberItem :userInTeam="userInTeam" @delete="toDeleteUser" />
      </div>
    </div>
  </div>
  <Minialert v-if="isShowAlert">
    <p slot="title">{{message}}</p>
  </Minialert>
</div>
</template>

<script>
import NavBar from "@/components/Manager/NavBar";
import TeamMemberItem from "@/components/Manager/TeamMemberItem.vue";
import Minialert from "@/components/admin/MiniAlert.vue";

import {
  USERS_IN_TEAMS_QUERY,
  DELETE_IN_TEAMS_QUERY
} from "@/graphql/queries";

export default {
  apollo: {
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY
    }
  },

  data() {
    return {
      isShowAlert: false,
      message: ""
    };
  },
  components: {
    TeamMemberItem,
    NavBar,
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
              query: USERS_IN_TEAMS_QUERY
            });
            let index = data.usersInTeams.findIndex(el => el.id == id);
            data.usersInTeams.splice(index, 1);
            this.isShowAlert = true;
            setTimeout(() => {
              this.isShowAlert = false;
            }, 3000);
            cache.writeQuery({
              query: USERS_IN_TEAMS_QUERY,
              data
            });
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
.member {
  border: 1px solid black;
  padding: 1rem;
  margin: 1rem;
}

.every {
  display: flex;
  justify-content: baseline;
}

.navig {
  width: 15%;
}

.partic {
  width: 50%;
}
</style>
