<template>
  <div>
    <h1>Добро пожаловать в Административную панель!</h1>
    <h2>Статистика системы</h2>
    <MyChart></MyChart>
  </div>
</template>

<script>
import MyChart from "@/components/admin/MyChart.vue";

export default {
  components: { MyChart },
};
</script>

<style lang="scss" scoped></style>
