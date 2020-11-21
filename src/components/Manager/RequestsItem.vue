<template>
  <div class="user">
    <img src="" alt="photo" />
    <p>{{ request.user.name }}</p>
    <p>{{ request.status }}</p>
    <button type="submit" @click="showModal = true">Подробнее</button>
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
  props: ["request"],
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
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
