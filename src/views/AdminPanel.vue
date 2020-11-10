<template>
    <div class="adminPanel">
        <div class="leftMenu">
            <router-link class="a" to="/admin">Статистика системы</router-link>
            <router-link class="a" to="/admin/users">Список пользователи</router-link>
            <router-link to="/admin/organization">Список организаций</router-link>
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