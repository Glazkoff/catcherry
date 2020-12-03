<template>
  <div>
    <div class="card">
      <img src="@/assets/avatar.jpg" alt="photo" class="big_avatar" />
      <h3>{{ request.user.name }}</h3>
      <button type="submit" @click="showModal = true" class="btn btn-alternate">
        Подробнее
      </button>
    </div>
    <popup v-if="showModal">
      <div slot="header">
        Заявка в команду
      </div>
      <button
        slot="exit"
        class="modal-default-button"
        @click="showModal = false"
      >
        &times;
      </button>
      <div slot="body" class="profile-popup-body">
        <img src="@/assets/avatar.jpg" alt="photo" class="big_popup_avatar" />
        <div>
          <h2>{{ request.user.name }}</h2>
          <h2>{{ request.user.surname }}</h2>
          <h2>{{ request.user.patricity }}</h2>
          <div>
            <p>Пол:</p>
            <p>Дата рождения:</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="popup-footer">
        <button
          class="btn btn-primary"
          @click="$emit('accept', request.id, request.user.id)"
        >
          Принять
        </button>
        <button
          class="btn btn-alternate"
          @click="$emit('reject', request.id, request.user.id)"
        >
          Отклонить
        </button>
      </div>
    </popup>
  </div>
</template>

<script>
import popup from "@/components/Popup.vue";
export default {
  props: ["request"], // переданная заявка
  data() {
    return {
      showModal: false
    };
  },
  components: {
    popup
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";

.card {
  padding-right: 20px;
  .btn-alternate {
    margin-left: auto;
    margin-right: 60px;
  }
}

h3 {
  margin-left: 40px;
}

.big_avatar {
  height: 70px;
  border-radius: 35px;
  margin: 20px;
  border: 2px solid $bright_violet;
}

.big_popup_avatar {
  height: 150px;
  border-radius: 75px;
  margin: 60px;
  border: 2px solid $bright_violet;
}
.modal-default-button {
  border: 0;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
}
.profile-popup-body {
  display: flex;
}

.popup-footer {
  display: flex;
  justify-content: space-between;
}
</style>
