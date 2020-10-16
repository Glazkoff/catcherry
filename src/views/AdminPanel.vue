<template>
    <div class="adminPanel">
        <div class="leftMenu">
            <router-link class="a" to="/admin"><i18n path="systemStatistics"><span place="title">{{ $t("listUser") }}</span></i18n></router-link>
            <router-link class="a" to="/admin/users"><i18n path="listUser"><span place="title">{{ $t("listUser") }}</span></i18n></router-link>
            <router-link to="/admin/organization"><i18n path="listOrganization"><span place="title">{{ $t("listUser") }}</span></i18n></router-link>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    * {
        box-sizing: border-box;
    }
    .adminPanel {
        display: flex;
        width: 100%;
        .leftMenu {
            width: 20%;
            padding: 1%;
            border-right: 1px solid black;
            .a {
                display: block;
            }
        }
        .main {
            width: 80%;
            padding: 1%;
            overflow-x: hidden;
        }
    }
</style>