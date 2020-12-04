<template>
  <div class="main_users_in_teams">
    <h3>Список участников</h3>

    <div v-for="userInTeam in usersInTeams" :key="userInTeam.id">
      <TeamMemberItem :userInTeam="userInTeam" @delete="toDeleteUser" />
    </div>

    <Minialert v-if="isShowAlert">
      <p slot="title">{{ message }}</p>
    </Minialert>
  </div>
</template>

<script>
import TeamMemberItem from "@/components/manager/TeamMemberItem.vue";
import Minialert from "@/components/MiniAlert.vue";

import { USERS_IN_TEAMS_QUERY, DELETE_IN_TEAMS_QUERY } from "@/graphql/queries";

export default {
  data() {
    return {
      isShowAlert: false, // Для показа уведомления об удалении
      message: "", // Для текста сообщения в уведомлении
      teamId: this.$route.params.id // id команды
    };
  },

  apollo: {
    // Массив участников команды
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.teamId
        };
      }
    }
  },

  components: {
    TeamMemberItem,
    Minialert
  },
  methods: {
    // Для удаления участника команды
    toDeleteUser(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_IN_TEAMS_QUERY,
          variables: {
            id
          },
          update: cache => {
            // Записываем в переменную массив участников команды
            let data = cache.readQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: {
                teamId: this.teamId
              }
            });
            // Зписываем в переменную участника команды по id
            let index = data.usersInTeams.findIndex(el => el.id == id);
            // Удаляем участника команды из массива
            data.usersInTeams.splice(index, 1);
            // Меняем значение переменной для отображения уведомления
            this.isShowAlert = true;
            // Задаем время показа уведомления
            setTimeout(() => {
              this.isShowAlert = false;
            }, 3000);
          }
        })
        .then(data => {
          // Записываем в переменную текст уведомления
          this.message = "Участник удален";
          console.log(data);
        })
        .catch(error => {
          // Записываем в переменную текст уведомления
          this.message = "Ошибка " + error;
          console.error(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
</style>
