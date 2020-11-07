<template>
  <div>
    <h3>Задания</h3>
    <hr />
    <button>Созадть задачу</button>
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
        Ответственный: <img src="@/assets/avatar.jpg" alt="photo" class="smallAvatar"/>
        {{ task.tasksUser.name }} {{ task.tasksUser.surname }}
      </p>
    </div>
  </div>
</template>

<script>
import { TASKS_QUERY } from "@/graphql/queries";
export default {
  apollo: {
    tasks: {
      query: TASKS_QUERY
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
