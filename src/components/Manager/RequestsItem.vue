<template>
  <div class="card">
    <img src="@/assets/avatar.jpg" alt="photo" class="big_avatar" />
    <h3>{{ request.user.name }}</h3>
    <button type="submit" @click="showModal = true" class="btn btn-alternate">
      Подробнее
    </button>
    <popup v-if="showModal">
      <h3 slot="header">
        Заявка в команду
      </h3>
      <button
        slot="exit"
        class="modal-default-button"
        @click="showModal = false"
      >
        &times;
      </button>
      <div slot="body">
        <img src="" alt="photo" />
        <p>{{ request.user.name }}</p>
        <p>Пол:</p>
        <p>Дата рождения:</p>
      </div>
      <div slot="footer">
        <button
          type="submit"
          class="modal-avtive-button"
          @click="$emit('accept', request.id, request.user.id)"
        >
          Принять
        </button>
        <button
          type="submit"
          class="modal-default-button"
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
.btn {
  float: right;
}
h3 {
  margin-left: 40px;
}
p {
  margin: 10px 20px;
}

.big_avatar {
  height: 70px;
  border-radius: 35px;
  margin: 20px;
  border: 2px solid $bright_violet;
}
</style>
