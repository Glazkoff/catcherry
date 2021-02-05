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
            v-model.trim="findTeam"
            type="text"
            placeholder="Введите название команды, которую вы хотите найти"
            class="form-control block find dark"
          />
        </div>
        <div v-if="!teamsInOrganization">
          <h5>В организации пока нет ни одной команды</h5>
        </div>
        <div v-else>
          <div class="oneTeam" v-for="team in filterTeam" :key="team.id">
            <p>
              <b>{{ team.name }}</b>
            </p>
            <span>{{ team.description }}</span>
            <div v-if="checkStatusUser(team) == -1">
              <button class="btn btn-link" @click="requestInTeam(team.id)">
                Подать заявку
              </button>
            </div>
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
            placeholder="Введите название организации, которую вы хотите найти, или имя ее владельца"
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
            <small
              >Владелец: {{ organization.owner.surname }}
              {{ organization.owner.name }}
              {{ organization.owner.patricity }}</small
            >
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
              <button class="btn btn-primary">
                <router-link
                  :to="{
                    name: 'NewOrganization'
                  }"
                  active-class="nav-checked"
                >
                  Создать
                </router-link>
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
            :class="{ is_invalid: $v.name.$error }"
          />
          <div v-if="$v.name.$error" class="error">
            <span v-if="!$v.name.required">Organization name is required</span>
            <span v-else-if="!$v.name.alpha"
              >Organization name accepts only alphabet characters.</span
            >
          </div>
          <!-- тип орагизации должен выводиться из таблицы organizationTypes -->
          <label>Тип организации</label><br />
          <input
            type="number"
            :disabled="signUpLoading"
            v-model.trim="$v.organizationTypeId.$model"
            placeholder="Organization type"
            class="form-control form-text"
            :class="{ is_invalid: $v.organizationTypeId.$error }"
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
  CREATE_ORGANIZATION,
  TEAM_IN_ORG_QUERY,
  CREATE_USER_IN_TEAM,
  USER_IN_ONE_ORGANIZATION_QUERY
} from "@/graphql/queries";
import { required } from "vuelidate/lib/validators";
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
      organizationId: 0,
      organizationTypeId: 1,
      maxTeamsLimit: 1,
      signUpLoading: false,
      consistOrganization: -1
    };
  },
  apollo: {
    // массив всех организаций
    organizations: {
      query: ORGS_QUERY
    },
    // массив команд, находящихся в организации
    teamsInOrganization: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: this.organizationId
        };
      }
    },
    userInOneOrganization: {
      query: USER_IN_ONE_ORGANIZATION_QUERY,
      variables() {
        return {
          userId: this.idUser
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
    checkStatusUser(team) {
      if (team.usersInTeam != null || team.usersInTeam != undefined) {
        return team.usersInTeam.findIndex(el => {
          if (el != null || el != undefined) {
            if (el.user != null || el.user != undefined) {
              return el.user.id == this.idUser;
            } else return false;
          } else return false;
        });
      } else return -1;
    },
    submit() {
      // создание новой организации
      this.$apollo
        .mutate({
          mutation: CREATE_ORGANIZATION,
          variables: {
            name: this.name,
            ownerId: this.$store.getters.decodedToken.id,
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
      this.consistOrganization = this.organizationId;
      this.$apollo.mutate({
        mutation: CREATE_USER_IN_TEAM,
        variables: {
          userId: this.idUser,
          teamId: teamId,
          status: "На рассмотрении",
          roleId: 1 //FIXME: определить начальную роль при подаче заявки
        },
        update: cache => {
          let data = cache.readQuery({
            query: TEAM_IN_ORG_QUERY,
            variables: {
              organizationId: this.organizationId
            }
          });
          let indexTeam = data.teamsInOrganization.findIndex(
            el => el.id === teamId
          );
          if (data.teamsInOrganization[indexTeam] != null) {
            data.teamsInOrganization[indexTeam].usersInTeam.push({
              status: "На рассмотрении",
              user: {
                id: this.idUser,
                __typename: "User"
              },
              __typename: "UserInTeam"
            });
          }
          cache.writeQuery({
            query: TEAM_IN_ORG_QUERY,
            variables: {
              organizationId: this.organizationId
            },
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
      if (
        this.consistOrganization == -1 &&
        (this.userInOneOrganization == null ||
          this.userInOneOrganization == undefined)
      ) {
        if (
          this.findString !== "" &&
          this.organizations != null &&
          this.organizations != undefined
        ) {
          return this.organizations.filter(el => {
            if (el.name === undefined || el.name === null) {
              el.name = " ";
            }
            if (el.owner.surname === undefined || el.owner.surname === null) {
              el.owner.surname = " ";
            }
            if (el.owner.name === undefined || el.owner.name === null) {
              el.owner.name = " ";
            }
            if (
              el.owner.patricity === undefined ||
              el.owner.patricity === null
            ) {
              el.owner.patricity = " ";
            }
            return (
              (el.name.toLowerCase().indexOf(this.findString.toLowerCase()) !==
                -1 &&
                el.name !== "") ||
              (el.owner.surname
                .toLowerCase()
                .indexOf(this.findString.toLowerCase()) !== -1 &&
                el.owner.surname !== "") ||
              (el.owner.name
                .toLowerCase()
                .indexOf(this.findString.toLowerCase()) !== -1 &&
                el.owner.name !== "") ||
              (el.owner.patricity
                .toLowerCase()
                .indexOf(this.findString.toLowerCase()) !== -1 &&
                el.owner.patricity !== "")
            );
          });
        } else {
          return this.organizations;
        }
      } else {
        if (
          this.consistOrganization != -1 &&
          this.organizations != null &&
          this.organizations != undefined
        ) {
          return this.organizations.filter(el => {
            return el.id == this.consistOrganization;
          });
        } else {
          if (
            this.userInOneOrganization != null &&
            this.userInOneOrganization != undefined &&
            this.organizations != null &&
            this.organizations != undefined
          ) {
            return this.organizations.filter(el => {
              return el.id == this.userInOneOrganization.team.organization.id;
            });
          } else return this.organizations;
        }
      }
    },
    idUser() {
      return this.$store.getters.decodedToken.id;
    },
    filterTeam() {
      if (this.findTeam !== "") {
        return this.teamsInOrganization.filter(el => {
          return (
            el.name.toLowerCase().indexOf(this.findTeam.toLowerCase()) !== -1 &&
            el.name !== ""
          );
        });
      } else {
        return this.teamsInOrganization;
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
