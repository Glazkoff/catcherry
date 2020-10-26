<template>
<div class="user">
  <img src="" alt="photo">
  <div>
    <p>{{request.name}}</p>
    <p>{{request.name}}</p>
    <p>{{request.name}}</p>
  </div>
  <button type="submit" @click="showModal = true">Подробнее</button>
  <PopupRequest v-if="showModal" @close="showModal = false" :request="request" />
</div>
</template>

<script>
import PopupRequest from "@/components/Manager/PopupRequest";
export default {
  props: ['request'],
  data() {
    return {
      showModal: false,
    }

  },
  components: {
    PopupRequest,
  },
}
</script>

<style lang="scss" scoped>
.user {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
