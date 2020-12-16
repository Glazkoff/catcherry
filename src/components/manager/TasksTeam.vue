<template>
  <div class="aaa">
    <breadcrumbs></breadcrumbs>
    <div class="wrapOfLoader" v-if="$apollo.loading"><loader></loader></div>
    <minialert v-if="queryError">
      <p slot="title">{{ queryError }}</p>
    </minialert>
    <div v-if="!$apollo.loading">
      <h2>Бэклог заданий</h2>
      <p v-if="backlog.length === 0">Нет задач в бэклоге</p>
      <div v-for="task in backlog" :key="task.id" class="task">
        <h3>{{ task.body.header }}</h3>
        <p>{{ task.id }}</p>
        <div class="task_body">
          <p>{{ task.body.text }}</p>
          <div :class="{ task_body_user: task.tasksUser !== null }">
            <img v-if="task.tasksUser !== null" src="@/assets/avatar.jpg" />
            <div>
              <p>Награда: +{{ task.body.points }} баллов</p>
              <p v-if="task.tasksUser === null">Ответственный: не назначен</p>
              <p v-if="task.tasksUser !== null">
                Ответственный: {{ task.tasksUser.name }}
                {{ task.tasksUser.surname }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2>Готовые задания на проверку</h2>
      <p v-if="toCheck.length === 0">Нет готовых задач на проверку</p>
      <div v-for="task in toCheck" :key="task.id" class="task">
        <h3>{{ task.body.header }}</h3>
        <div class="task_body">
          <p>{{ task.body.text }}</p>
          <div>
            <div class="task_body_user">
              <img v-if="task.tasksUser !== null" src="@/assets/avatar.jpg" />
              <div>
                <p>Награда: +{{ task.body.points }} баллов</p>
                <p v-if="task.tasksUser !== null">
                  Ответственный: {{ task.tasksUser.name }}
                  {{ task.tasksUser.surname }}
                </p>
              </div>
            </div>
            <button class="btn btn-alternate" @click="creditPoints(task)">
              Зачесть баллы
            </button>
            <button class="btn btn-alternate" @click="sendForRevision(task)">
              Отправить на доработку
            </button>
          </div>
        </div>
      </div>
      <h2>Завершенные задачи</h2>
      <p v-if="done.length === 0">Нет завершенных задач</p>
      <div v-for="task in done" :key="task.id" class="task">
        <h3>{{ task.body.header }}</h3>
        <div class="task_body">
          <p>{{ task.body.text }}</p>
          <div>
            <div class="task_body_user">
              <img v-if="task.tasksUser !== null" src="@/assets/avatar.jpg" />
              <div>
                <p>Награда: +{{ task.body.points }} баллов</p>
                <p v-if="task.tasksUser !== null">
                  Ответственный: {{ task.tasksUser.name }}
                  {{ task.tasksUser.surname }}
                </p>
              </div>
            </div>
            <button class="btn btn-alternate" @click="deleteTask(task)">
              Удалить задачу
            </button>
          </div>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlert">
      <p slot="title">
        Вы успешно зачислили баллы пользователю
      </p>
    </minialert>
    <minialert v-if="isShowAlertError">
      <p slot="title">
        {{ $t("minialertError") }}
      </p>
    </minialert>
    <minialert v-if="isShowAlertDelete">
      <p slot="title">
        Вы успешно удалили задачу
      </p>
    </minialert>
    <minialert v-if="isShowAlertSendForRevision">
      <p slot="title">
        Вы успешно вернули задачу на доработку
      </p>
    </minialert>
  </div>
</template>

<script>
import minialert from "@/components/MiniAlert.vue";
import Loader from "@/components/Loader.vue";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import {
  ALL_TASKS_QUERY,
  EDIT_TASK_QUERY,
  CARGE_POINTS_QUERY,
  DELETE_TASK_QUERY,
  ADD_NOTIFICATION_QUERY
} from "@/graphql/queries";

export default {
  components: { minialert, Loader, breadcrumbs },
  apollo: {
    // массив задач с назначенными ответственными
    allTasks: {
      query: ALL_TASKS_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    }
  },
  data() {
    return {
      queryError: "",
      isShowAlert: false,
      isShowAlertError: false,
      addTask: false,
      userId: 1,
      header: "",
      text: "",
      status: "",
      points: 10,
      isShowAlertPoints: false,
      isShowAlertDelete: false,
      isShowAlertSendForRevision: false
    };
  },
  methods: {
    // изменение статуса задания
    creditPoints(task) {
      this.$apollo
        .mutate({
          mutation: CARGE_POINTS_QUERY,
          variables: {
            pointAccountId: +task.tasksUser.id,
            delta: +task.body.points,
            operationDescription: `За выполненное задание ${task.body.header}`
          }
        })
        .then(data => {
          console.log(data);
          this.$apollo
            .mutate({
              mutation: EDIT_TASK_QUERY,
              variables: {
                id: task.id,
                status: "Готово"
              },
              update: cache => {
                let data = cache.readQuery({
                  query: ALL_TASKS_QUERY,
                  variables: { teamId: this.$route.params.id }
                });
                data.allTasks.find(el => el.id === task.id).status = "Готово";
                cache.writeQuery({
                  query: ALL_TASKS_QUERY,
                  variables: { teamId: this.$route.params.id },
                  data
                });
              }
            })
            .then(data => {
              console.log(data);
              let notification = {
                body: {
                  header: "Начисление баллов",
                  text: `Вам было начислено ${task.body.points} балла(ов) за выполнение задания "${task.body.header}"`
                },
                authorId: this.$store.getters.decodedToken.id,
                teamId: this.$route.params.id,
                forAllUsers: task.tasksUser.id
              };
              this.$apollo
                .mutate({
                  mutation: ADD_NOTIFICATION_QUERY,
                  variables: {
                    body: notification.body,
                    authorId: notification.authorId,
                    teamId: +notification.teamId,
                    forAllUsers: +notification.forAllUsers
                  }
                })
                .then(data => {
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
        })
        .catch(error => {
          console.error(error);
          this.isShowAlertError = true;
          setTimeout(() => {
            this.isShowAlertError = false;
          }, 3000);
        });
    },
    sendForRevision(task) {
      this.$apollo
        .mutate({
          mutation: EDIT_TASK_QUERY,
          variables: {
            id: task.id,
            status: "Запланировано"
          },
          update: cache => {
            let data = cache.readQuery({
              query: ALL_TASKS_QUERY,
              variables: { teamId: this.$route.params.id }
            });
            data.allTasks.find(el => el.id === task.id).status =
              "Запланировано";
            cache.writeQuery({
              query: ALL_TASKS_QUERY,
              variables: { teamId: this.$route.params.id },
              data
            });
          }
        })
        .then(data => {
          console.log(data);
          this.isShowAlertSendForRevision = true;
          setTimeout(() => {
            this.isShowAlertSendForRevision = false;
          }, 3000);
        })
        .catch(error => {
          console.error(error);
          this.isShowAlertError = true;
          setTimeout(() => {
            this.isShowAlertError = false;
          }, 3000);
        });
    },
    deleteTask(task) {
      this.$apollo
        .mutate({
          mutation: DELETE_TASK_QUERY,
          variables: {
            id: task.id
          },
          update: cache => {
            let data = cache.readQuery({
              query: ALL_TASKS_QUERY,
              variables: { teamId: this.$route.params.id }
            });
            let index = data.allTasks.findIndex(el => el.id == task.id);
            data.allTasks.splice(index, 1);
            cache.writeQuery({
              query: ALL_TASKS_QUERY,
              variables: { teamId: this.$route.params.id },
              data
            });
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
    }
  },
  computed: {
    backlog() {
      return this.allTasks.filter(el => {
        return el.status === "Запланировано";
      });
    },
    toCheck() {
      return this.allTasks.filter(el => {
        return el.status === "На проверке";
      });
    },
    done() {
      return this.allTasks.filter(el => {
        return el.status === "Готово";
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
.aaa {
  padding: 3%;
}
.task {
  padding: 1%;
  background: $violet;
  margin-bottom: 1rem;
  border-radius: 10px;
  .btn {
    margin-top: 5%;
  }
  &_body {
    display: grid;
    grid-template-columns: 60% 30%;
    grid-column-gap: 10%;
    div {
      align-self: start;
      p {
        color: $gray_4;
        font-size: 16px;
        line-height: 18px;
        padding: 0;
        margin: 0;
      }
    }
    &_user {
      display: flex;
      align-items: center;
      img {
        width: 15%;
        border-radius: 100%;
        margin-right: 5%;
      }
    }
  }
}
.wrapOfLoader {
  position: relative;
  overflow: hidden;
  background: $dark_blue;
  z-index: 99999;
  width: 100%;
  height: 40vh;
  padding-top: calc(20vh - 100px);
}
</style>
