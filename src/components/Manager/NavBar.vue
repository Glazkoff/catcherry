<template>
<nav>
    <p>
        <router-link to="/manager/team_members">Участники</router-link>
    </p>
    <p>
        <router-link to="">Заявки на вхождение</router-link>
    </p>
    <p>
        <router-link to="">Редактирование</router-link>
    </p>
</nav>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
nav {
    margin: 1rem;
    margin-right: 5rem;
}

nav p {
    background-color: wheat;
    margin: 0;
    border: 1px solid rgb(247, 77, 77);
    padding: 1rem;
}
</style>
