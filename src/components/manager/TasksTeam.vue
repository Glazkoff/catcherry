<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <BreadCrumbs></BreadCrumbs>
      </div>
    </div>
    <div v-if="$apollo.loading" class="wrapOfLoader"><Loader></Loader></div>
    <div v-else>
      <div class="row">
        <div class="col-4">
          <h2 class="mb-4">{{ $t("task.backlogTask") }}</h2>
          <div v-if="backlog.length === 0">
            <Stub>
              <p slot="body">{{ $t("task.noTasksInTheBacklog") }}</p>
            </Stub>
          </div>
          <div v-for="task in backlog" :key="task.id" class="task">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h3 class="mb-2">{{ task.body.header }} ({{ task.id }})</h3>
                  <p>{{ task.body.text }}</p>
                </div>
              </div>
              <div class="row mb-4">
                <div>
                  <img
                    :class="{ 'col-2': task.tasksUser !== null }"
                    v-if="task.tasksUser !== null"
                    src="@/assets/avatar.jpg"
                  />
                  <div :class="[task.tasksUser !== null ? 'col-10' : 'col-12']">
                    <p>
                      {{ $t("task.reward") }}: +{{
                        $tc("pointsMsg", task.body.points)
                      }}
                    </p>
                    <p v-if="task.tasksUser === null">
                      {{ $t("task.responsible") }}:
                      {{ $t("task.personNotAssigned") }}
                    </p>
                    <p v-if="task.tasksUser !== null">
                      {{ $t("task.responsible") }}: {{ task.tasksUser.name }}
                      {{ task.tasksUser.surname }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <h2 class="mb-4">{{ $t("task.completedTasksForReview") }}</h2>
          <div v-if="toCheck.length === 0">
            <Stub>
              <p slot="body">
                {{ $t("task.thereAreNoReadyMadeTasksToCheck") }}
              </p>
            </Stub>
          </div>
          <div v-for="task in toCheck" :key="task.id" class="task">
            <div class="container">
              <div class="row mb-4">
                <div class="col-12">
                  <h3 class="mb-2">{{ task.body.header }} ({{ task.id }})</h3>
                  <p>{{ task.body.text }}</p>
                </div>
              </div>
              <div class="row mb-4">
                <img src="@/assets/avatar.jpg" class="col-2" />
                <div class="col-10">
                  <p>
                    {{ $t("task.reward") }}:+{{
                      $tc("pointsMsg", task.body.points)
                    }}
                  </p>
                  <p v-if="task.tasksUser !== null">
                    {{ $t("task.responsible") }}: {{ task.tasksUser.name }}
                    {{ task.tasksUser.surname }}
                  </p>
                </div>
              </div>
              <div class="row">
                <button
                  class="btn btn-primary mb-2 block"
                  @click="creditPoints(task)"
                >
                  {{ $t("task.toReadTheScores") }}
                </button>
                <button
                  class="btn btn-danger mb-1 block"
                  @click="sendForRevision(task)"
                >
                  {{ $t("task.toSendBackForRevision") }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <h2 class="mb-4">{{ $t("task.completedTasks") }}</h2>
          <div v-if="done.length === 0">
            <Stub>
              <p slot="body">{{ $t("task.noCompletedTasks") }}</p>
            </Stub>
          </div>
          <div v-for="task in done" :key="task.id" class="task">
            <div class="container">
              <div class="row mb-4">
                <div class="col-12">
                  <h3 class="mb-2">{{ task.body.header }}</h3>
                  <p>{{ task.body.text }}</p>
                </div>
              </div>
              <div class="row mb-4">
                <img
                  v-if="task.tasksUser !== null"
                  src="@/assets/avatar.jpg"
                  class="col-2"
                />
                <div class="col-10">
                  <p>
                    {{ $t("task.reward") }}: +{{
                      $tc("pointsMsg", task.body.points)
                    }}
                  </p>
                  <p v-if="task.tasksUser !== null">
                    {{ $t("task.responsible") }}: {{ task.tasksUser.name }}
                    {{ task.tasksUser.surname }}
                  </p>
                </div>
              </div>
              <div class="row">
                <button
                  class="btn btn-danger block mb-1"
                  @click="deleteTask(task)"
                >
                  {{ $t("task.deleteTask") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Minialert v-if="isShowAlert">
      <p slot="title">
        {{ $t("task.youHaveSuccessfullyCreditedPointsToTheUser") }}
      </p>
    </Minialert>
    <Minialert v-if="isShowAlertError">
      <p slot="title">
        {{ $t("minialertError") }}
      </p>
    </Minialert>
    <Minialert v-if="isShowAlertDelete">
      <p slot="title">
        {{ $t("task.youHaveSuccessfullyDeletedTheTask") }}
      </p>
    </Minialert>
    <Minialert v-if="isShowAlertSendForRevision">
      <p slot="title">
        {{ $t("task.youHaveSuccessfullyReturnedTheTaskForRevision") }}
      </p>
    </Minialert>
    <Minialert v-if="queryError">
      <p slot="title">{{ queryError }}</p>
    </Minialert>
  </div>
</template>

<script>
import Minialert from "@/components/MiniAlert.vue";
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import {
  ALL_TASKS_IN_TEAM_QUERY,
  CHANGE_STATUS_TASK_QUERY,
  CREATE_POINTS_OPERATION,
  DELETE_TASK_QUERY,
  CREATE_NOTIFICATION
} from "@/graphql/queries";

export default {
  components: { Minialert, Loader, BreadCrumbs },
  apollo: {
    // массив задач с назначенными ответственными
    allTasksInOneTeam: {
      query: ALL_TASKS_IN_TEAM_QUERY,
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
          mutation: CREATE_POINTS_OPERATION,
          variables: {
            userId: +task.tasksUser.id,
            delta: +task.body.points,
            operationDescription: `За выполненное задание "${task.body.header}"`
          }
        })
        .then(data => {
          console.log(data);
          this.$apollo
            .mutate({
              mutation: CHANGE_STATUS_TASK_QUERY,
              variables: {
                id: task.id,
                status: "Готово"
              },
              update: cache => {
                let data = cache.readQuery({
                  query: ALL_TASKS_IN_TEAM_QUERY,
                  variables: { teamId: this.$route.params.id }
                });
                data.allTasksInOneTeam.find(el => el.id === task.id).status =
                  "Готово";
                cache.writeQuery({
                  query: ALL_TASKS_IN_TEAM_QUERY,
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
                  text: `Вам было начислено ${this.$tc(
                    "pointsMsg",
                    task.body.points
                  )} за выполнение задания "${task.body.header}"`
                },
                authorId: this.$store.getters.decodedToken.id,
                userId: [+task.tasksUser.id],
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
          mutation: CHANGE_STATUS_TASK_QUERY,
          variables: {
            id: task.id,
            status: "Запланировано"
          },
          update: cache => {
            let data = cache.readQuery({
              query: ALL_TASKS_IN_TEAM_QUERY,
              variables: { teamId: this.$route.params.id }
            });
            data.allTasksInOneTeam.find(el => el.id === task.id).status =
              "Запланировано";
            cache.writeQuery({
              query: ALL_TASKS_IN_TEAM_QUERY,
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
              query: ALL_TASKS_IN_TEAM_QUERY,
              variables: { teamId: this.$route.params.id }
            });
            let index = data.allTasksInOneTeam.findIndex(
              el => el.id == task.id
            );
            data.allTasksInOneTeam.splice(index, 1);
            cache.writeQuery({
              query: ALL_TASKS_IN_TEAM_QUERY,
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
      if (!this.allTasksInOneTeam !== undefined) {
        return this.allTasksInOneTeam.filter(el => {
          return el.status === "Запланировано";
        });
      } else return [];
    },
    toCheck() {
      if (!this.allTasksInOneTeam !== undefined) {
        return this.allTasksInOneTeam.filter(el => {
          return el.status === "На проверке";
        });
      } else return [];
    },
    done() {
      if (!this.allTasksInOneTeam !== undefined) {
        return this.allTasksInOneTeam.filter(el => {
          return el.status === "Готово";
        });
      } else return [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_grid.scss";
.main_tasks {
  padding: 2%;
}
.task {
  padding: 1%;
  background: $violet;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  img {
    border-radius: 100%;
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
