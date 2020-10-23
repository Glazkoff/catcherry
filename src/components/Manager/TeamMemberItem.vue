<template>
<div class="user">
    <img src="" alt="photo">
    <p>{{userInTeam.status}}</p>
    <button type="submit" @click="showModal = true">Удалить участника</button>
    <Popup v-if="showModal" @close="showModal = false" :userInTeam="userInTeam" />

</div>
</template>

<script>
import Popup from "@/components/Manager/Popup.vue";
// import DELETE_IN_TEAMS_QUERY from "@/graphql/queries";

export default {
    props: ['userInTeam'],
    data() {
        return {
            showModal: false,
        }

    },
    components: {
        Popup,
    },

}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
}
</style>
