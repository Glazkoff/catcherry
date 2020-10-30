<template>
  <div class="main">
    <popup v-if="isShowFullInformation">
      <!-- Заголовок загрузки информации про одного пользователя -->
      <h3 slot="header" v-if="$apollo.loading">
        Загрузка...
      </h3>

      <!-- Информация про одного пользователя -->
      <h3
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
        slot="header"
      >
        Организация "{{ organization.name }}"
      </h3>
      <div
        slot="body"
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
      >
        <p>Тип организации: {{ organization.organizationType.name }}</p>
        <p>
          Максимальное количество команд в организации:
          {{ organization.maxTeamsLimit }} команд
        </p>
        <p>Дата создания организации: {{ organization.createdAt }}</p>
        <p v-if="organization.owner !== null">
          Владелец организации:
          {{ organization.owner.surname }} {{ organization.owner.name }}
          {{ organization.owner.patricity }}
        </p>
        <div class="teams-list">
          <p v-if="organization.teams.length === 0">
            Команд у данной организации нет
          </p>
          <div v-if="organization.teams.length !== 0">
            <p>Список команд в данной организации:</p>
            <div v-for="team in organization.teams" :key="team.id">
              <div>
                <p>Название команды: {{ team.name }}</p>
                <p>{{ team.description }}</p>
                <p>Количество участников: {{ team.maxUsersLimit }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-group">
          <button @click="showModalEdit()">Редактировать</button>
          <button @click="showModalDelete()">Удалить</button>
          <button @click="cancelFullInformation()">
            Отменить
          </button>
        </div>
      </div>

      <!-- Удаление пользователя -->
      <h3 v-if="isShowModalDelete" slot="header">
        Вы действительно хотите удалить организацию "{{ organization.name }}"?
      </h3>
      <div slot="body" v-if="isShowModalDelete" class="btn-group">
        <button
          @click="deleteOrganization()"
          slot="action"
          class="modal-default-button"
        >
          <i18n path="delete"
            ><span place="title">{{ $t("delete") }}</span></i18n
          >
        </button>
        <button @click="cancelModal()">
          <i18n path="cancel"
            ><span place="title">{{ $t("cancel") }}</span></i18n
          >
        </button>
      </div>

      <!-- Редактирование пользователя -->
      <h3 v-if="isShowModalEdit" slot="header">
        Редактировать организацию "{{ nameOfOrganization }}"?
      </h3>
      <div slot="body" v-if="isShowModalEdit">
        <form @submit.prevent="editOrganization()">
          <label for="name">Название</label>
          <input
            name="name"
            v-model="organization.name"
            placeholder="Название"
          />
          <div class="btn-group">
            <button @click="editOrganization()">Сохранить</button>
            <button @click="cancelModal()">Отменить</button>
          </div>
        </form>
      </div>
    </popup>

    <h2>Список организаций</h2>
    <h3 v-if="$apollo.loading">
      Загрузка...
    </h3>
    <div v-if="!$apollo.loading">
      <h6 v-if="organizations.length == 0">
        К сожалению, пока пользователей нет
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
          <a @click="showFullInformation(organization.id)">Подробнее</a>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">Вы успешно изменили орагнизацию</p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">Вы успешно удалили организацию</p></minialert
    >
    <minialert v-if="isError"
      ><p slot="title">Произошла какая-то ошибка. Извините</p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/admin/Popup.vue";
import minialert from "@/components/admin/MiniAlert.vue";
import {
  ORGS_QUERY,
  ONE_ORG_QUERY,
  DELETE_ORG_QUERY,
  UPDATE_ORG_QUERY
} from "@/graphql/queries";
export default {
  components: { minialert, popup },
  apollo: {
    organizations: {
      query: ORGS_QUERY
    },
    organization: {
      query: ONE_ORG_QUERY,
      variables() {
        return {
          id: this.organizationId
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
      findString: "",
      organizationId: -1,
      isError: false
    };
  },
  methods: {
    cancelFullInformation() {
      this.isShowFullInformation = false;
    },
    showFullInformation(id) {
      this.organizationId = id;
      this.isShowFullInformation = true;
    },
    showModalDelete() {
      this.isShowModalDelete = true;
    },
    cancelModal() {
      this.isShowModalEdit = false;
      this.isShowModalDelete = false;
    },
    deleteOrganization() {
      this.$apollo
        .mutate({
          mutation: DELETE_ORG_QUERY,
          variables: {
            id: this.organization.id
          },
          update: cache => {
            let data = cache.readQuery({ query: ORGS_QUERY });
            let index = data.organizations.findIndex(
              el => el.id == this.organization.id
            );
            data.organizations.splice(index, 1);
            cache.writeQuery({ query: ORGS_QUERY, data });
          }
        })
        .then(data => {
          console.log(data);
          this.isShowFullInformation = false;
          this.isShowModalDelete = false;
          this.isShowAlertDelete = true;
          setTimeout(() => {
            this.isShowAlertDelete = false;
          }, 3000);
        })
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
    showModalEdit() {
      this.isShowModalEdit = true;
      this.nameOfOrganization = this.organization.name;
    },
    editOrganization() {
      this.isShowModalEdit = false;
      this.$apollo
        .mutate({
          mutation: UPDATE_ORG_QUERY,
          variables: {
            id: this.organization.id,
            name: this.organization.name
          },
          update: (cache, { data: { updateOrganization } }) => {
           let data = cache.readQuery({ query: ORGS_QUERY });
           console.log(data);
           data.organizations.find(
             el => el.id === this.organization.id
           ).name = this.organization.name;
           cache.writeQuery({ query: ORGS_QUERY, data });
           console.log(updateOrganization);
          },
          // optimisticResponse: {
          //   __typename: "Mutation",
          //   createOrganization: {
          //     __typename: "Organization",
          //     id: -1,
          //     name: this.organization.name
          //   }
          // }
        })
        .then(data => {
          console.log(data);
          this.isShowAlertEdit = true;
          setTimeout(() => {
            this.isShowAlertEdit = false;
          }, 3000);
        })
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
    filterOrganization() {
      if (this.findString !== "") {
        return this.organizations.filter(el => {
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
</style>
