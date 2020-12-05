<template>
  <div>
    <div class="card" v-if="request.user">
      <img src="@/assets/avatar.jpg" alt="photo" class="big_avatar" />
      <h3>{{ request.user.name }} {{ request.user.surname }} {{ request.user.patricity }}</h3>
      <button type="submit" @click="showModal = true" class="btn btn-alternate">
        {{ $t("more") }}
      </button>
      <button
          class="btn btn-alert"
          @click="$emit('reject', request.id, request.user.id)"
        >
          Отклонить
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
          <h2>{{ request.user.surname }}</h2>
          <h2>{{ request.user.name }}</h2>
          <h2>{{ request.user.patricity }}</h2>
          <div class="profile-popup-body">
            <p class="marginR">{{ $t("gender") }}: {{ request.user.gender }}</p>
            <p>
              {{ $t("birthday") }}:
              {{ $d(request.user.birthday) }}
            </p>
          </div>
        </div>
      </div>
      <div slot="footer" class="popup-footer">
        <button
          class="btn btn-primary"
          @click="$emit('accept', request.id, request.user.id)"
        >
          {{ $t("accept") }}
        </button>
        <button
          class="btn btn-alternate"
          @click="$emit('reject', request.id, request.user.id)"
        >
          {{ $t("reject") }}
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
.marginR {
  margin-right: 6rem;
}
</style>
