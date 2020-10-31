<template>
  <div class="account-view">
    <h1>Список заявок на вступление в команду</h1>
    <div v-for="request in oneUserInTeams" :key="request.id">
      <div class="result_card">
        <h4>Заявка на вступление в команду {{ request.teamId }}</h4>
        <span>Номер: {{request.id}}</span><br />
        <span>Владелец: Иванов И.И.</span><br />
        <span>Статус: {{request.status }}</span
        ><br />
        <button class="btn" v-if="request.status === 'Не принят'">Отозвать</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ONE_USER_IN_TEAMS_QUERY
} from "@/graphql/queries";
export default {
  name: "ListRequest",
  data() {
    return {

    }
  },
  apollo: {
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
    checkStatus(status) {
      if (status === false) return "Отклонено";
      if (status === true) return "Одобрено";
      if (status === null) return "На рассмотрении";
    },
  },
};
</script>

<style>
.result_card {
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px #868686;
}</style>
