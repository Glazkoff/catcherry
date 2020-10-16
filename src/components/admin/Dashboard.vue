<template>
    <div>
        <h1>Добро пожаловать в Административную панель!</h1>
        <h2><i18n path="systemStatistics"><span place="title">{{ $t("listUser") }}</span></i18n></h2>
        <MyChart></MyChart>
    </div>
</template>

<script>
    import MyChart from '@/components/admin/MyChart.vue'

    export default {
    components: { MyChart }
    }
</script>

<style lang="scss" scoped>

</style>