<template>
  <div class="container">
    <div class="row">
      <div v-if="!this.$apollo.loading">
        <div class="col-12">
          <breadcrumbs></breadcrumbs>
        </div>
        <form @submit.prevent="editTeam()" class="col-12">
          <p class="gray mb-4">
            {{ $t("team.lastedited") }}: {{ $d(oneTeam.updatedAt, "long") }}
          </p>
          <div class="form-group">
            <label for="name" class="form-name">{{ $t("nameInanimate") }}</label>
            <input
              name="name"
              v-model.trim="$v.oneTeam.name.$model"
              @blur="$v.oneTeam.name.$touch()"
              :placeholder="$t('nameInanimate')"
              class="form-control col-8 dark"
            />
            <div v-if="$v.oneTeam.name.$error" class="error">
              <span v-if="!$v.oneTeam.name.required" class="form-text danger">{{
                $t("required")
              }}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="description" class="form-name">{{ $t("description") }}</label>
            <textarea
              name="description"
              v-model.trim="$v.oneTeam.description.$model"
              @blur="$v.oneTeam.description.$touch()"
              :placeholder="$t('description')"
              class="form-control col-8 dark"
            ></textarea>
            <div v-if="$v.oneTeam.description.$error" class="error">
              <span
                v-if="!$v.oneTeam.description.required"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="maxUsersLimit" class="form-name">{{
              $t("team.maximumNumberOfTeamMembers")
            }}</label>
            <input
              name="maxUsersLimit"
              v-model.trim="$v.oneTeam.maxUsersLimit.$model"
              @blur="$v.oneTeam.maxUsersLimit.$touch()"
              :placeholder="$t('team.maximumNumberOfTeamMembers')"
              class="form-control col-8 dark"
            />
            <div v-if="$v.oneTeam.maxUsersLimit.$error" class="error">
              <span
                v-if="!$v.oneTeam.maxUsersLimit.required"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
              <span
                v-if="!$v.oneTeam.maxUsersLimit.numeric"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
            </div>
          </div>
          <button
            class="btn btn-primary col-8 dark"
            :disabled="$v.oneTeam.$invalid"
            @click="editTeam()"
          >
            {{ $t("save") }}
          </button>
        </form>
        <minialert v-if="isShowAlertEdit"
          ><p slot="title">
            {{ $t("team.youHaveSuccessfullyChangedTheseTeam") }}
          </p></minialert
        >
        <minialert v-if="isError"
          ><p slot="title">
            {{ $t("minialertError") }}
          </p></minialert
        >
      </div>
      <div v-else class="wrapOfLoader"><loader></loader></div>
    </div>
  </div>
</template>

<script>
import { UPDATE_TEAM_QUERY, TEAM_QUERY } from "@/graphql/queries";
import breadcrumbs from "@/components/BreadCrumbs.vue";
import loader from "@/components/Loader.vue";
import { required, numeric } from "vuelidate/lib/validators";
import minialert from "@/components/MiniAlert.vue";
export default {
  apollo: {
    // Массив команд организации
    oneTeam: {
      query: TEAM_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  data() {
    return {
      isShowAlertEdit: false,
      isError: false
    };
  },
  components: {
    breadcrumbs,
    loader,
    minialert
  },
  validations: {
    // Редактирование данных про организацию
    oneTeam: {
      name: {
        required
      },
      description: {
        required
      },
      maxUsersLimit: {
        required,
        numeric
      }
    }
  },
  methods: {
    // Метод для редактирования команды; сохраняет внесенные пользователем изменения
    editTeam() {
      this.isShowModalEditTeam = false;
      this.$apollo
        .mutate({
          mutation: UPDATE_TEAM_QUERY, // Редактируем в БД
          variables: {
            id: this.oneTeam.id,
            name: this.oneTeam.name,
            description: this.oneTeam.description,
            maxUsersLimit: parseInt(this.oneTeam.maxUsersLimit)
          },
          // Редактируем кеш
          update: cache => {
            let data = cache.readQuery({
              query: TEAM_QUERY,
              variables: { id: this.$route.params.id }
            });
            data.oneTeam.name = this.oneTeam.name;
            data.oneTeam.description = this.oneTeam.description;
            data.oneTeam.maxUsersLimit = this.oneTeam.maxUsersLimit;
            data.oneTeam.updatedAt = new Date();
            cache.writeQuery({
              query: TEAM_QUERY,
              variables: { id: this.$route.params.id },
              data
            });
          }
        })
        // В случае успеха
        .then(() => {
          this.isShowAlertEdit = true;
          setTimeout(() => {
            this.isShowAlertEdit = false;
          }, 3000);
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_grid.scss";
textarea {
  resize: none;
  height: 10rem;
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
.form-name {
  color: $white;
}
</style>
