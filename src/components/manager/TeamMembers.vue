<template>
  <div class="container">
    usersInTeams {{ usersInTeams }} usersInTeams
    <div class="row">
      <div class="col-12">
        <BreadCrumbs></BreadCrumbs>
      </div>
    </div>
    <div class="wrapOfLoader" v-if="$apollo.queries.loading">
      <Loader></Loader>
    </div>
    <div class="row" v-else>
      <div class="col-12">
        <input
          v-model.trim="findString"
          type="text"
          :placeholder="$t('placeholderSearchByUsers')"
          class="form-control block find dark"
        />
        <div v-for="user in filterUser" :key="user.id" class="card">
          <div class="card_img">
            <img src="~@/assets/avatar.jpg" />
          </div>
          <div class="col-8">
            <p>
              {{ user.user.surname }} {{ user.user.name
              }}{{ user.user.patricity }}
            </p>
            <p>{{ user.role.name }}</p>
          </div>
          <button
            class="btn btn-alternate col-3"
            @click="showFullInformation(user)"
          >
            {{ $t("more") }}
          </button>
        </div>
        <div>
          <Stub>
            <p slot="body">{{ $t("noSearch") }}</p>
          </Stub>
        </div>
      </div>
    </div>
    <Popup v-if="isShowModal">
      <div v-if="$apollo.queries.user.loading">
        <p>Загрузка...</p>
      </div>
      <div v-else>
        <h3 slot="header">{{ $t("user") }} {{ fullName }}</h3>
        <div slot="exit" @click="cancelModal()">×</div>
        <div slot="body">
          <p>{{ $t("surname") }}: {{ user.surname }}</p>
          <p>{{ $t("name") }}: {{ user.name }}</p>
          <p>{{ $t("patricity") }}: {{ user.patricity }}</p>
          <p>{{ $t("gender") }}: {{ user.gender }}</p>
          <p>{{ $t("birthday") }}: {{ $d(user.birthday, "short") }}</p>
          <p>{{ $t("login") }}: {{ user.login }}</p>
          <p>{{ $t("numberOfPoints") }}: {{ getPointsUser.pointQuantity }}</p>
          <p>{{ $t("role") }}: {{ oneUser.role.name }}</p>
        </div>
        <div slot="footer">
          <div class="btn-group">
            <button
              class="btn btn-danger"
              @click="exclude()"
              v-if="$store.getters.decodedToken.id != userId"
            >
              {{ $t("team.removeUserFromTeam") }}
            </button>
            <button class="btn btn-alternate" @click="cancelModal()">
              {{ $t("cancel") }}
            </button>
          </div>
        </div>
      </div>
    </Popup>
    <Minialert v-if="isShowAlertError">
      <p slot="title">
        {{ $t("minialertError") }}
      </p>
    </Minialert>
    <Minialert v-if="isShowAlert">
      <p slot="title">
        {{ $t("team.youHaveSuccessfullyRemovedPersonFromTheTeam") }}
      </p>
    </Minialert>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import Minialert from "@/components/MiniAlert.vue";
import Stub from "@/components/Stub.vue";
import Loader from "@/components/Loader.vue";
import Popup from "@/components/Popup.vue";
import {
  USERS_IN_TEAMS_QUERY,
  CHANGE_STATUS_REQUEST_QUERY,
  ONE_USER_QUERY,
  GET_POINTS_USER_QUERY,
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
      roleId: -1,
      findString: ""
    };
  },

  apollo: {
    // Название команды для оповещения
    oneTeam: {
      query: TEAM_NAME_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    },
    // Информация о пользователи в команде
    usersInTeams: {
      query: USERS_IN_TEAMS_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      },
      error(error) {
        this.queryError = JSON.stringify(error.message);
      }
    },
    // Подробная информация о пользователи
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
    // Получение количества баллов
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
    Minialert,
    BreadCrumbs,
    Stub,
    Loader,
    Popup
  },
  methods: {
    // Показать попап с подробной информацией
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
    },
    // Закрыть попап с поднобной информацией
    cancelModal() {
      this.isShowModal = false;
    },
    // Исключить пользователя из команды
    exclude() {
      console.log(this.oneUser);
      this.$apollo
        .mutate({
          mutation: CHANGE_STATUS_REQUEST_QUERY,
          variables: {
            id: this.oneUser.id,
            status: "Reject"
          },
          // Обновляем кеш
          update: cache => {
            let data = cache.readQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: {
                teamId: this.$route.params.id
              }
            });
            let index = data.usersInTeams.findIndex(
              el => el.user.id == this.userId
            );
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
          // Новое оповещение
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
          // Создание нового оповещения в случае уисключения
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
          console.error(error);
          this.isShowAlertError = true;
          setTimeout(() => {
            this.isShowAlertError = false;
          }, 3000);
        });
    }
  },
  computed: {
    // Фильтрация пользователей
    filterUser() {
      if (this.findString !== "") {
        // Ищем по фамилии, имени и отчеству
        return this.usersInTeams.filter(el => {
          if (el.user.surname === undefined || el.user.surname === null) {
            el.user.surname = " ";
          }
          if (el.user.name === undefined || el.user.name === null) {
            el.name = " ";
          }
          if (el.user.patricity === undefined || el.user.patricity === null) {
            el.user.patricity = " ";
          }
          return (
            (el.user.surname
              .toLowerCase()
              .indexOf(this.findString.toLowerCase()) !== -1 &&
              el.user.surname !== "") ||
            (el.user.name
              .toLowerCase()
              .indexOf(this.findString.toLowerCase()) !== -1 &&
              el.user.name !== "") ||
            (el.user.patricity
              .toLowerCase()
              .indexOf(this.findString.toLowerCase()) !== -1 &&
              el.user.patricity !== "")
          );
        });
      } else {
        return this.usersInTeams;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_grid.scss";
.wrapOfLoader {
  overflow: hidden;
  background: $dark_blue;
  z-index: 99999;
  width: 100%;
  height: 40vh;
  padding-top: calc(20vh - 100px);
  position: relative;
}
</style>
