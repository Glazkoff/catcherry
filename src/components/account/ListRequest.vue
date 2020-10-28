<template>
  <div class="account-view">
    <h1>Список заявок на вступление в команду</h1>
    <div v-for="request in requests" :key="request.id">
      <div class="result_card">
        <h4>Заявка на вступление в команду {{ request.organization }}</h4>
        <span>Номер: 3535251</span><br />
        <span>Владелец: Иванов И.И.</span><br />
        <span>Статус: {{ checkStatus(request.status) }}</span
        ><br />
        <button class="btn" v-if="request.status === null">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListRequest",
  data() {
    return {
      requests: [
        { id: 1, organization: "FFFF", status: false },
        { id: 2, organization: "sss", status: null },
        { id: 3, organization: "FFgggFF", status: true },
      ],
    };
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

<style></style>
