<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2>
            {{ $t("listOrganization") }}
          </h2>
        </div>
      </div>
      <div v-if="$apollo.queries.organizations.loading" class="wrapOfLoader">
        <loader></loader>
      </div>
      <div v-if="!$apollo.queries.organizations.loading">
        <div class="row">
          <div class="col-12">
            <h4 v-if="organizations.length == 0">
              {{ $t("noOrg") }}
            </h4>
          </div>
        </div>
        <div v-if="organizations.length > 0">
          <div class="row">
            <div class="col-12">
              <input
                v-model="findString"
                type="text"
                :placeholder="$t('placeholderSearchByOrgs')"
                class="form-control block find dark"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div
                class="card"
                v-for="organization in filterOrganization"
                :key="organization.id"
              >
                <div class="card_img">
                  <img src="~@/assets/avatar.jpg" />
                </div>
                <div class="card_body">
                  <p>{{ organization.name }}</p>
                  <p>№ {{ organization.id }}</p>
                </div>
                <div
                  @click="showFullInformation(organization.id)"
                  class="card_action"
                >
                  <ArrowRight></ArrowRight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">
        {{ $t("minialertEditOrg") }}
      </p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">
        {{ $t("minialertDeleteOrg") }}
      </p></minialert
    >
    <minialert v-if="isError"
      ><p slot="title">
        {{ $t("minialertError") }}
      </p></minialert
    >
    <popup v-if="isShowFullInformation">
      <!-- Заголовок загрузки информации про одного пользователя -->
      <div
        slot="header"
        v-if="
          !isShowModalDelete &&
            !isShowModalEdit &&
            $apollo.loading &&
            isShowFullInformation
        "
      >
        <h3>{{ $t("loading") }}...</h3>
        <button @click="cancelFullInformation()" class="btn btn-primary">
          {{ $t("cancel") }}
        </button>
      </div>

      <!-- Информация про одного пользователя -->
      <h3
        v-if="
          !isShowModalDelete &&
            !isShowModalEdit &&
            !isShowModalEditTeam &&
            !$apollo.loading
        "
        slot="header"
      >
        {{ $t("organization") }} "{{ organization.name }}"
      </h3>
      <div
        slot="exit"
        @click="cancelFullInformation()"
        v-if="
          !isShowModalDelete &&
            !isShowModalEdit &&
            !isShowModalEditTeam &&
            !$apollo.loading
        "
      >
        ×
      </div>
      <div
        slot="body"
        v-if="
          !isShowModalDelete &&
            !isShowModalEdit &&
            !isShowModalEditTeam &&
            !$apollo.loading
        "
      >
        <p>{{ $t("typeOfOrg") }}: {{ organization.organizationType.name }}</p>
        <p>
          {{ $t("maxNumberOfTeams") }}:
          {{ organization.maxTeamsLimit }}
        </p>
        <p>{{ $t("createdAt") }}: {{ $d(organization.createdAt, "long") }}</p>
        <p v-if="organization.owner !== null">
          {{ $t("organizationOwner") }}: {{ organization.owner.surname }}
          {{ organization.owner.name }}
          {{ organization.owner.patricity }}
        </p>
        <div>
          <p v-if="teamsInOneOrganization.length === 0">
            {{ $t("noTeamOrg") }}
          </p>
          <div v-if="teamsInOneOrganization.length !== 0">
            <p>{{ $t("teamsInOrg") }}:</p>
            <div
              v-for="team in teamsInOneOrganization"
              :key="team.id"
              class="oneOrg"
            >
              <div>
                <h3>{{ $t("nameInanimate") }}: {{ team.name }}</h3>
                <p>{{ team.description }}</p>
                <p>
                  {{ $t("numberOfParticipants") }}: {{ team.maxUsersLimit }}
                </p>
                <div class="btn-group">
                  <button
                    @click="deleteTeamFromOrganization(team.id)"
                    class="btn btn-primary"
                  >
                    {{ $t("delete") }}
                  </button>
                  <button
                    @click="showModalEditTeam(team)"
                    class="btn btn-alternate"
                  >
                    {{ $t("edit") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button @click="showModalEdit()" class="btn btn-primary">
            {{ $t("edit") }}
          </button>
          <button @click="showModalDelete()" class="btn btn-primary">
            {{ $t("delete") }}
          </button>
          <button @click="cancelFullInformation()" class="btn btn-alternate">
            {{ $t("cancel") }}
          </button>
        </div>
      </div>

      <!-- Удаление организации -->
      <h3 v-if="isShowModalDelete" slot="header">
        {{ $t("deleteOrgQuestion") }} "{{ organization.name }}"?
      </h3>
      <div slot="exit" @click="cancelModal()" v-if="isShowModalDelete">×</div>
      <div slot="body" v-if="isShowModalDelete" class="btn-group">
        <button @click="deleteOrganization()" class="btn btn-primary">
          {{ $t("delete") }}
        </button>
        <button @click="cancelModal()" class="btn btn-alternate">
          {{ $t("cancel") }}
        </button>
      </div>

      <!-- Редактирование организации -->
      <h3 v-if="isShowModalEdit" slot="header">
        {{ $t("editOrg") }} "{{ nameOfOrganization }}"?
      </h3>
      <div slot="exit" @click="cancelModal()" v-if="isShowModalEdit">×</div>
      <div slot="body" v-if="isShowModalEdit">
        <form @submit.prevent="editOrganization()">
          <div class="form-group">
            <label for="name" class="form-name">{{
              $t("nameInanimate")
            }}</label>
            <input
              name="name"
              :placeholder="$t('nameInanimate')"
              v-model.trim="$v.oneOrganization.name.$model"
              @blur="$v.oneOrganization.name.$touch()"
              class="form-control"
              :class="{ is_invalid: $v.oneOrganization.name.$error }"
            />
            <div v-if="$v.oneOrganization.name.$error" class="error">
              <span
                v-if="!$v.oneOrganization.name.required"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="maxTeamsLimit" class="form-name">{{
              $t("maxNumberOfTeams")
            }}</label>
            <input
              name="maxTeamsLimit"
              :placeholder="$t('maxNumberOfTeams')"
              v-model.trim="$v.oneOrganization.maxTeamsLimit.$model"
              @blur="$v.oneOrganization.maxTeamsLimit.$touch()"
              class="form-control"
            />
            <div v-if="$v.oneOrganization.maxTeamsLimit.$error" class="error">
              <span
                v-if="!$v.oneOrganization.maxTeamsLimit.required"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
              <span
                v-if="!$v.oneOrganization.maxTeamsLimit.numeric"
                class="form-text danger"
                >{{ $t("requiredNumber") }}</span
              >
            </div>
          </div>

          <div class="btn-group">
            <button
              @click="editOrganization()"
              :disabled="$v.oneOrganization.$invalid"
              class="btn btn-primary"
            >
              {{ $t("save") }}
            </button>
            <button @click="cancelModal()" class="btn btn-alternate">
              {{ $t("cancel") }}
            </button>
          </div>
        </form>
      </div>

      <!-- Редактирование команды организации -->
      <h3 v-if="isShowModalEditTeam" slot="header">
        {{ $t("editTeam") }} "{{ nameOfTeam }}"?
      </h3>
      <div slot="exit" @click="cancelModal()" v-if="isShowModalEditTeam">
        ×
      </div>
      <div slot="body" v-if="isShowModalEditTeam">
        <form @submit.prevent="editTeam()">
          <div class="form-group">
            <label for="name" class="form-name">{{
              $t("nameInanimate")
            }}</label>
            <input
              name="name"
              :placeholder="$t('nameInanimate')"
              v-model.trim="$v.oneTeam.name.$model"
              @blur="$v.oneTeam.name.$touch()"
              class="form-control"
              :class="{ is_invalid: $v.oneTeam.name.$error }"
            />
            <div v-if="$v.oneTeam.name.$error" class="error">
              <span v-if="!$v.oneTeam.name.required" class="form-text danger">{{
                $t("required")
              }}</span>
            </div>
          </div>
          <div class="form-group">
            <label for="description" class="form-name">{{
              $t("description")
            }}</label>
            <textarea
              name="description"
              :placeholder="$t('description')"
              v-model.trim="$v.oneTeam.description.$model"
              @blur="$v.oneTeam.description.$touch()"
              class="form-control"
            />
            <div v-if="$v.oneTeam.description.$error" class="error">
              <span
                v-if="!$v.oneTeam.description.required"
                class="form-text danger"
                >{{ $t("required") }}</span
              >
            </div>
          </div>
          <div class="form-group">
            <label for="name" class="form-name">{{
              $t("numberOfParticipants")
            }}</label>
            <input
              name="maxUsersLimit"
              :placeholder="$t('numberOfParticipants')"
              type="number"
              v-model.trim="$v.oneTeam.maxUsersLimit.$model"
              @blur="$v.oneTeam.maxUsersLimit.$touch()"
              class="form-control"
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
                >{{ $t("requiredNumber") }}</span
              >
            </div>
          </div>
          <div class="btn-group">
            <button
              @click="editTeam()"
              :disabled="$v.oneTeam.$invalid"
              class="btn btn-primary"
            >
              {{ $t("save") }}
            </button>
            <button @click="cancelModal()" class="btn btn-alternate">
              {{ $t("cancel") }}
            </button>
          </div>
        </form>
      </div>
    </popup>
  </div>
</template>

<script>
import ArrowRight from "@/assets/svg/admin/arrow_right.svg?inline";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import popup from "@/components/Popup.vue";
import Loader from "@/components/Loader.vue";
import minialert from "@/components/MiniAlert.vue";
import { required, numeric } from "vuelidate/lib/validators";
import {
  ORGS_QUERY,
  ONE_ORG_QUERY,
  DELETE_ORG_QUERY,
  UPDATE_ORG_QUERY,
  DELETE_TEAM_QUERY,
  UPDATE_TEAM_QUERY,
  TEAMS_IN_ONE_ORG_QUERY
} from "@/graphql/queries";
export default {
  components: { minialert, popup, ArrowRight, BreadCrumbs, Loader },
  apollo: {
    // Список всех организаций с краткой информацией
    organizations: {
      query: ORGS_QUERY
    },
    // Данные про одну организацию
    organization: {
      query: ONE_ORG_QUERY,
      variables() {
        return {
          id: this.organizationId
        };
      }
    },
    // Данные про команду в организации
    teamsInOneOrganization: {
      query: TEAMS_IN_ONE_ORG_QUERY,
      variables() {
        return {
          organizationId: this.organizationId
        };
      }
    }
  },
  data() {
    return {
      index: 0,
      nameOfOrganization: "",
      isShowFullInformation: false,
      isShowModalEdit: false,
      isShowModalDelete: false,
      isShowAlertEdit: false,
      isShowAlertDelete: false,
      isShowModalEditTeam: false,
      findString: "",
      organizationId: -1,
      isError: false,
      oneOrganization: {
        id: -1,
        name: "",
        maxTeamsLimit: -1
      },
      nameOfTeam: "",
      oneTeam: {
        id: -1,
        name: "",
        description: "",
        maxUsersLimit: -1
      }
    };
  },
  validations: {
    // Редактирование данных про организацию
    oneOrganization: {
      name: {
        required
      },
      maxTeamsLimit: {
        required,
        numeric
      }
    },
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
    // Закрыть попап с подробной информацией про организацию
    cancelFullInformation() {
      this.isShowFullInformation = false;
    },
    // Показать попап с подробной информацией про организацию
    showFullInformation(id) {
      this.organizationId = id;
      this.isShowFullInformation = true;
    },
    // Показать попап с удалением организации
    showModalDelete() {
      console.log(this.teamsInOneOrganization);
      this.isShowModalDelete = true;
    },
    // Закрыть все попапы
    cancelModal() {
      this.isShowModalEdit = false;
      this.isShowModalDelete = false;
      this.isShowModalEditTeam = false;
    },
    // Удалить организацию
    deleteOrganization() {
      this.$apollo
        .mutate({
          // Удаляем организацию из БД
          mutation: DELETE_ORG_QUERY,
          variables: {
            id: this.organization.id
          },
          // Обновляем кеш с данными про организацию
          update: cache => {
            let data = cache.readQuery({ query: ORGS_QUERY });
            let index = data.organizations.findIndex(
              el => el.id == this.organization.id
            );
            data.organizations.splice(index, 1);
            cache.writeQuery({ query: ORGS_QUERY, data });
          }
        })
        // Если все успешно
        .then(data => {
          console.log(data);
          this.isShowFullInformation = false; // Закрыть попап с подробной информацией
          this.isShowModalDelete = false; // Закрыть попап с удалением
          this.isShowAlertDelete = true; // Показать окно со статусом удаления
          setTimeout(() => {
            this.isShowAlertDelete = false;
          }, 3000); // Убрать окно через 3 секунды
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false;
          this.isShowModalDelete = false;
          this.isError = true; // Показать окно с ошибкой
          setTimeout(() => {
            this.isError = false;
          }, 3000); // Убрать окно через 3 секунды
        });
    },
    // Показать попап с редактированием организации
    showModalEdit() {
      this.oneOrganization = Object.assign({}, this.organization); // Передать данные про одну организацию в новый объект, чтобы, если мы отредактировали значение, но не сохранили,новые данные не появились
      this.isShowModalEdit = true;
      this.nameOfOrganization = this.organization.name; // Название организации, чтобы во время редактирования это название не менялось
    },
    // Редактировать организацию
    editOrganization() {
      this.isShowModalEdit = false; // Закрыть попап с редактированием
      this.$apollo
        .mutate({
          mutation: UPDATE_ORG_QUERY, // Изменяем данные в БД
          variables: {
            id: this.oneOrganization.id,
            name: this.oneOrganization.name,
            maxTeamsLimit: parseInt(this.oneOrganization.maxTeamsLimit)
          },
          // Обновляем кеш
          update: (cache, { data: { updateOrganization } }) => {
            let data = cache.readQuery({ query: ORGS_QUERY });
            data.organizations.find(
              el => el.id === this.oneOrganization.id
            ).name = this.oneOrganization.name; // Обновить кеш про название
            data.organizations.find(
              el => el.id === this.oneOrganization.id
            ).maxTeamsLimit = this.oneOrganization.maxTeamsLimit;
            cache.writeQuery({ query: ORGS_QUERY, data });
            console.log(updateOrganization);
          },
          optimisticResponse: {
            // Ответ, пока наш запрос идет до сервера и обратно
            __typename: "Mutation",
            createOrganization: {
              __typename: "Organization",
              id: -1,
              name: this.oneOrganization.name,
              maxTeamsLimit: parseInt(this.oneOrganization.maxTeamsLimit)
            }
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowAlertEdit = true; // Показать окно со статусом
          setTimeout(() => {
            this.isShowAlertEdit = false;
          }, 3000); // Закрыть окно через 3 секунды
        })
        // В случае неудачи
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false; // Закрыть все попапы
          this.isError = true; // Показать окно с ошибкой
          setTimeout(() => {
            this.isError = false;
          }, 3000); // Закрыть окно через 3 секунды
        });
    },
    // Удалить человека из организации
    deleteTeamFromOrganization(id) {
      console.log(id);
      this.$apollo
        .mutate({
          mutation: DELETE_TEAM_QUERY, // Обновляем в БД
          variables: {
            id: id
          },
          // Обновляем кеш
          update: cache => {
            let data = cache.readQuery({ query: ORGS_QUERY });
            let index = data.organization.teams.findIndex(
              el => el.id == this.organization.teams.id
            );
            data.organization.teams.splice(index, 1);
            cache.writeQuery({ query: ORGS_QUERY, data });
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowFullInformation = false;
          this.isShowModalDelete = false;
          this.isShowAlertDelete = true;
          setTimeout(() => {
            this.isShowAlertDelete = false;
          }, 3000);
        })
        // В случае неудачи
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false;
          this.isShowModalDelete = false;
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        });
    },
    // Показать попп с редактированием команды
    showModalEditTeam(team) {
      this.nameOfTeam = team.name;
      this.oneTeam = Object.assign({}, team);
      this.isShowModalEditTeam = true;
      console.log(team.id);
    },
    // Редактировать команду
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
              query: TEAMS_IN_ONE_ORG_QUERY,
              variables: { organizationId: this.organizationId }
            });
            data.teamsInOneOrganization.find(
              el => el.id === this.oneTeam.id
            ).name = this.oneTeam.name;
            data.teamsInOneOrganization.find(
              el => el.id === this.oneTeam.id
            ).description = this.oneTeam.description;
            data.teamsInOneOrganization.find(
              el => el.id === this.oneTeam.id
            ).maxUsersLimit = this.oneTeam.maxUsersLimit;
            cache.writeQuery({
              query: TEAMS_IN_ONE_ORG_QUERY,
              variables: { organizationId: this.organizationId },
              data
            });
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowAlertEdit = true;
          setTimeout(() => {
            this.isShowAlertEdit = false;
          }, 3000);
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false;
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        });
    }
  },
  computed: {
    // Фильтрация организаций
    filterOrganization() {
      if (this.findString !== "") {
        return this.organizations.filter(el => {
          // Проверяем по названию
          return (
            el.name.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 && el.name !== ""
          );
        });
      } else {
        return this.organizations;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_grid.scss";
@import "@/styles/_classes.scss";
.teams-list {
  border: 1px solid black;
  padding: 5px;
}
.oneOrg {
  padding: 1%;
  background: $violet;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: $white;
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
