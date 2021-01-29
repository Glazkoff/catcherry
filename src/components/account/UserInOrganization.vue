<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>
    <!-- попап для просмотра информации об организации -->
    <popup v-if="isShowInfoModal">
      <h2 slot="header">Организация "{{ nameOfOrganization }}"</h2>
      <div slot="body">
        {{ oneOrganization.name }}
        <span
          >Вы можете вступить в организацию или сразу вступить в команду</span
        >
        <h3>Команды</h3>
        <!-- список команд в организации -->
        <div class="row d-flex">
          <input
            v-model.trim="findString"
            type="text"
            placeholder="Введите название команды, которую вы хотите найти"
            class="form-control block find dark"
          />
        </div>
        <div v-if="!team">
          <h5>В организации пока нет ни одной команды</h5>
        </div>
        <div v-else>
          <div class="oneTeam" v-for="teamUs in filterTeam" :key="teamUs.id">
            <p>№{{ teamUs.id }}</p>
            <p>
              <b>{{ teamUs.name }}</b>
            </p>
            <span>{{ teamUs.description }}</span>
            <button class="btn btn-link" @click="requestInTeam(teamUs.id)">
              Подать заявку
            </button>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button
          class="modal-default-button btn btn-secondary"
          @click="isShowInfoModal = false"
        >
          Закрыть
        </button>
      </div>
    </popup>
    <minialert v-if="isShowAlertAddReq"
      ><p slot="title">Заявка в команду успешно подана</p></minialert
    >
    <div class="container">
      <div class="container">
        <!-- строка поиска организаций  -->
        <div class="row d-flex">
          <input
            v-model.trim="findString"
            type="text"
            placeholder="Введите название организации, которую вы хотите найти"
            class="form-control block find dark"
          />
        </div>
        <!-- вывод массива всех организаций  -->
        <div
          class="card"
          v-for="organization in filterOrganization"
          :key="organization.id"
        >
          <a class="orgFoto"></a>
          <div class="card_body">
            <h3>{{ organization.name }}</h3>
            <small>№ {{ organization.id }}</small>
          </div>
          <div class="card_action">
            <ArrowRight
              @click="showModalEdit(organization)"
              class="btn-link"
            ></ArrowRight>
          </div>
        </div>
        <!-- если оранизаций нет или они не найдены по запросу, то можно создать новую  -->
        <div class="organizationNotSearch" v-if="filterOrganization == ''">
          <Stub>
            <div slot="body">
              <h3 class="mb-4">Организации не найдены</h3>
              <button class="btn btn-primary" @click="isAddOrganization = true">
                Создать
              </button>
            </div>
          </Stub>
        </div>
      </div>
    </div>
    <!-- попап для создания новой организации  -->
    <popup v-if="isAddOrganization">
      <h3 slot="header">
        Регистрация организации
      </h3>
      <div slot="body">
        <!-- форма добавления новой организации  -->
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
          <!-- тип орагизации должен выводиться из таблицы organizationTypes -->
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
    <!-- окошко информации о добавлении организации  -->
    <minialert v-if="isShowAlertAdd"
      ><p slot="title">Вы успешно добавили организацию</p></minialert
    >
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import ArrowRight from "@/assets/svg/admin/arrow_right.svg?inline";
import popup from "@/components/Popup.vue";
import minialert from "@/components/MiniAlert.vue";
import Stub from "@/components/Stub.vue";
import {
  ORGS_QUERY,
  ONE_ORG_QUERY,
  CREATE_ORGANIZATION,
  TEAMS_QUERY,
  TEAM_IN_ORG_QUERY,
  CREATE_USER_IN_TEAM
} from "@/graphql/queries";
import { required } from "vuelidate/lib/validators";
import { ONE_USER_IN_TEAMS_QUERY } from "../../graphql/queries";
export default {
  name: "UserInOrganization",
  components: { popup, minialert, ArrowRight, BreadCrumbs, Stub },
  data() {
    return {
      findString: "",
      findTeam: "",
      search: 0,
      oneOrganization: {},
      nameOfOrganization: "",
      tabFirst: true,
      isShowInfoModal: false,
      isShowAlertAdd: false,
      isShowAlertAddReq: false,
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
    // массив всех организаций
    organizations: {
      query: ORGS_QUERY
    },
    // TODO: ПЕРЕДЕЛАТЬ!
    // массив информации об одной организации
    organization: {
      query: ONE_ORG_QUERY,
      variables() {
        return {
          id: this.$store.getters.decodedToken.id
        };
      }
    },
    // массив всех команд
    teams: {
      query: TEAMS_QUERY
    },
    // массив команд, находящихся в организации
    team: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: this.organizationId
        };
      }
    }
  },
  // валидация формы
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
    // метод корректного отображения информации об организации в попапе
    showModalEdit(organization) {
      (this.nameOfOrganization = organization.name),
        (this.isShowInfoModal = true);
      this.index = this.organizations.findIndex(
        el => el.id === organization.id
      );
      this.oneOrganization = Object.assign(this.oneOrganization, organization);
      this.organizationId = parseInt(organization.id);
    },
    submit() {
      // создание новой организации
      this.$apollo
        .mutate({
          mutation: CREATE_ORGANIZATION,
          variables: {
            name: this.name,
            ownerId: parseInt(this.ownerId),
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
      // вывод инфомационного окошка о создании организации
      this.isShowAlertAdd = true;
      setTimeout(() => {
        this.isShowAlertAdd = false;
      }, 3000);
    },
    // метод создания заявки в команду
    requestInTeam(teamId) {
      this.$apollo.mutate({
        mutation: CREATE_USER_IN_TEAM,
        variables: {
          userId: this.$route.params.id,
          teamId: teamId,
          status: "Не принят",
          roleId: this.$route.params.id //FIXME: определить начальную роль при подаче заявки
        },
        update: (cache, { data: { createUserInTeam } }) => {
          let data = cache.readQuery({
            query: ONE_USER_IN_TEAMS_QUERY,
            variables: { userId: this.$route.params.id }
          });
          data.oneUserInTeams.push(createUserInTeam);
          cache.writeQuery({
            query: ONE_USER_IN_TEAMS_QUERY,
            variables: { userId: this.$route.params.id },
            data
          });
        }
      });
      // появление окошка информации о создании заявки
      this.isShowInfoModal = false;
      this.isShowAlertAddReq = true;
      setTimeout(() => {
        this.isShowAlertAddReq = false;
      }, 3000);
    }
  },
  computed: {
    // фильтрация организаций поиском по названию
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
    // поиск организации по ее номеру
    filterTeam() {
      if (this.findTeam !== "") {
        return this.team.filter(el => {
          return (
            el.name.toLowerCase().indexOf(this.findTeam.toLowerCase()) !== -1 &&
            el.name !== ""
          );
        });
      } else {
        return this.team;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_grid.scss";
*,
*::before,
*::after {
  box-sizing: border-box;
}
.organizationNotSearch {
  text-align: center;
}
.organizationNotSearch button {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}
.orgFoto {
  height: 48px;
  width: 48px;
  background-color: $gray;
  border-radius: 25px;
  border: 2px solid $bright_violet;
  color: $gray;
  margin-right: 1em;
}
.formSearch {
  background: $violet_2;
  border: 1px solid $violet_2;
  box-sizing: border-box;
  border-radius: 0px 15px 15px 0px;
  color: $gray;
  padding-top: 3px;
  padding-bottom: 3px;
  height: 50px;
  outline: none;
  margin: 20px 0;
}
.formSearchIcon {
  background: $violet_2;
  border: 1px solid $violet_2;
  border-radius: 15px 0px 0px 15px;
  color: $gray;
  padding-top: 13px;
  padding-left: 11px;
  padding-bottom: 10px;
  outline: none;
  margin: 20px 0;
}
.formSearchIconSvg {
  margin-left: 2px;
  margin-top: 3px;
  margin-right: 4px;
}
.oneTeam p {
  display: inline-block;
  margin-right: 10px;
}
.oneOrganization {
  padding: 20px;
  margin: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px #868686;
}
p {
  line-height: 2px !important;
}
h3 {
  margin-block-start: 0em;
  margin-block-end: 0.1em;
}
small {
  color: $gray;
}
</style>
