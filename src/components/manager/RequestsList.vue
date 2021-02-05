<template>
  <div class="container">
    <div class="row" v-if="this.$apollo.loading">
      <div class="col-12 wrapOfLoader">
        <loader></loader>
      </div>
    </div>
    <div class="row" v-if="!this.$apollo.loading">
      <div class="col-12">
        <breadcrumbs></breadcrumbs>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div v-if="requests.length == 0">
          <Stub>
            <p slot="body">{{ $t("team.noNewRequest") }}</p>
          </Stub>
        </div>
        <div v-if="requests.length != 0">
          <input
            v-model.trim="findString"
            type="text"
            :placeholder="$t('placeholderSearchByUsers')"
            class="form-control block find dark"
          />
          <div v-for="user in filterUser" :key="user.id" class="card row">
            <div class="card_img">
              <img src="~@/assets/avatar.jpg" />
            </div>
            <p class="col-5">
              {{ user.user.surname }} {{ user.user.name }}<br />{{
                user.user.patricity
              }}
            </p>
            <button class="btn btn-alternate col-3" @click="accept(user)">
              {{ $t("team.accept") }}
            </button>
            <button class="btn btn-danger col-3" @click="reject(user)">
              {{ $t("team.reject") }}
            </button>
          </div>
          <div v-if="filterUser.length == 0">
            <p>{{ $t("noSearch") }}</p>
          </div>
        </div>
      </div>
      <minialert v-if="isShowAlertError">
        <p slot="title">
          {{ $t("minialertError") }}
        </p>
      </minialert>
      <minialert v-if="isShowAlertAdd">
        <p slot="title">
          {{ $t("team.youHaveSuccessfullyAddedTheUserToTheTeam") }}
        </p>
      </minialert>
      <minialert v-if="isShowAlertDelete">
        <p slot="title">
          {{
            $t("team.youHaveSuccessfullyDeclinedYourRequestToBeAddedToTheTeam")
          }}
        </p>
      </minialert>
    </div>
  </div>
</template>

<script>
import Minialert from "@/components/MiniAlert.vue";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import loader from "@/components/Loader.vue";
// import Stub from "@/components/Stub.vue";

import {
  REQUESTS_QUERY,
  CHANGE_STATUS_REQUEST_QUERY,
  USERS_IN_TEAMS_QUERY,
  CREATE_NOTIFICATION,
  TEAM_NAME_QUERY
} from "@/graphql/queries";

export default {
  data() {
    return {
      isShowAlertError: false,
      isShowAlertAdd: false,
      isShowAlertDelete: false,
      findString: ""
    };
  },

  apollo: {
    // Массив заявок команды
    requests: {
      query: REQUESTS_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    },
    // Название команды
    oneTeam: {
      query: TEAM_NAME_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  components: {
    Minialert,
    breadcrumbs,
    loader,
    // Stub
  },
  methods: {
    // Принять заявку на вступление в команду
    accept(user) {
      this.$apollo
        .mutate({
          mutation: CHANGE_STATUS_REQUEST_QUERY,
          variables: {
            id: user.id,
            status: "Принят"
          },
          // Обновление кеша
          update: cache => {
            let data = cache.readQuery({
              query: REQUESTS_QUERY,
              variables: {
                teamId: this.$route.params.id
              }
            });
            let index = data.requests.findIndex(el => el.id === user.id);
            data.requests.splice(index, 1);
            cache.writeQuery({
              query: REQUESTS_QUERY,
              variables: { teamId: this.$route.params.id },
              data
            });
            data = cache.readQuery({
              query: USERS_IN_TEAMS_QUERY,
              variables: {
                teamId: this.$route.params.id
              }
            });
            user.status = "Принят";
            data.usersInTeams.push(user);
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
              header: "Добавление в команду",
              text: `Вы были добавлены в команду ${this.oneTeam.name}`
            },
            authorId: this.$store.getters.decodedToken.id,
            userId: [+user.user.id],
            typeId: 20,
            endTime: new Date(new Date() + 365 * 24 * 60 * 60 * 1000)
          };
          // Создание нового оповещения о вступлении в команду
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
              console.log(data);
              this.isShowAlertAdd = true;
              setTimeout(() => {
                this.isShowAlertAdd = false;
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
          this.isShowAlertError = true;
          setTimeout(() => {
            this.isShowAlertError = false;
          }, 3000);
          console.error(error);
        });
    },
    // Отказать на вступление в команду
    reject(user) {
      this.$apollo
        .mutate({
          mutation: CHANGE_STATUS_REQUEST_QUERY,
          variables: {
            id: user.id,
            status: "Отклонен"
          },
          // Обновление кеша
          update: cache => {
            let data = cache.readQuery({
              query: REQUESTS_QUERY,
              variables: {
                teamId: this.$route.params.id
              }
            });
            let index = data.requests.findIndex(el => el.id === user.id);
            data.requests.splice(index, 1);
            cache.writeQuery({
              query: REQUESTS_QUERY,
              variables: { teamId: this.$route.params.id },
              data
            });
          }
        })
        .then(() => {
          // Новое оповещение
          let notification = {
            body: {
              header: "Отказ от добавления",
              text: `Вам было отказано от добавления в команду ${this.oneTeam.name}`
            },
            authorId: this.$store.getters.decodedToken.id,
            userId: [+user.user.id],
            typeId: 20,
            endTime: new Date(new Date() + 365 * 24 * 60 * 60 * 1000)
          };
          // Создание оповещения об отказе о встеплении в команду
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
              console.log(data);
              this.isShowAlertDelete = true;
              setTimeout(() => {
                this.isShowAlertDelete = false;
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
          this.isShowAlertError = true;
          setTimeout(() => {
            this.isShowAlertError = false;
          }, 3000);
          console.error(error);
        });
    }
  },
  computed: {
    // Фильтрация пользователей
    filterUser() {
      if (this.findString !== "") {
        // Ищем по фамилии, имени и отчеству
        return this.requests.filter(el => {
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
        return this.requests;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
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
