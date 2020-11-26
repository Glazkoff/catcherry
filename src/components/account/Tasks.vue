<template>
  <div class="account-view">
    <h3>Бэклог заданий</h3>
    <hr />
    <div v-for="taskNoneUser in backlog" :key="taskNoneUser.id">
      <div v-if="!taskNoneUser.tasksUser" class="backlogTask">
        <b>{{ taskNoneUser.body.header }}</b>
        <span>{{ taskNoneUser.body.text }}</span>
        <span>+{{ taskNoneUser.body.points }} баллов</span>
        <button class="btn btn-secondary" @click="toAddTask(taskNoneUser.id)">
          Взять задание
        </button>
      </div>
    </div>
    <h3>Задания</h3>
    <hr />
    <div v-for="task in tasks" :key="task.id">
      <div v-if="task.tasksUser" class="oneUser">
        <h4>{{ task.body.header }}</h4>
        <p>{{ task.body.text }}</p>
        Ответственный:
        <img src="@/assets/avatar.jpg" alt="photo" class="smallAvatar" />
        {{ task.tasksUser.name }} {{ task.tasksUser.surname }}
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
        <p>+{{ task.body.points }} баллов</p>
        <minialert v-if="isShowAlertPoints"
          ><p slot="title">
            Вам начислено {{ task.body.points }} баллов
          </p></minialert
        >
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

<style>
.backlogTask {
  display: grid;
  grid-template-columns: 1fr 2fr 0.5fr 0.5fr;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px gray;
}
.oneUser {
  margin: 15px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px gray;
}
.smallAvatar {
  height: 24px;
  border-radius: 12px;
  margin: 0 10px;
}
</style>
