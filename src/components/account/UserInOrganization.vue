<template>
  <div>
    <!-- Хлебные крошки -->
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <!-- Поиск по названию и владельцу организации -->
        <div class="col-9">
          <input
            v-model.trim="findOrganization"
            type="text"
            placeholder="Введите название организации или имя ее владельца"
            class="form-control block find dark"
          />
        </div>

        <!-- Кнопка для создания новой организации -->
        <!-- FIXME -->
        <div class="col-3">
          <button class="btn btn-primary w-100">
            Создать
          </button>
        </div>
      </div>

      <!-- Вывод массива всех организаций  -->
      <div
        class="row"
        v-for="organization in filterOrganization"
        :key="organization.id"
        @click="onShowTeams(organization.id)"
      >
        <div class="col-12">
          <div class="card">
            <div class="orgFoto"></div>
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
                class="btn-link"
                :class="{
                  rotate: onFindIndex(organization.id) != -1,
                  'non-rotate': onFindIndex(organization.id) == -1
                }"
              ></ArrowRight>
            </div>
          </div>
        </div>
        <teams-in-organization
          v-if="onFindIndex(organization.id) != -1"
          :organizationId="organization.id"
        ></teams-in-organization>
      </div>

      <!-- Вывод сообщения об отсутствии организаций  -->
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

    <!-- v-if="onFindIndex(organization.id) != -1" -->
    <!-- Вывод компонента команд в организации -->
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import TeamsInOrganization from "@/components/TeamsInOrganization.vue";
import ArrowRight from "@/assets/svg/admin/arrow_right.svg?inline";
import Stub from "@/components/Stub.vue";
import { ORGS_QUERY, USER_IN_ONE_ORGANIZATION_QUERY } from "@/graphql/queries";
export default {
  name: "UserInOrganization",
  components: { ArrowRight, BreadCrumbs, Stub, TeamsInOrganization },
  data() {
    return {
      findOrganization: "",
      showTeams: [],
      // FIXME: fix to computed
      consistOrganization: -1
    };
  },
  apollo: {
    // Массив всех организаций
    organizations: {
      query: ORGS_QUERY
    },
    // Получение id организации пользователя
    userInOneOrganization: {
      query: USER_IN_ONE_ORGANIZATION_QUERY,
      variables() {
        return {
          userId: this.idUser
        };
      }
    }
  },
  methods: {
    // Метод отображения команд в ораганизации
    onShowTeams(id) {
      let index = this.onFindIndex(id);
      if (index == -1) {
        this.showTeams.push(id);
      } else this.showTeams.splice(index, 1);
    },

    // Поиск индекса в массиве показа информации о командах
    onFindIndex(id) {
      if (this.showTeams.length == 0) {
        return -1;
      } else {
        return this.showTeams.findIndex(el => {
          return el == id;
        });
      }
    }
  },
  computed: {
    // Фильтрация организаций
    filterOrganization() {
      if (
        this.consistOrganization == -1 &&
        (this.userInOneOrganization == null ||
          this.userInOneOrganization == undefined)
      ) {
        if (
          this.findOrganization !== "" &&
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
              (el.name
                .toLowerCase()
                .indexOf(this.findOrganization.toLowerCase()) !== -1 &&
                el.name !== "") ||
              (el.owner.surname
                .toLowerCase()
                .indexOf(this.findOrganization.toLowerCase()) !== -1 &&
                el.owner.surname !== "") ||
              (el.owner.name
                .toLowerCase()
                .indexOf(this.findOrganization.toLowerCase()) !== -1 &&
                el.owner.name !== "") ||
              (el.owner.patricity
                .toLowerCase()
                .indexOf(this.findOrganization.toLowerCase()) !== -1 &&
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
    // Получение id пользователя из токена
    idUser() {
      return this.$store.getters.decodedToken.id;
    }
    // Получение id организации пользователя из токена
    // ... //
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_grid.scss";

.orgFoto {
  height: 48px;
  width: 48px;
  background-color: $gray;
  border-radius: 25px;
  border: 2px solid $bright_violet;
  color: $gray;
  margin-right: 1em;
}

.rotate {
  transform: rotate(0.25turn);
  transition: 0.25s;
}
.non-rotate {
  transform: rotate(0turn);
  transition: 0.25s;
}

small {
  color: $gray;
}
</style>
