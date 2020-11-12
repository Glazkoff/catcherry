<template>
  <div class="main">
    <popup v-if="isShowFullInformation">
      <!-- Заголовок загрузки информации про одного пользователя -->
      <h3 slot="header" v-if="$apollo.loading">
        <i18n path="loading">{{ $t("loading") }}</i18n
        >...
      </h3>

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
        <i18n path="organization">{{ $t("organization") }}</i18n> "{{
          organization.name
        }}"
      </h3>
      <div
        slot="body"
        v-if="
          !isShowModalDelete &&
            !isShowModalEdit &&
            !isShowModalEditTeam &&
            !$apollo.loading
        "
      >
        <p>
          <i18n path="typeOfOrg">{{ $t("typeOfOrg") }}</i18n
          >: {{ organization.organizationType.name }}
        </p>
        <p>
          <i18n path="maxNumberOfTeams">{{ $t("maxNumberOfTeams") }}</i18n
          >:
          {{ organization.maxTeamsLimit }}
        </p>
        <p>
          <i18n path="createdAt">{{ $t("createdAt") }}</i18n
          >: {{ organization.createdAt }}
        </p>
        <p v-if="organization.owner !== null">
          <i18n path="organizationOwner">{{ $t("organizationOwner") }}</i18n
          >: {{ organization.owner.surname }} {{ organization.owner.name }}
          {{ organization.owner.patricity }}
        </p>
        <div>
          <p v-if="teamsInOneOrganization.length === 0">
            <i18n path="noTeamOrg">{{ $t("noTeamOrg") }}</i18n>
          </p>
          <div v-if="teamsInOneOrganization.length !== 0">
            <p>
              <i18n path="teamsInOrg">{{ $t("teamsInOrg") }}</i18n
              >:
            </p>
            <div
              v-for="team in teamsInOneOrganization"
              :key="team.id"
              class="teams-list"
            >
              <div>
                <p>
                  <i18n path="nameInanimate">{{ $t("nameInanimate") }}</i18n
                  >: {{ team.name }}
                </p>
                <p>{{ team.description }}</p>
                <p>
                  <i18n path="numberOfParticipants">{{
                    $t("numberOfParticipants")
                  }}</i18n
                  >: {{ team.maxUsersLimit }}
                </p>
                <div class="btn-group">
                  <button @click="deleteTeamFromOrganization(team.id)">
                    <i18n path="delete">{{ $t("delete") }}</i18n>
                  </button>
                  <button @click="showModalEditTeam(team)">
                    <i18n path="edit">{{ $t("edit") }}</i18n>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button @click="showModalEdit()">
            <i18n path="edit">{{ $t("edit") }}</i18n>
          </button>
          <button @click="showModalDelete()">
            <i18n path="delete">{{ $t("delete") }}</i18n>
          </button>
          <button @click="cancelFullInformation()">
            <i18n path="cancel">{{ $t("cancel") }}</i18n>
          </button>
        </div>
      </div>

      <!-- Удаление организации -->
      <h3 v-if="isShowModalDelete" slot="header">
        <i18n path="deleteOrgQuestion">{{ $t("deleteOrgQuestion") }}</i18n> "{{
          organization.name
        }}"?
      </h3>
      <div slot="body" v-if="isShowModalDelete" class="btn-group">
        <button
          @click="deleteOrganization()"
          slot="action"
          class="modal-default-button"
        >
          <i18n path="delete">{{ $t("delete") }}</i18n>
        </button>
        <button @click="cancelModal()">
          <i18n path="cancel">{{ $t("cancel") }}</i18n>
        </button>
      </div>

      <!-- Редактирование организации -->
      <h3 v-if="isShowModalEdit" slot="header">
        <i18n path="editOrg">{{ $t("editOrg") }}</i18n> "{{
          nameOfOrganization
        }}"?
      </h3>
      <div slot="body" v-if="isShowModalEdit">
        <form @submit.prevent="editOrganization()">
          <label for="name"
            ><i18n path="nameInanimate">{{ $t("nameInanimate") }}</i18n></label
          >
          <input
            name="name"
            placeholder="Название"
            v-model.trim="$v.oneOrganization.name.$model"
            @blur="$v.oneOrganization.name.$touch()"
          />
          <div v-if="$v.oneOrganization.name.$error" class="error">
            <span v-if="!$v.oneOrganization.name.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
          </div>
          <label for="name"
            ><i18n path="maxNumberOfTeams">{{
              $t("maxNumberOfTeams")
            }}</i18n></label
          >
          <input
            name="maxTeamsLimit"
            placeholder="0"
            v-model.trim="$v.oneOrganization.maxTeamsLimit.$model"
            @blur="$v.oneOrganization.maxTeamsLimit.$touch()"
          />
          <div v-if="$v.oneOrganization.maxTeamsLimit.$error" class="error">
            <span v-if="!$v.oneOrganization.maxTeamsLimit.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
            <span v-if="!$v.oneOrganization.maxTeamsLimit.numeric"
              ><i18n path="requiredNumber">{{
                $t("requiredNumber")
              }}</i18n></span
            >
          </div>
          <div class="btn-group">
            <button
              @click="editOrganization()"
              :disabled="$v.oneOrganization.$invalid"
            >
              <i18n path="save">{{ $t("save") }}</i18n>
            </button>
            <button @click="cancelModal()">
              <i18n path="cancel">{{ $t("cancel") }}</i18n>
            </button>
          </div>
        </form>
      </div>

      <!-- Редактирование команды организации -->
      <h3 v-if="isShowModalEditTeam" slot="header">
        <i18n path="editTeam">{{ $t("editTeam") }}</i18n> "{{ nameOfTeam }}"?
      </h3>
      <div slot="body" v-if="isShowModalEditTeam">
        <form @submit.prevent="editTeam()">
          <label for="name"
            ><i18n path="nameInanimate">{{ $t("nameInanimate") }}</i18n></label
          >
          <input
            name="name"
            placeholder="Название"
            v-model.trim="$v.oneTeam.name.$model"
            @blur="$v.oneTeam.name.$touch()"
          />
          <div v-if="$v.oneTeam.name.$error" class="error">
            <span v-if="!$v.oneTeam.name.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
          </div>
          <label for="description"
            ><i18n path="description">{{ $t("description") }}</i18n></label
          >
          <textarea
            name="description"
            placeholder="Описание"
            v-model.trim="$v.oneTeam.description.$model"
            @blur="$v.oneTeam.description.$touch()"
          />
          <div v-if="$v.oneTeam.description.$error" class="error">
            <span v-if="!$v.oneTeam.description.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
          </div>
          <label for="name"
            ><i18n path="numberOfParticipants">{{
              $t("numberOfParticipants")
            }}</i18n></label
          >
          <input
            name="maxUsersLimit"
            placeholder="0"
            type="number"
            v-model.trim="$v.oneTeam.maxUsersLimit.$model"
            @blur="$v.oneTeam.maxUsersLimit.$touch()"
          />
          <div v-if="$v.oneTeam.maxUsersLimit.$error" class="error">
            <span v-if="!$v.oneTeam.maxUsersLimit.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
            <span v-if="!$v.oneTeam.maxUsersLimit.numeric"
              ><i18n path="requiredNumber">{{
                $t("requiredNumber")
              }}</i18n></span
            >
          </div>
          <div class="btn-group">
            <button @click="editTeam()" :disabled="$v.oneTeam.$invalid">
              <i18n path="save">{{ $t("save") }}</i18n>
            </button>
            <button @click="cancelModal()">
              <i18n path="cancel">{{ $t("cancel") }}</i18n>
            </button>
          </div>
        </form>
      </div>
    </popup>

    <h2>
      <i18n path="listOrganization">{{ $t("listOrganization") }}</i18n>
    </h2>
    <h3 v-if="$apollo.queries.organizations.loading">
      <i18n path="loading">{{ $t("listOrganization") }}</i18n
      >...
    </h3>
    <div v-if="!$apollo.queries.organizations.loading">
      <h6 v-if="organizations.length == 0">
        <i18n path="noOrg">{{ $t("noOrg") }}</i18n>
      </h6>
      <div v-if="organizations.length > 0">
        <input
          v-model="findString"
          type="text"
          placeholder="Поиск по организациям"
        />
        <div
          class="oneOrganization"
          v-for="organization in filterOrganization"
          :key="organization.id"
        >
          <div>
            <p>{{ organization.name }}</p>
            <p>№ {{ organization.id }}</p>
          </div>
          <a @click="showFullInformation(organization.id)"
            ><i18n path="more">{{ $t("more") }}</i18n></a
          >
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">
        <i18n path="minialertEditOrg">{{ $t("minialertEditOrg") }}</i18n>
      </p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">
        <i18n path="minialertDeleteOrg">{{ $t("minialertDeleteOrg") }}</i18n>
      </p></minialert
    >
    <minialert v-if="isError"
      ><p slot="title">
        <i18n path="minialertError">{{ $t("minialertError") }}</i18n>
      </p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/admin/Popup.vue";
import minialert from "@/components/admin/MiniAlert.vue";
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
  components: { minialert, popup },
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
button {
  width: 100%;
  margin: 0 5%;
}
.oneOrganization {
  display: flex;
  border: 2px solid black;
  justify-content: space-between;
}
.btn-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.teams-list {
  border: 1px solid black;
  padding: 5px;
}
textarea {
  display: block;
  width: 80%;
  height: 100px;
}
</style>
