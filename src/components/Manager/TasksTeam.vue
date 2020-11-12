<template>
  <div>
    <h3>Бэклог заданий</h3>
    <hr />
    <div v-for="taskNoneUser in backlog" :key="taskNoneUser.id">
      <div v-if="!taskNoneUser.tasksUser" class="backlogTask">
        <b>{{ taskNoneUser.body.header }}</b>
        <span>{{ taskNoneUser.body.text }}</span>
        <span>+{{ taskNoneUser.body.points }} баллов</span>
        <select class="form-control" v-model="userId">
          <option
            v-for="users in usersInTeams"
            :key="users.id"
            :value="users.user.id"
            >{{ users.user.name }} {{ users.user.surname }}</option
          >
        </select>
      </div>
    </div>
    <h3>Распределенные задания</h3>
    <hr />
    <div v-if="!addTask">
      <button @click="addTask = true" class="btn btn-primary">
        Созадть задачу
      </button>
    </div>
    <div v-else>
      <form @submit.prevent="">
        <label>Заголовок</label
        ><input type="text" class="form-control" v-model="header" />
        <label>Описание задачи</label
        ><input type="text" class="form-control" v-model="text" />
        <label>Ответственный</label
        ><select class="form-control" v-model="userId">
          <option :value="null">Назначается самостоятельно</option>
          <option
            v-for="users in usersInTeams"
            :key="users.id"
            :value="users.user.id"
            >{{ users.user.name }} {{ users.user.surname }}</option
          >
        </select>
        <label>Количество баллов за выполнение</label
        ><input type="number" class="form-control" v-model="points" />
        <br />
        <button class="btn btn-primary" @click="toAddTask()">Добавить</button>
      </form>
      <hr />
    </div>
    <div v-for="task in tasks" :key="task.id">
      <div v-if="task.body.points > 0" class="oneUser">
        <h4>{{ task.body.header }}</h4>
        <p>{{ task.body.text }}</p>
        Ответственный:
          <img src="@/assets/avatar.jpg" alt="photo" class="smallAvatar" />
          {{ task.tasksUser.name }} {{ task.tasksUser.surname }}
          <label>Статус:</label>
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
      </div>
    </div>
  </div>
</template>

<script>
import {
  TASKS_QUERY,
  BACKLOG_QUERY,
  USERS_IN_TEAMS_QUERY,
  ADD_TASK_QUERY,
  EDIT_TASK_QUERY,
  CARGE_POINTS_QUERY
} from "@/graphql/queries";
export default {
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
      points: 10
    };
  },
  methods: {
    toAddTask() {
      this.$apollo
        .mutate({
          mutation: ADD_TASK_QUERY,
          variables: {
            teamId: this.$route.params.id,
            userId: this.userId,
            header: this.header,
            text: this.text,
            points: this.points,
            status: "Запланировано"
          },
          //FIXME: создать динамическое добавление нового задания в список
          update: (cache, { data: { createTask } }) => {
            let data = cache.readQuery({
              query: TASKS_QUERY,
              variables: {
                teamId: this.$route.params.id
              }
            });
            data.tasks.unshift(createTask);
            cache.writeQuery({
              query: TASKS_QUERY,
              variables: {
                teamId: this.$route.params.id
              },
              data
            });
          }
        })
        .then(data => {
          this.addTask = false;
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    },

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
      }
    }
  }
};
</script>

<style>
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
