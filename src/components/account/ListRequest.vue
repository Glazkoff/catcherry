<template>
  <div class="account-view">
    <h1>Список заявок на вступление в команду</h1>
    <!-- вывод массива поданных заявок  -->
    <div v-for="request in oneUserInTeams" :key="request.id">
      <div class="result_card">
        <h4>Заявка на вступление в команду {{ request.team.name }}</h4>
        <span>Организация: {{ request.team.organization.name }}</span
        ><br />
        <span>Номер заявки: {{ request.id }}</span
        ><br />
        <span>Статус: {{ request.status }}</span
        ><br />
        <button
          class="btn"
          v-if="request.status === 'Не принят'"
          @click="deleteRequest(request.id)"
        >
          Отозвать
        </button>
      </div>
    </div>
    <!-- всплывающее информационное окошко  -->
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">Заявка в организацию отменена</p></minialert
    >
  </div>
</template>

<script>
import {
  DELETE_IN_TEAMS_QUERY,
  ONE_USER_IN_TEAMS_QUERY
} from "@/graphql/queries";
import minialert from "@/components/MiniAlert.vue";
export default {
  name: "ListRequest",
  components: { minialert },
  data() {
    return {
      isShowAlertDelete: false
    };
  },
  apollo: {
    // массив данных о пользователе в команде
    oneUserInTeams: {
      query: ONE_USER_IN_TEAMS_QUERY,
      variables() {
        return {
          userId: this.$route.params.id
        };
      }
    }
  },
  methods: {
    // метод отмены заявки, поданной в команду организации
    deleteRequest(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_IN_TEAMS_QUERY,
          variables: {
            id: id
          },
          update: cache => {
            let data = cache.readQuery({
              query: ONE_USER_IN_TEAMS_QUERY,
              variables: { userId: this.$route.params.id }
            });
            let index = data.oneUserInTeams.findIndex(el => el.id == id);
            data.oneUserInTeams.splice(index, 1);
            cache.writeQuery({ query: ONE_USER_IN_TEAMS_QUERY, data });
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      this.isShowAlertDelete = true;
      setTimeout(() => {
        this.isShowAlertDelete = false;
      }, 3000);
    }
  }
};
</script>

<style>
.result_card {
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px #868686;
}
</style>
