<template>
  <div class="main_request">
    <div v-for="t in team" :key="t.id">
      <div v-if="t.id == teamId">
        <h3>Заявки на вхождение {{ (name = t.name) }}</h3>
        <hr />
        <div v-for="request in requests" :key="request.id" class="request">
          <RequestsItem
            :request="request"
            @accept="toAccept"
            @reject="toReject"
          />
        </div>
        <Minialert v-if="isShowAlert">
          <p slot="title">{{ message }}</p>
        </Minialert>
      </div>
    </div>
  </div>
</template>

<script>
import RequestsItem from "@/components/manager/RequestsItem";
import Minialert from "@/components/MiniAlert.vue";

import {
  REQUESTS_QUERY,
  ACCEPT_REQUEST_QUERY,
  USERS_IN_TEAMS_QUERY,
  REJECT_REQUEST,
  ADD_NOTIFICATION_QUERY,
  TEAM_IN_ORG_QUERY
} from "@/graphql/queries";

export default {
  data() {
    return {
      isShowAlert: false, // Для показа уведомления об удалении
      message: "", // Для текста сообщения в уведомлении
      teamId: this.$route.params.id,
      name: ""
    };
  },

  apollo: {
    // Массив заявок команды
    requests: {
      query: REQUESTS_QUERY,
      variables() {
        return {
          teamId: this.teamId
        };
      }
    },
    // Массив участников команды
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.teamId
        };
      }
    },
    // Массив команд организации
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
    RequestsItem,
    Minialert
  },

  methods: {
    // Метод для принятия участника в команду
    toAccept(id, userId) {
      this.$apollo
        .mutate({
          mutation: ACCEPT_REQUEST_QUERY,
          variables: {
            id
          },
          update: cache => {
            // Записываем массив заявок
            let data = cache.readQuery({
              query: REQUESTS_QUERY,
              variables: {
                teamId: this.teamId
              }
            });
            // Записываем массив участников команды
            let data_user = cache.readQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: {
                teamId: this.teamId
              }
            });
            // Меняем статус заявки
            data.requests.find(el => el.id === id).status = "Принят";
            let index = data.requests.findIndex(el => el.id == id);
            // Добавляем заявку с измененным статусом в массив участников команды
            data_user.usersInTeams.push(data.requests.find(el => el.id === id));
            // Удаляем заявку с измененным статусом из массива заявок
            data.requests.splice(index, 1);
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
          this.message = "Участник принят в команду " + this.name;
          console.log(data);
        })
        .catch(error => {
          // Записываем в переменную текст уведомления
          this.message = "Ошибка " + error;
          console.error(error);
        });
      this.$apollo
        .mutate({
          mutation: ADD_NOTIFICATION_QUERY,
          variables: {
            body: {
              header: "Заявка принята",
              text: "Ваша заявка в команду " + this.name + " принята!"
            },
            authorId: 1,
            teamId: +this.$route.params.id,
            forAllUsers: +userId
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    // Метод для отклонения заявки
    toReject(id, userId) {
      this.$apollo
        .mutate({
          mutation: REJECT_REQUEST,
          variables: {
            id
          },
          update: cache => {
            // Записываем массив заявок
            let data = cache.readQuery({
              query: REQUESTS_QUERY,
              variables: {
                teamId: this.teamId
              }
            });
            // Меняем статус заявки
            data.requests.find(el => el.id === id).status = "Отклонен";
            let index = data.requests.findIndex(el => el.id == id);
            // Удаляем заявку с измененным статусом из массива заявок
            data.requests.splice(index, 1);
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
          this.message = "Заявка в команду " + this.name + " отклонена";
          console.log(data);
        })
        .catch(error => {
          // Записываем в переменную текст уведомления
          this.message = "Ошибка " + error;
          console.error(error);
        });
      this.$apollo
        .mutate({
          mutation: ADD_NOTIFICATION_QUERY,
          variables: {
            body: {
              header: "Заявка отклонена",
              text: "Ваша заявка в команду " + this.name + " отклонена"
            },
            authorId: 1,
            teamId: +this.$route.params.id,
            forAllUsers: +userId
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
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
form {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

form input,
textarea {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

form button {
  padding: 0.5rem;
}
</style>
