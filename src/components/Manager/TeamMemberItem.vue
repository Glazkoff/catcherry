<template>
<div class="user">
  <img src="" alt="photo">
  <p>{{userInTeam.user.name}}</p>
  <p>{{userInTeam.status}}</p>
  <button type="submit" @click="showModal = true">Удалить участника</button>
  <Popup v-if="showModal" @close="showModal = false" :userInTeam="userInTeam" @del="$emit('delete', userInTeam.id)" />

</div>
</template>

<script>
import Popup from "@/components/Manager/Popup.vue";
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
