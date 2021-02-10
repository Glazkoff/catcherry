<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <BreadCrumbs></BreadCrumbs>
      </div>
    </div>
    <div class="row" v-if="!this.$apollo.loading">
      <div class="col-12">
        <form @submit.prevent="createTask()">
          <div class="form-group">
            <label for="header" class="form-name white">
              {{ $t("taskConstructor.theNameOfTheTask") }}
            </label>
            <input
              type="text"
              class="form-control col-8 dark"
              :placeholder="$t('taskConstructor.theNameOfTheTask')"
              v-model.trim="$v.newTask.header.$model"
              @blur="$v.newTask.header.$touch()"
              :class="{ is_invalid: $v.newTask.header.$error }"
            />
            <div v-if="$v.newTask.header.$error" class="error">
              <span v-if="!$v.newTask.header.required" class="form-text red">{{
                $t("required")
              }}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="text" class="form-name white">
              {{ $t("taskConstructor.taskDescription") }}
            </label>
            <textarea
              type="text"
              class="form-control col-8 dark"
              :placeholder="$t('taskConstructor.taskDescription')"
              v-model.trim="$v.newTask.text.$model"
              @blur="$v.newTask.text.$touch()"
              :class="{ is_invalid: $v.newTask.text.$error }"
            ></textarea>
            <div v-if="$v.newTask.text.$error" class="error">
              <span v-if="!$v.newTask.text.required" class="form-text red">{{
                $t("required")
              }}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="text" class="form-name white">
              {{ $t("taskConstructor.responsible") }}
            </label>
            <select
              class="form-control dark col-8"
              v-model="$v.newTask.userId.$model"
            >
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
            <label for="header" class="form-name white">
              {{ $t("taskConstructor.reward") }}
            </label>
            <input
              type="number"
              class="form-control white"
              placeholder="0"
              v-model.trim="$v.newTask.points.$model"
              @blur="$v.newTask.points.$touch()"
              :class="{ is_invalid: $v.newTask.points.$error }"
            />
            <div v-if="$v.newTask.points.$error" class="error">
              <span v-if="!$v.newTask.points.required" class="form-text red">{{
                $t("required")
              }}</span>
              <span
                v-if="!$v.newTask.points.numeric"
                class="form-text danger"
                >{{ $t("requiredNumber") }}</span
              >
            </div>
          </div>
          <button
            class="btn btn-primary col-8"
            :disabled="$v.newTask.$invalid || loading"
          >
            {{ $t("taskConstructor.createATask") }}
          </button>
        </form>
      </div>
    </div>
    <div v-else class="wrapOfLoader">
      <Loader></Loader>
    </div>
    <Minialert v-if="isShowAlert">
      <p slot="title">
        {{ $t("taskConstructor.youHaveSuccessfullyCreatedNewTask") }}
      </p>
    </Minialert>
    <Minialert v-if="isShowAlertError">
      <p slot="title">
        {{ $t("minialertError") }}
      </p>
    </Minialert>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import Minialert from "@/components/MiniAlert.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import Loader from "@/components/Loader.vue";
import {
  USERS_IN_TEAMS_QUERY,
  ADD_TASK_QUERY,
  ALL_TASKS_IN_TEAM_QUERY
} from "@/graphql/queries";
export default {
  components: { Minialert, BreadCrumbs, Loader },
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
              query: ALL_TASKS_IN_TEAM_QUERY,
              variables: { teamId: this.$route.params.id }
            });
            data.allTasksInOneTeam.push(this.newTask);
            cache.writeQuery({
              query: ALL_TASKS_IN_TEAM_QUERY,
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
@import "@/styles/_grid.scss";
textarea {
  resize: none;
  height: 10rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
.points_task input {
  width: 10rem;
  height: 55px;
  background: $dark_blue !important;
  border: 0px solid $violet_2 !important;
  border-bottom: 1px solid $bright_violet !important;
  box-shadow: 0px 0px 0px 0px !important;
  border-radius: 0px !important;
}
.wrapOfLoader {
  overflow: hidden;
  background: $dark_blue;
  z-index: 99999;
  width: 100%;
  height: 40vh;
  padding-top: calc(20vh - 100px);
  position: relative;
}
</style>
