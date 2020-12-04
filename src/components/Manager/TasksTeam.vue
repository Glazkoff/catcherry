<template>
  <div class="aaa">
    <div v-if="$apollo.loading">
      {{ $t("loading") }}
      <h4 v-if="queryError">{{ queryError }}</h4>
    </div>
    <div v-if="!$apollo.loading">
      <h2>Бэклог заданий</h2>
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
          </div>
        </div>
      </div>
      <!-- вывод массива задач с назначенными ответственными 
    <div v-for="task in tasks" :key="task.id">
      <div v-if="task.body.points > 0" class="oneUser">
        <h4>{{ task.body.header }}</h4>
        <p>{{ task.body.text }}</p>
        Ответственный:
        <img src="@/assets/avatar.jpg" alt="photo" class="smallAvatar" />
        {{ task.tasksUser.surname }}
        <label>Статус:</label>
        селект для смены статуса  
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
         окошко о начислении баллов ответственному за задачу 
        <minialert v-if="isShowAlertPoints"
          ><p slot="title">
            Пользователю 
            {{ task.tasksUser.surname }} начислено {{ task.body.points }} баллов
          </p></minialert
        >
      </div>
    </div>
    --></div>
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
  </div>
</template>

<script>
import minialert from "@/components/MiniAlert.vue";
import {
  ALL_TASKS_QUERY,
  EDIT_TASK_QUERY,
  CARGE_POINTS_QUERY
} from "@/graphql/queries";

export default {
  components: { minialert },
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
      isShowAlertPoints: false
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
                let index = data.allTasks.findIndex(el => el.id == task.id);
                console.log("Удаляем задачу", index);
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
      // если статус задачи изменен на "готово", ответстенному за задачу начисляются баллы
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
        // появляется окошко сообщения о начислении баллов
        this.isShowAlertPoints = true;
        setTimeout(() => {
          this.isShowAlertPoints = false;
        }, 3000);
      }
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
</style>
