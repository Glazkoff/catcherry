<template>
<div class="user">
    <img src="" alt="photo">
    <p>{{member.name}}</p>
    <button type="submit" @click="showModal = true">Удалить участника</button>
    <Popup v-if="showModal" @close="showModal = false" :member="member" />

</div>
</template>

<script>
import Popup from "@/components/Manager/Popup.vue";
export default {
    props: ['member'],
    data() {
        return {
            showModal: false,
        }

    },
    components: {
        Popup,
    }

}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    align-items: baseline;
    justify-content: space-evenly;
}
</style>
