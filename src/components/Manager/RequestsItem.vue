<template>
  <div class="user">
    <img src="@/assets/avatar.jpg" alt="photo" class="bigAvatar" />
    <p>{{ request.user.name }}</p>
    <p>{{ request.status }}</p>
    <button type="submit" @click="showModal = true" class="btn btn-secondary">
      Подробнее
    </button>
    <PopupRequest
      v-if="showModal"
      @close="showModal = false"
      :request="request"
      @act="$emit('accept', request.id)"
    />
  </div>
</template>

<script>
import PopupRequest from "@/components/manager/PopupRequest";
export default {
  props: ["request"], // переданная заявка
  data() {
    return {
      showModal: false
    };
  },
  components: {
    PopupRequest
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
