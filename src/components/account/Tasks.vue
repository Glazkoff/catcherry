<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>
    <div class="container" v-if="$apollo.loading">
      <Loader></Loader>
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-4">
          <div>
            <!-- TODO: СООБЩЕНИЕ О ПУСТОТЕ СПИСКА -->
            <h3 class="sticky-header">{{ $t("task.scheduledTasks") }}</h3>
            <div v-if="toDo.length === 0">
              <Stub>
                <p slot="body">{{ $t("task.noTask") }}</p>
              </Stub>
            </div>
            <div v-for="task in toDo" :key="task.id" class="task">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <h3>{{ task.body.header }} ({{ task.id }})</h3>
                    <p>{{ task.body.text }}</p>
                    <p>{{ $t("task.team") }}: {{ task.tasksTeam.name }}</p>
                    <p>
                      {{ $t("task.reward") }}: +{{
                        $tc("pointsMsg", task.body.points)
                      }}
                    </p>
                    <button
                      class="btn btn-primary block"
                      @click="changeStatus(task.id)"
                    >
                      {{ $t("task.сompleteTask") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="sticky-header">
              {{ $t("task.tasksWithoutFPerformer") }}
            </h3>
            <div v-if="backlog.length === 0">
              <Stub>
                <p slot="body">{{ $t("task.noTask") }}</p>
              </Stub>
            </div>
            <div v-for="task in backlog" :key="task.id" class="task">
              <div class="container">
                <div class="row">
                  <div class="col-12">
                    <h3>{{ task.body.header }} ({{ task.id }})</h3>
                    <p>{{ task.body.text }}</p>
                    <p>{{ $t("task.team") }}: {{ task.tasksTeam.name }}</p>
                    <p>
                      {{ $t("task.reward") }}: +{{
                        $tc("pointsMsg", task.body.points)
                      }}
                    </p>
                    <button
                      class="btn btn-primary block"
                      @click="takeTask(task.id)"
                    >
                      {{ $t("task.takeTask") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <h3 class="sticky-header">
            {{ $t("task.completedTasksForReview") }}
          </h3>
          <div v-if="toCheck.length === 0">
            <Stub>
              <p slot="body">{{ $t("task.noTask") }}</p>
            </Stub>
          </div>
          <div v-for="task in toCheck" :key="task.id" class="task">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h3>{{ task.body.header }} ({{ task.id }})</h3>
                  <p>{{ task.body.text }}</p>
                  <p>{{ $t("task.team") }}: {{ task.tasksTeam.name }}</p>
                  <p>
                    {{ $t("task.reward") }}: +{{
                      $tc("pointsMsg", task.body.points)
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <!-- TODO: СООБЩЕНИЕ О ПУСТОТЕ СПИСКА -->
          <h3 class="sticky-header">{{ $t("task.completedTasks") }}</h3>
          <div v-if="done.length === 0">
            <Stub>
              <p slot="body">{{ $t("task.noTask") }}</p>
            </Stub>
          </div>
          <div v-for="task in done" :key="task.id" class="task">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <h3>{{ task.body.header }} ({{ task.id }})</h3>
                  <p>{{ task.body.text }}</p>
                  <p>{{ $t("task.team") }}: {{ task.tasksTeam.name }}</p>
                  <p>
                    {{ $t("task.reward") }}: +{{
                      $tc("pointsMsg", task.body.points)
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertToTakeTask">
      <p slot="title">
        {{ $t("task.youHaveSuccessfullyScceptedTheTask") }}
      </p>
    </minialert>
    <minialert v-if="isShowAlertError">
      <p slot="title">
        {{ $t("minialertError") }}
      </p>
    </minialert>
    <minialert v-if="isShowAlertDoneTask">
      <p slot="title">
        {{ $t("task.youHaveCompletedTheTaskSuccessfully") }}
      </p>
    </minialert>
  </div>
</template>

<script>
import {
  ALL_USER_TASK_QUERY,
  ADD_USER_TO_TASK_QUERY,
  CHANGE_STATUS_TASK_QUERY
} from "@/graphql/queries";
import minialert from "@/components/MiniAlert.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import Loader from "@/components/Loader.vue";
import Stub from "@/components/Stub.vue";

export default {
  components: { BreadCrumbs, Loader, minialert, Stub },
  apollo: {
    allUserTasks: {
      query: ALL_USER_TASK_QUERY,
      variables() {
        return {
          id: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  data() {
    return {
      addTask: false,
      userId: 1,
      header: "",
      text: "",
      status: "",
      points: 10,
      isShowAlertToTakeTask: false,
      isShowAlertError: false,
      isShowAlertDoneTask: false
    };
  },
  methods: {
    takeTask(taskId) {
      this.$apollo
        .mutate({
          mutation: ADD_USER_TO_TASK_QUERY,
          variables: {
            id: taskId,
            userId: this.$store.getters.decodedToken.id
          },
          update: cache => {
            let data = cache.readQuery({
              query: ALL_USER_TASK_QUERY,
              variables: { id: this.$store.getters.decodedToken.id }
            });
            data.allUserTasks.find(el => el.id === taskId).tasksUser = {
              id: this.$store.getters.decodedToken.id
            };
            cache.writeQuery({
              query: ALL_USER_TASK_QUERY,
              variables: { id: this.$store.getters.decodedToken.id },
              data
            });
          }
        })
        .then(data => {
          console.log(data);
          this.isShowAlertToTakeTask = true;
          setTimeout(() => {
            this.isShowAlertToTakeTask = false;
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
    changeStatus(taskId) {
      this.$apollo
        .mutate({
          mutation: CHANGE_STATUS_TASK_QUERY,
          variables: {
            id: taskId,
            status: "На проверке"
          },
          update: cache => {
            let data = cache.readQuery({
              query: ALL_USER_TASK_QUERY,
              variables: { id: this.$store.getters.decodedToken.id }
            });
            data.allUserTasks.find(el => el.id === taskId).status =
              "На проверке";
            cache.writeQuery({
              query: ALL_USER_TASK_QUERY,
              variables: { id: this.$store.getters.decodedToken.id },
              data
            });
          }
        })
        .then(data => {
          console.log(data);
          this.isShowAlertDoneTask = true;
          setTimeout(() => {
            this.isShowAlertDoneTask = false;
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
      if (!this.allUserTasks !== undefined) {
        return this.allUserTasks.filter(el => {
          return el.status === "Запланировано" && el.tasksUser === null;
        });
      } else return [];
    },
    toDo() {
      if (!this.allUserTasks !== undefined) {
        return this.allUserTasks.filter(el => {
          return el.status === "Запланировано" && el.tasksUser !== null;
        });
      } else return [];
    },
    toCheck() {
      if (!this.allUserTasks !== undefined) {
        return this.allUserTasks.filter(el => {
          return el.status === "На проверке";
        });
      } else return [];
    },
    done() {
      if (!this.allUserTasks !== undefined) {
        return this.allUserTasks.filter(el => {
          return el.status === "Готово";
        });
      } else return [];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_grid.scss";

.sticky-header {
  position: sticky;
  top: $topBarHeight;
  background: $dark_blue;
  margin: 0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: 9000;
}

.tasks {
  margin-left: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 2em;
  grid-gap: 0.5em;
}

.oneUser {
  margin-bottom: 15px;
  padding: 15px;
  background: $violet;
  border-radius: 10px;
  // margin-right: 2 * $scrollBarVerticalWidth;
}
.oneUser__points {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.oneUser h2 {
  color: $white;
}
.oneUser p {
  color: $gray;
}
.form-control {
  margin-top: 20px;
  background: $violet;
  border-radius: 10px;
  color: $bright_violet;
  border: 1px solid $bright_violet;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
}
.smallAvatar {
  height: 24px;
  border-radius: 12px;
  margin: 0 10px;
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
</style>
