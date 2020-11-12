<template>
  <div>
    <h1><i18n path="adminPanel">{{ $t("adminPanel") }}</i18n></h1>
    <h2><i18n path="systemStatistics">{{ $t("systemStatistics") }}</i18n></h2>
    <MyChart></MyChart>
  </div>
</template>

<script>
import MyChart from "@/components/admin/MyChart.vue";

export default {
  components: { MyChart }
};
</script>

<style lang="scss" scoped></style>
