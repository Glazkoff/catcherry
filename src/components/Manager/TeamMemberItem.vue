<template>
  <div class="user">
    <img src="@/assets/avatar.jpg" alt="photo" class="bigAvatar" />
    <div>
      <p>{{ userInTeam.user.name }} {{ userInTeam.user.surname }}</p>
      <p>{{ userInTeam.status }}</p>
    </div>
    <button type="submit" class="btn btn-link" @click="showModal = true">
      Подробнее
    </button>
    <Popup
      v-if="showModal"
      @close="showModal = false"
      :userInTeam="userInTeam"
      @del="$emit('delete', userInTeam.id)"
    />
  </div>
</template>

<script>
import Popup from "@/components/Manager/Popup.vue";
export default {
  props: ["userInTeam"], // Переданный участник команды
  data() {
    return {
      showModal: false
    };
  },
  components: {
    Popup
  }
};
</script>

<style lang="scss" scoped>
.user {
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px gray;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

p {
  margin: 10px 20px;
}

.bigAvatar {
  height: 100px;
  border-radius: 50px;
}
</style>
