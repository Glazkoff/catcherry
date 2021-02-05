9<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h2>{{ $t("team.createNewTeam") }}</h2>
        <form @submit.prevent="createTeam()">
          <div class="form-group">
            <label class="form-name white">{{ $t("team.teamName") }}</label>
            <input
              type="text"
              name="name"
              v-model.trim="newTeam.name"
              @blur="$v.newTeam.name.$touch()"
              class="form-control col-8 dark"
              :placeholder="$t('team.teamName')"
            />
            <div v-if="$v.newTeam.name.$error" class="error">
              <span v-if="!$v.newTeam.name.required" class="form-text danger">{{
                $t("required")
              }}</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-name white">{{
              $t("team.teamDescription")
            }}</label>
            <textarea
              class="form-control col-8 dark"
              name="description"
              v-model.trim="newTeam.description"
              @blur="$v.newTeam.description.$touch()"
              :placeholder="$t('team.teamDescription')"
            ></textarea>
            <div v-if="$v.newTeam.description.$error" class="error">
              <span
                v-if="!$v.newTeam.description.required"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-name white">{{
              $t("team.maximumNumberOfTeamMembers")
            }}</label>
            <input
              type="number"
              class="form-control col-8 dark"
              :placeholder="$t('team.maximumNumberOfTeamMembers')"
              name="maxUsersLimit"
              v-model.trim="newTeam.maxUsersLimit"
              @blur="$v.newTeam.maxUsersLimit.$touch()"
            />
            <div v-if="$v.newTeam.maxUsersLimit.$error" class="error">
              <span
                v-if="!$v.newTeam.maxUsersLimit.required"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
              <span
                v-else-if="!$v.newTeam.maxUsersLimit.numeric"
                class="form-text danger"
                >{{ $t("requiredNumber") }}</span
              >
            </div>
          </div>
          <button
            class="btn btn-primary col-8"
            :disabled="$v.newTeam.$invalid || loading"
          >
            {{ $t("team.createNewTeam") }}
          </button>
        </form>
        <minialert v-if="isShowAlertError">
          <p slot="title">
            {{ $t("minialertError") }}
          </p>
        </minialert>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric } from "vuelidate/lib/validators";
import {
  USER_ORG_QUERY,
  CREATE_TEAM,
  CREATE_USER_IN_TEAM,
  MANAGER_TEAMS_QUERY
} from "@/graphql/queries";
import minialert from "@/components/MiniAlert.vue";
export default {
  components: { minialert },
  apollo: {
    userOrganization: {
      query: USER_ORG_QUERY,
      variables() {
        return {
          id: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  data() {
    return {
      isShowAlertError: false,
      loading: false,
      idTeam: -1,
      newTeam: {
        name: "",
        description: "",
        maxUsersLimit: ""
      }
    };
  },
  validations: {
    newTeam: {
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
    createTeam() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: CREATE_TEAM,
          variables: {
            organizationId: +this.userOrganization.id,
            name: this.newTeam.name,
            description: this.newTeam.description,
            maxUsersLimit: +this.newTeam.maxUsersLimit
          }
        })
        .then(data => {
          this.idTeam = +data.data.createTeam.id;
          this.$apollo
            .mutate({
              mutation: CREATE_USER_IN_TEAM,
              variables: {
                userId: this.$store.getters.decodedToken.id,
                teamId: this.idTeam,
                status: "Accept",
                roleId: 2
              },
              update: cache => {
                let data = cache.readQuery({
                  query: MANAGER_TEAMS_QUERY,
                  variables: { userId: this.$store.getters.decodedToken.id }
                });
                console.log(data);
                let team = {
                  id: -1,
                  team: {
                    id: this.idTeam,
                    name: this.newTeam.name
                  }
                };
                data.managerTeams.push(team);
                cache.writeQuery({
                  query: MANAGER_TEAMS_QUERY,
                  variables: { userId: this.$store.getters.decodedToken.id },
                  data
                });
              }
            })
            .then(() => {
              this.loading = false;
              this.$router.push({
                name: "TeamMembers",
                params: { id: this.idTeam }
              });
            })
            .catch(error => {
              console.error(error);
              this.loading = false;
              this.isShowAlertError = true; // Показать окно с ошибкой
              setTimeout(() => {
                this.isShowAlertError = false; // Закрыть окно с ошибкой
              }, 3000);
            });
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
</style>
