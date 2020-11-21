<template>
  <div>
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
            <!-- отображение информации о просматриваемом пользователе  -->
            <div class="modal-body">
              <slot name="body">
                <div>
                  <img
                    src="@/assets/avatar.jpg"
                    alt="photo"
                    class="bigAvatar"
                  />
                </div>
                <div class="info">
                  <p>
                    ФИО: {{ userInTeam.user.surname }}
                    {{ userInTeam.user.name }}
                    {{ userInTeam.user.patricity }}
                  </p>
                  <p>Пол: {{ userInTeam.user.gender }}</p>
                  <div>
                    Дата рождения:
                    <span>
                      {{ $d(userInTeam.user.birthday) }}
                    </span>
                  </div>
                  <p>Логин: {{ userInTeam.user.login }}</p>
                  <p>
                    Баллы:
                    <b v-if="!getPointsUser.pointQuantity">Загрузка...</b>
                    <b v-else>{{ getPointsUser.pointQuantity }}</b>
                  </p>
                  <button @click="editPoints = true" v-if="!editPoints">
                    Управление баллами
                  </button>
                  <!-- форма для начисления или списания баллов  -->
                  <form v-if="editPoints" @submit.prevent="checkForm">
                    <label>Количество баллов</label
                    ><input
                      type="number"
                      v-model="addPoints"
                      class="form-control form-text"
                    />
                    <label>Описание</label
                    ><input
                      type="text"
                      v-model="operationDescription"
                      class="form-control form-text"
                    /><br />
                    <button
                      @click="toAddPoints(getPointsUser.id)"
                      class="btn btn-primary small"
                    >
                      Начислить
                    </button>
                  </form>
                </div>
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button
                  type="submit"
                  class="modal-avtive-button btn btn-link"
                  @click="$emit('del')"
                >
                  Удалить
                </button>
                <button
                  type="submit"
                  class="modal-default-button btn btn-secondary"
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
    <!-- всплывающее информационное окошко  -->
    <minialert v-if="isShowAlert"
      ><p slot="title">
        Участнику {{ userInTeam.user.surname }} начислено {{ addPoints }} баллов
      </p></minialert
    >
  </div>
</template>

<script>
import {
  GET_POINTS_QUERY,
  CARGE_POINTS_QUERY,
  ADD_NOTIFICATION_QUERY
} from "@/graphql/queries";
import minialert from "@/components/manager/MiniAlert.vue";
export default {
  props: ["userInTeam"],
  components: { minialert },
  apollo: {
    // массив получения баллов пользователя
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
      },
      editPoints: false,
      addPoints: 10,
      operationDescription: "",
      isShowAlert: false
    };
  },
  methods: {
    // метод начисления баллов пользователю
    toAddPoints(id) {
      this.editPoints = false;
      this.$apollo
        .mutate({
          mutation: CARGE_POINTS_QUERY,
          variables: {
            pointAccountId: parseInt(id),
            delta: parseInt(this.addPoints),
            operationDescription: this.operationDescription
          }
          // update: (cache, { data: { createPointOperation } }) => {
          //   let data = cache.readQuery({
          //     query: GET_POINTS_QUERY,
          //     variables: {userId: parseInt(this.userInTeam.user.id)}
          //   });
          //   data.createPointOperation.push(createPointOperation);
          //   cache.writeQuery({
          //     query: GET_POINTS_QUERY,
          //     data
          //   });
          // }
        })
        .then(data => {
          this.getPointsUser.pointQuantity =
            +this.getPointsUser.pointQuantity + +this.addPoints;
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      let str = "";
      let hdr = "";
      if (+this.addPoints > 0) {
        hdr = "Начисление";
        str = "Вам начислено ";
      } else {
        hdr = "Списание";
        str = "Со счета списано ";
      }
      this.$apollo
        .mutate({
          mutation: ADD_NOTIFICATION_QUERY,
          variables: {
            body: {
              header: hdr,
              text:
                str +
                this.addPoints +
                " баллов с пометкой: " +
                this.operationDescription
            },
            authorId: 1,
            teamId: +this.$route.params.id,
            forAllUsers: +this.userInTeam.user.id
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      this.isShowAlert = true;
      setTimeout(() => {
        this.isShowAlert = false;
      }, 3000);
    }
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
  display: flex;
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

form {
}
label {
  margin-right: 10px;
}
input[type="number"] {
  width: 80px;
}
.info {
  margin-left: 20px;
}
.bigAvatar {
  height: 100px;
  border-radius: 50px;
}
</style>
