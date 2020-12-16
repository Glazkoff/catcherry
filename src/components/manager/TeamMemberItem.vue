<template>
  <div>
    <div class="card">
      <div class="card_img">
        <img src="~@/assets/avatar.jpg" alt="photo" />
      </div>
      <div class="card_body_max">
        <p>
          {{ userInTeam.user.surname }} {{ userInTeam.user.name }}
          {{ userInTeam.user.patricity }}
        </p>
        <p>{{ userInTeam.status }}</p>
      </div>
      <div class="card_action_max">
        <button
          type="submit"
          class="btn btn-alternate block"
          @click="showModal = true"
        >
          Подробнее
        </button>
      </div>
    </div>
    <Popup
      v-if="showModal"
      @close="showModal = false"
      :userInTeam="userInTeam"
      @del="showModalConfirm = true"
    />

    <popup v-if="showModalConfirm" @close="showModalConfirm = false">
      <h3 slot="header">
        Вы действительно хотите удалить участника {{ userInTeam.user.name }}?
      </h3>
      <button slot="exit" @click="showModalConfirm = false">
        &times;
      </button>
      <div slot="footer">
        <button
          type="submit"
          class="modal-avtive-button"
          @click="$emit('delete', userInTeam.id)"
        >
          Да
        </button>
        <button
          type="submit"
          class="modal-default-button"
          @click="showModalConfirm = false"
        >
          Нет
        </button>
      </div>
    </popup>
  </div>
</template>

<script>
import Popup from "@/components/manager/Popup.vue";
import popup from "@/components/Popup.vue";
export default {
  props: ["userInTeam"], // Переданный участник команды
  data() {
    return {
      showModal: false,
      showModalConfirm: false
    };
  },
  components: {
    Popup,
    popup
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
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
