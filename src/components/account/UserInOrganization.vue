<template>
  <div class="search_organization account-view">
    <popup v-if="isShowModalEdit">
      <h3 slot="header">Организация "{{ nameOfOrganization }}"</h3>
      <div slot="body">
        {{ oneOrganization.name }}
        <span
          >Вы можете вступить в организацию или сразу вступить в команду</span
        >
        <h3>Участие в командах</h3>
        <hr />
        <h3>Заявки в команды</h3>
        <hr />
        <h5>Поиск команды</h5>
        <input type="text" class="form-text" placeholder="Название команды" />
        <h3>Команды</h3>
        <div v-if="!team">
          <h5>В организации пока нет ни одной команды</h5>
        </div>
        <div class="oneTeam" v-else>
          <p>№{{ team.id }}</p>
          <p>
            <b>{{ team.name }}</b>
          </p>
          <span>{{ team.description }}</span>
          <button class="btn btn-link">Подать заявку</button>
        </div>
      </div>
      <div slot="action">
        <button
          class="modal-default-button btn btn-secondary"
          @click="isShowModalEdit = false"
        >
          Закрыть
        </button>
      </div>
    </popup>
    <h1>Поиск организации</h1>
    <div class="tabs">
      <input
        type="radio"
        name="tab-btn"
        id="tab-btn-1"
        value=""
        @click="tabFirst = true"
        checked
      />
      <label for="tab-btn-1">По названию</label>
      <input
        type="radio"
        name="tab-btn"
        id="tab-btn-2"
        value=""
        @click="tabFirst = false"
      />
      <label for="tab-btn-2">По номеру</label>

      <div id="content-1">
        <h3>Введите название организации</h3>
        <form @submit.prevent="checkForm">
          <input
            v-model="findString"
            type="text"
            placeholder="Поиск по организациям"
            class="form-control"
          /><br />
          <button class="btn btn-primary">Найти</button>
        </form>
      </div>
      <div id="content-2">
        <h3>Введите номер организации</h3>
        <form @submit.prevent="checkForm">
          <input
            type="number"
            placeholder="Номер организации"
            v-model="search"
            class="form-control"
          /><br />
          <button class="btn btn-primary">Найти</button>
        </form>
      </div>
    </div>
    <div class="result_organization">
      <h2>Список организаций</h2>
      <hr />
      <div v-if="tabFirst">
        <div
          class="oneOrganization"
          v-for="organization in filterOrganization"
          :key="organization.id"
        >
          <p>№{{ organization.id }}</p>
          <p>
            <b>{{ organization.name }}</b>
          </p>
          <p>{{ organization.owner }}</p>
          <p>{{ organization.organizationType }}</p>
          <button @click="showModalEdit(organization)" class="btn-link">
            Подробнее
          </button>
        </div>
        <div v-if="filterOrganization == ''">
          <h4>Организации не найдены</h4>
          <button class="btn btn-primary" @click="isAddOrganization = true">
            Создать
          </button>
        </div>
      </div>
      <div v-else style="color: gray;">
        <div v-for="(item, index) in searchOrgIndex" :key="index">
          <div class="result_card">
            <h4>Заявка на вступление в команду {{ item.name }}</h4>
            <span>Номер: {{ item.id }}</span
            ><br />
            <span>Владелец: {{ item.owner }}</span
            ><br />
            <button class="btn-link" @click="showModalEdit(item)">
              Подробнее
            </button>
          </div>
        </div>
      </div>
    </div>

    <popup v-if="isAddOrganization">
      <h3 slot="header">
        Регистрация организации
      </h3>
      <div slot="body">
        <form @submit.prevent="submit">
          <p>* - обязательное поле</p>
          <label>Название организации</label><br />
          <input
            :disabled="signUpLoading"
            type="text"
            v-model.trim="$v.name.$model"
            placeholder="Организация 'Техностек'"
            class="form-control form-text"
          />
          <div v-if="$v.name.$error" class="error">
            <span v-if="!$v.name.required">Organization name is required</span>
            <span v-else-if="!$v.name.alpha"
              >Organization name accepts only alphabet characters.</span
            >
          </div>
          <br />
          <label>Руководитель организации</label><br />
          <input
            :disabled="signUpLoading"
            type="number"
            v-model.trim="$v.ownerId.$model"
            placeholder="Owner ID"
            class="form-control form-text"
          />
          <div v-if="$v.ownerId.$error" class="error">
            <span v-if="!$v.ownerId.required">Owner is required</span>
          </div>
          <br />
          <label>Тип организации</label><br />
          <input
            type="number"
            :disabled="signUpLoading"
            v-model.trim="$v.organizationTypeId.$model"
            placeholder="Organization type"
            class="form-control form-text"
          />
          <div v-if="$v.organizationTypeId.$error" class="error">
            <span v-if="!$v.organizationTypeId.required"
              >Type of organization is required</span
            >
          </div>
          <br />
          <label>Количество команд</label><br />
          <input
            :disabled="signUpLoading"
            type="number"
            v-model.trim="$v.maxTeamsLimit.$model"
            placeholder="Limit"
            class="form-control form-text"
          />
          <div v-if="$v.maxTeamsLimit.$error" class="error">
            <span v-if="!$v.maxTeamsLimit.required"
              >Limit of teams is required</span
            >
          </div>
          <br />
          <input
            :disabled="signUpLoading"
            type="submit"
            class="btn btn-primary"
            value="Зарегистрировать организацию"
          /><br />
        </form>
        <button class="btn btn-secondary" @click="isAddOrganization = false">
          <i18n path="cancel"
            ><span place="title">{{ $t("cancel") }}</span></i18n
          >
        </button>
      </div>
    </popup>
    <minialert v-if="isShowAlertAdd"
      ><p slot="title">Вы успешно добавили организацию</p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/account/Popup.vue";
