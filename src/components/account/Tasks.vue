<template>
  <div>
    <h2 class="tasks">Задания</h2>
    <div class="tasks">
      <div>
        <h3>Бэклог заданий</h3>
        <div v-for="taskNoneUser in backlog" :key="taskNoneUser.id">
          <div v-if="!taskNoneUser.tasksUser" class="oneUser ">
            <h2>{{ taskNoneUser.body.header }}</h2>
            <p>{{ taskNoneUser.body.text }}</p>
            <div class="oneUser__points">
              <h3>Награда:<br />+{{ taskNoneUser.body.points }} баллов</h3>
            </div>
            <button class="btn btn-primary" @click="toAddTask(taskNoneUser.id)">
              Взять задание
            </button>
          </div>
        </div>
      </div>
      <div>
        <h3>Ваши задания</h3>
        <div v-for="task in tasks" :key="task.id">
          <div v-if="task.tasksUser" class="oneUser">
            <h2>{{ task.body.header }}</h2>
            <p>{{ task.body.text }}</p>
            <!-- Ответственный:
        <img src="@/assets/avatar.jpg" alt="photo" class="smallAvatar" />
        {{ task.tasksUser.name }} {{ task.tasksUser.surname }} -->
            <div class="oneUser__points">
              <div>
                <h3>Награда:<br />+{{ task.body.points }} баллов</h3>
              </div>
              <div>
                <select
                  class="form-control small"
                  v-model="task.status"
                  @change="
                    toEditTask(
                      task.id,
                      task.status,
                      task.tasksUser.userPoints.id,
                      task.body.points
                    )
                  "
                >
                  <option>Запланировано</option>
                  <option>В работе</option>
                  <option>Готово</option></select
                >
              </div>

              <minialert v-if="isShowAlertPoints"
                ><p slot="title">
                  Вам начислено {{ task.body.points }} баллов
                </p></minialert
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TASKS_QUERY,
  BACKLOG_QUERY,
  USERS_IN_TEAMS_QUERY,
  ADD_USER_TO_TASK_QUERY,
  EDIT_TASK_QUERY,
  CARGE_POINTS_QUERY
} from "@/graphql/queries";
import minialert from "@/components/MiniAlert.vue";

export default {
  components: { minialert },
  apollo: {
    tasks: {
      query: TASKS_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
        };
      }
    },
    backlog: {
      query: BACKLOG_QUERY,
      variables() {
        return {
          teamId: this.$route.params.id
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
      isShowAlertPoints: false
    };
  },
  methods: {
    toAddTask(id) {
      this.$apollo
        .mutate({
          mutation: ADD_USER_TO_TASK_QUERY,
          variables: {
            id: id,
            userId: this.$route.params.id
          }
          //FIXME: создать динамическое добавление нового задания в список
          // update: (cache, { data: { createTask } }) => {
          //   let data = cache.readQuery({
          //     query: TASKS_QUERY
          //   });
          //   data.tasks.push(createTask);
          //   cache.writeQuery({
          //     query: TASKS_QUERY,
          //     data
          //   });
          // }
        })
        .then(data => {
          this.addTask = false;
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    // метод смены статуса задачи
    toEditTask(id, status, pointAccountId, points) {
      this.$apollo
        .mutate({
          mutation: EDIT_TASK_QUERY,
          variables: {
            id: id,
            status: status
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      // если статус задачи изменен на "Готово", то пользователю начисляются баллы за задачу
      if (status === "Готово") {
        this.$apollo
          .mutate({
            mutation: CARGE_POINTS_QUERY,
            variables: {
              pointAccountId: parseInt(pointAccountId),
              delta: parseInt(points),
              operationDescription: "За выполненное задание"
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
        this.isShowAlertPoints = true;
        setTimeout(() => {
          this.isShowAlertPoints = false;
        }, 3000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_classes.scss";

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
  margin-right: 2 * $scrollBarVerticalWidth;
}
.oneUser__points {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.oneUser h2 {
  color: $white;
}
.oneUser p {
  color: $gray_3;
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
</style>
