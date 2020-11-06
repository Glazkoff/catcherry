<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <button class="modal-default-button" @click="$emit('close')">
            &times;
          </button>
          <div class="modal-header">
            <slot name="header">
              <h3>Профиль участника</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <p>Фамилия: {{ userInTeam.user.surname }}</p>
              <p>Имя: {{ userInTeam.user.name }}</p>
              <p>Отчетсво: {{ userInTeam.user.patricity }}</p>
              <p>Пол: {{ userInTeam.user.gender }}</p>
              <p>
                Дата рождения:
                {{
                  new Date(userInTeam.user.birthday).toLocaleString("ru", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })
                }}
              </p>
              <p>Логин: {{ userInTeam.user.login }}</p>
              <p>
                Баллы:
                <b v-if="!getPointsUser.pointQuantity">Загрузка...</b>
                <b v-else>{{ getPointsUser.pointQuantity }}</b>
              </p>
              <img src="" alt="photo" />
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                type="submit"
                class="modal-avtive-button"
                @click="$emit('del')"
              >
                Удалить
              </button>
              <button
                type="submit"
                class="modal-default-button"
                @click="$emit('close')"
              >
                Отмена
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { GET_POINTS_QUERY } from "@/graphql/queries";
export default {
  props: ["userInTeam"],
  apollo: {
    getPointsUser: {
      query: GET_POINTS_QUERY,
      variables() {
        return {
          userId: parseInt(this.userInTeam.user.id)
        };
      }
    }
  },
  data() {
    return {
      userId: 1,
      getPointsUser: {
        pointQuantity: 0
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 60%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
}
.modal-body {
  margin: 20px 0;
}
.modal-footer {
  margin-bottom: 50px;
}
.modal-default-button {
  float: right;
}
.modal-avtive-button {
  float: left;
}
</style>
