<template>
  <div class="task_constructor" v-if="!this.$apollo.loading">
    <breadcrumbs></breadcrumbs>
    <h2>{{ $t("taskConstructor.taskConstructor") }}</h2>
    <form @submit.prevent="createTask()">
      <div class="form-group name_task">
        <label for="header" class="form-name">
          {{ $t("taskConstructor.theNameOfTheTask") }}
        </label>
        <input
          type="text"
          class="form-control"
          :placeholder="$t('taskConstructor.theNameOfTheTask')"
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
          {{ $t("taskConstructor.taskDescription") }}
        </label>
        <textarea
          type="text"
          class="form-control"
          :placeholder="$t('taskConstructor.taskDescription')"
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
          {{ $t("taskConstructor.responsible") }}
        </label>
        <select class="form-control" v-model="$v.newTask.userId.$model">
          <option :value="null" selected>{{
            $t("taskConstructor.isAssignedIndependently")
          }}</option>
          <option
            v-for="users in usersInTeams"
            :key="users.id"
            :value="users.user.id"
            >{{ users.user.surname }} {{ users.user.name }}
            {{ users.user.patricity }}</option
          >
        </select>
      </div>
      <div class="form-group points_task">
        <label for="header" class="form-name">
          {{ $t("taskConstructor.reward") }}
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
        {{ $t("taskConstructor.createATask") }}
      </button>
    </form>
    <minialert v-if="isShowAlert">
      <p slot="title">
        {{ $t("taskConstructor.youHaveSuccessfullyCreatedNewTask") }}
      </p>
    </minialert>
    <minialert v-if="isShowAlertError">
      <p slot="title">
        {{ $t("minialertError") }}
      </p>
    </minialert>
  </div>
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import minialert from "@/components/MiniAlert.vue";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import loader from "@/components/Loader.vue";
import {
  USERS_IN_TEAMS_QUERY,
  ADD_TASK_QUERY,
  ALL_TASKS_QUERY
} from "@/graphql/queries";
export default {
  components: { minialert, breadcrumbs, loader },
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
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
.task_constructor {
  margin-left: 51px;
}
label {
  font-weight: 500 !important;
  font-size: 21px !important;
  line-height: 25px !important;
  font-family: Lato !important;
  color: $white !important;
}
input,
textarea {
  margin-top: 8px;
  margin-bottom: 16px;
  width: 431px;
  height: 55px;
  background: $violet !important;
  border: 1px solid $violet_2 !important;
  box-sizing: border-box !important;
  box-shadow: 0px 4px 10px 3px rgba(0, 0, 0, 0.11) !important;
  border-radius: 10px !important;
  font-family: Lato !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 16px !important;
  line-height: 20px !important;
}
textarea {
  width: 707px !important;
  height: 194px !important;
}
.form-control {
  margin-top: 8px;
  margin-bottom: 16px;
  width: 431px;
  height: 55px;
  background: $violet !important;
  border: 1px solid $violet_2 !important;
  box-sizing: border-box;
  border-radius: 10px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: $gray_3;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.points_task input {
  width: 55px;
  height: 55px;
  background: $dark_blue !important;
  border: 0px solid $violet_2 !important;
  border-bottom: 1px solid $bright_violet !important;
  box-shadow: 0px 0px 0px 0px !important;
  border-radius: 0px !important;
}
</style>
