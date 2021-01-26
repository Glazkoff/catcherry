<template>
  <div class="container">
    <div class="row" v-if="this.$apollo.queries.usersInTeams.loading">
      <div class="col-12" wrapOfLoader>
        <loader></loader>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12">
        <breadcrumbs></breadcrumbs>
      </div>
      <div class="col-12">
        <div v-for="user in usersInTeams" :key="user.id" class="card">
          <div class="card_img">
            <img src="~@/assets/avatar.jpg" />
          </div>
          <p class="col-8">
            {{ user.user.surname }} {{ user.user.name }}<br />{{
              user.user.patricity
            }}
          </p>
          <button
            class="btn btn-alternate col-3"
            @click="showFullInformation(user)"
          >
            Подробнее
          </button>
        </div>
      </div>
      <popup v-if="isShowModal">
        <h3 v-if="$apollo.loading">{{ $t("loading") }}...</h3>
        <h3 slot="header" v-if="!$apollo.loading">
          {{ $t("user") }} {{ fullName }}
        </h3>
        <div slot="exit" @click="cancelModal()">×</div>
        <div slot="body" v-if="!$apollo.loading">
          <p>Фамилия: {{ user.surname }}</p>
          <p>Имя: {{ user.name }}</p>
          <p>Отчество: {{ user.patricity }}</p>
          <p>Пол: {{ user.gender }}</p>
          <p>Дата рождения: {{ $d(user.birthday, "short") }}</p>
          <p>Логин: {{ user.login }}</p>
          <p>{{ $t("numberOfPoints") }}: {{ getPointsUser.pointQuantity }}</p>
          <p>Роль: {{ role.name }}</p>
        </div>
        <div slot="footer" v-if="!$apollo.loading">
          <div class="btn-group">
            <button
              class="btn btn-danger"
              @click="exclude()"
              v-if="$store.getters.decodedToken.id != userId"
            >
              Исключить человека из команды
            </button>
            <button class="btn btn-alternate" @click="cancelModal()">
              Отмена
            </button>
          </div>
        </div>
      </popup>
      <minialert v-if="isShowAlertError">
        <p slot="title">
          {{ $t("minialertError") }}
        </p>
      </minialert>
      <minialert v-if="isShowAlert">
        <p slot="title">
          Вы успешно исключили человека из команды
        </p>
      </minialert>
    </div>
  </div>
</template>

<script>
import breadcrumbs from "@/components/BreadCrumbs.vue";
import loader from "@/components/Loader.vue";
import popup from "@/components/Popup.vue";
import Minialert from "@/components/MiniAlert.vue";
import {
  USERS_IN_TEAMS_QUERY,
  DELETE_IN_TEAMS_QUERY,
  ONE_USER_QUERY,
  GET_POINTS_USER_QUERY,
  ROLE_QUERY,
  CREATE_NOTIFICATION,
  TEAM_NAME_QUERY
} from "@/graphql/queries";

export default {
  data() {
    return {
      isShowAlert: false, // Для показа уведомления об удалении
      isShowAlertError: false,
      isShowModal: false,
      userId: -1,
      oneUser: {},
      roleId: -1
    };
  },

  apollo: {
    // Массив участников команды
    role: {
      query: ROLE_QUERY,
      variables() {
        return {
          id: this.roleId
        };
      }
    },
    oneTeam: {
      query: TEAM_NAME_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    },
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    },
    user: {
      query: ONE_USER_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          id: this.userId
        };
      }
    },
    getPointsUser: {
      query: GET_POINTS_USER_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          userId: this.userId
        };
      }
    }
  },

  components: {
    breadcrumbs,
    loader,
    popup,
    Minialert
  },
  methods: {
    showFullInformation(user) {
      this.isShowModal = true;
      this.oneUser = Object.assign({}, user);
      if (this.oneUser.user.surname === null) {
        this.oneUser.user.surname = "";
      }
      if (this.oneUser.user.name === null) {
        this.oneUser.user.name = "";
      }
      if (this.oneUser.user.patricity === null) {
        this.oneUser.user.patricity = "";
      }
      this.userId = this.oneUser.user.id;
      this.fullName = `${this.oneUser.user.surname} ${this.oneUser.user.name} ${this.oneUser.user.patricity}`;
      this.roleId = this.oneUser.roleId;
    },
    cancelModal() {
      this.isShowModal = false;
    },
    exclude() {
      this.$apollo
        .mutate({
          mutation: DELETE_IN_TEAMS_QUERY,
          variables: {
            id: this.userId
          },
          update: cache => {
            // Записываем в переменную массив участников команды
            let data = cache.readQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: {
                teamId: this.$route.params.id
              }
            });
            // Зписываем в переменную участника команды по id
            let index = data.usersInTeams.findIndex(el => el.id == this.userId);
            // Удаляем участника команды из массива
            data.usersInTeams.splice(index, 1);
            cache.writeQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: { teamId: this.$route.params.id },
              data
            });
          }
        })
        .then(() => {
          let notification = {
            body: {
              header: "Исключение из команды",
              text: `Вы были исключены из команды ${this.oneTeam.name}`
            },
            authorId: this.$store.getters.decodedToken.id,
            userId: [+this.oneUser.user.id],
            typeId: 20,
            endTime: new Date(new Date() + 365 * 24 * 60 * 60 * 1000)
          };
          this.$apollo
            .mutate({
              mutation: CREATE_NOTIFICATION,
              variables: {
                body: notification.body,
                authorId: notification.authorId,
                typeId: notification.typeId,
                endTime: notification.endTime,
                userId: notification.userId
              }
            })
            .then(data => {
              this.isShowModal = false;
              console.log(data);
              this.isShowAlert = true;
              setTimeout(() => {
                this.isShowAlert = false;
              }, 3000);
            })
            .catch(error => {
              console.error(error);
              this.isShowAlertError = true;
              setTimeout(() => {
                this.isShowAlertError = false;
              }, 3000);
            });
        })
        .catch(error => {
          // Записываем в переменную текст уведомления
          console.error(error);
          this.isShowAlertError = true;
          setTimeout(() => {
            this.isShowAlertError = false;
          }, 3000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
</style>
