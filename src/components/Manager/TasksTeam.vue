<template>
  <div>
    <h3>Задания</h3>
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
          <option
            v-for="users in usersInTeams"
            :key="users.id"
            :value="users.user.id"
            >{{ users.user.name }} {{ users.user.surname }}</option
          > </select
        ><br />
        <button class="btn btn-primary" @click="toAddTask()">Добавить</button>
      </form>
      <hr />
    </div>
    <div v-for="task in tasks" :key="task.id" class="oneUser">
      <p>{{ task.body.text }}</p>
      <p>
        Дата создания:
        {{
          new Date(task.createdAt).toLocaleString("ru", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
        }}
      </p>
      <p>
        Ответственный:
        <img src="@/assets/avatar.jpg" alt="photo" class="smallAvatar" />
        {{ task.tasksUser.name }} {{ task.tasksUser.surname }}
      </p>
    </div>
  </div>
</template>

<script>
import {
  TASKS_QUERY,
  USERS_IN_TEAMS_QUERY,
  ADD_TASK_QUERY
} from "@/graphql/queries";
export default {
  apollo: {
    tasks: {
      query: TASKS_QUERY
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
      status: ""
    };
  },
  methods: {
    toAddTask() {
      this.$apollo
        .mutate({
          mutation: ADD_TASK_QUERY,
          variables: {
            userId: this.userId,
            header: this.header,
            text: this.text,
            status: "В работе"
          },
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
