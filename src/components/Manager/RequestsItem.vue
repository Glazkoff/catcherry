<template>
  <div class="user">
    <img src="@/assets/avatar.jpg" alt="photo" class="bigAvatar" />
    <p>{{ request.user.name }}</p>
    <p>{{ request.status }}</p>
    <button type="submit" @click="showModal = true" class="btn btn-secondary">
      Подробнее
    </button>
    <popup v-if="showModal" @close="showModal = false">
      <h3 slot="header">
        Заявка в команду
        <button class="modal-default-button" @click="$emit('close')">
          &times;
        </button>
      </h3>
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
.user {
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px gray;
  display: flex;
}

p {
  margin: 10px 20px;
}

.bigAvatar {
  height: 100px;
  border-radius: 50px;
}
</style>