import minialert from "@/components/account/MiniAlert.vue";
import {
  ORGS_QUERY,
  ONE_ORG_QUERY,
  CREATE_ORGANIZATION,
  TEAMS_QUERY,
  TEAM_IN_ORG_QUERY
} from "@/graphql/queries";
import { required } from "vuelidate/lib/validators";
export default {
  name: "UserInOrganization",
  components: { popup, minialert },
  data() {
    return {
      findString: "",
      search: 0,
      oneOrganization: {},
      nameOfOrganization: "",
      tabFirst: true,
      isShowModalEdit: false,
      isShowAlertAdd: false,
      isAddOrganization: false,
      name: "",
      ownerId: 124,
      organizationId: 7,
      organizationTypeId: 1,
      maxTeamsLimit: 1,
      signUpLoading: false
    };
  },
  apollo: {
    organizations: {
      query: ORGS_QUERY
    },
    organization: {
      query: ONE_ORG_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    },
    teams: {
      query: TEAMS_QUERY
    },
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: this.organizationId
        };
      }
    }
  },
  validations: {
    name: {
      required,
      alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
    },
    ownerId: {
      required
    },
    organizationTypeId: {
      required
    },
    maxTeamsLimit: {
      required
    }
  },
  methods: {
    showModalEdit(organization) {
      (this.nameOfOrganization = organization.name),
        (this.isShowModalEdit = true);
      this.index = this.organizations.findIndex(
        el => el.id === organization.id
      );
      this.oneOrganization = Object.assign(this.oneOrganization, organization);
      this.organizationId = parseInt(organization.id);
    },
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        this.signUpLoading = true;
        this.$apollo
          .mutate({
            mutation: CREATE_ORGANIZATION,
            variables: {
              name: this.name,
              ownerId: this.ownerId,
              organizationTypeId: this.organizationTypeId,
              maxTeamsLimit: this.maxTeamsLimit
            },
            update: (cache, { data: { createOrganization } }) => {
              let data = cache.readQuery({ query: ORGS_QUERY });
              data.organizations.push(createOrganization);
              cache.writeQuery({ query: ORGS_QUERY, data });
            },
            optimisticResponse: {
              __typename: "Mutation",
              createOrganization: {
                __typename: "Organization",
                id: -1,
                name: this.name,
                ownerId: this.ownerId,
                organizationTypeId: this.organizationTypeId,
                maxTeamsLimit: this.maxTeamsLimit
              }
            }
          })
          .then(resp => {
            this.signUpLoading = false;
            this.isAddOrganization = false;
            console.log(resp);
          })
          .catch(error => {
            this.signUpLoading = false;
            console.error(error);
          });
        this.isShowAlertAdd = true;
        setTimeout(() => {
          this.isShowAlertAdd = false;
        }, 3000);
      }
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
    },
    searchOrgIndex() {
      let obj = this.organizations;
      let newArray = [];
      const search = this.search;
      for (let key in obj) {
        let el = obj[key];
        if (el.id.toLowerCase().indexOf(search) != -1) newArray.push(el);
      }
      return newArray;
    }
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}
.oneTeam p {
  display: inline-block;
  margin-right: 10px;
}
.tabs {
  font-size: 0;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}

.tabs > input[type="radio"] {
  display: none;
}

.tabs > div {
  /* скрыть контент по умолчанию */
  display: none;
  border: 1px solid #e0e0e0;
  padding: 10px 15px;
  font-size: 16px;
}

/* отобразить контент, связанный с вабранной радиокнопкой (input type="radio") */
#tab-btn-1:checked ~ #content-1,
#tab-btn-2:checked ~ #content-2,
#tab-btn-3:checked ~ #content-3 {
  display: block;
}

.tabs > label {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  padding: 2px 8px;
  font-size: 16px;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  cursor: pointer;
  position: relative;
  top: 1px;
}

.tabs > label:not(:first-of-type) {
  border-left: none;
}

.tabs > input[type="radio"]:checked + label {
  background-color: #fff;
  border-bottom: 1px solid #fff;
}
</style>
