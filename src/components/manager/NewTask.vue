<template>
  <div>
    <h1>Конструктор заданий</h1>
    <form @submit.prevent="createTask()">
      <div class="form-group">
        <label for="header" class="form-name">
          Название задачи
        </label>
        <input
          type="text"
          class="form-control"
          placeholder="Название задачи"
          v-model.trim="$v.newTask.header.$model"
          @blur="$v.newTask.header.$touch()"
        />
        <div v-if="$v.newTask.header.$error" class="error">
          <span v-if="!$v.newTask.header.required" class="form-text danger">{{
            $t("required")
          }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="text" class="form-name">
          Описание задачи
        </label>
        <textarea
          type="text"
          class="form-control"
          placeholder="Описание задачи"
          v-model.trim="$v.newTask.text.$model"
          @blur="$v.newTask.text.$touch()"
        ></textarea>
        <div v-if="$v.newTask.text.$error" class="error">
          <span v-if="!$v.newTask.text.required" class="form-text danger">{{
            $t("required")
          }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="text" class="form-name">
          Ответственный
        </label>
        <select class="form-control" v-model="$v.newTask.userId.$model">
          <option :value="null" selected>Назначается самостоятельно</option>
          <option
            v-for="users in usersInTeams"
            :key="users.id"
            :value="users.user.id"
            >{{ users.user.surname }} {{ users.user.name }}
            {{ users.user.patricity }}</option
          >
        </select>
      </div>
      <div class="form-group">
        <label for="header" class="form-name">
          Награда
        </label>
        <input
          type="number"
          class="form-control"
          placeholder="0"
          v-model.trim="$v.newTask.points.$model"
          @blur="$v.newTask.points.$touch()"
        />
        <div v-if="$v.newTask.points.$error" class="error">
          <span v-if="!$v.newTask.points.required" class="form-text danger">{{
            $t("required")
          }}</span>
          <span v-if="!$v.newTask.points.numeric" class="form-text danger">{{
            $t("requiredNumber")
          }}</span>
        </div>
      </div>
      <button
        class="btn btn-alternate"
        :disabled="$v.newTask.$invalid || loading"
      >
        Создать задачу
      </button>
    </form>
    <minialert v-if="isShowAlert">
      <p slot="title">
        Вы успешно создали новую задачу
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
import { required, numeric } from "vuelidate/lib/validators";
import minialert from "@/components/MiniAlert.vue";
import {
  USERS_IN_TEAMS_QUERY,
  ADD_TASK_QUERY,
  ALL_TASKS_QUERY
} from "@/graphql/queries";
export default {
  components: { minialert },
  apollo: {
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
      newTask: {
        header: "",
        text: "",
        points: "",
        status: "Запланировано",
        userId: null,
        teamId: this.$route.params.id
      },
      isShowAlert: false,
      isShowAlertError: false,
      loading: false
    };
  },
  validations: {
    newTask: {
      header: {
        required
      },
      text: {
        required
      },
      points: {
        required,
        numeric
      },
      userId: {}
    }
  },
  methods: {
    createTask() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: ADD_TASK_QUERY,
          variables: {
            teamId: this.$route.params.id,
            userId: this.newTask.userId,
            header: this.newTask.header,
            text: this.newTask.text,
            points: +this.newTask.points,
            status: this.newTask.status
          },
          update: (cache, { data: { updateUser } }) => {
            let data = cache.readQuery({
              query: ALL_TASKS_QUERY,
              variables: { teamId: this.$route.params.id }
            });
            data.allTasks.push(this.newTask);
            cache.writeQuery({
              query: ALL_TASKS_QUERY,
              variables: { teamId: this.$route.params.id },
              data
            });
            console.log(updateUser);
          }
        })
        .then(data => {
          console.log(data);
          this.isShowAlert = true; // Показать окно с успехом
          this.$v.$reset();
          this.newTask = {
            header: "",
            text: "",
            points: "",
            status: "Запланировано",
            userId: null,
            teamId: this.$route.params.id
          };
          this.loading = false;
          setTimeout(() => {
            this.isShowAlert = false; // Закрыть окно с успехом
          }, 3000);
        })
        .catch(error => {
          console.error(error);
          this.loading = false;
          this.isShowAlertError = true; // Показать окно с ошибкой
          setTimeout(() => {
            this.isShowAlertError = false; // Закрыть окно с ошибкой
          }, 3000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
</style>
