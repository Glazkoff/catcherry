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
        <div class="col-12">
          <input
            v-model.trim="findOrganization"
            type="text"
            placeholder="Введите название организации или имя ее владельца"
            class="form-control block find dark"
          />
        </div>
      </div>

      <!-- Вывод массива всех организаций  -->
      <div
        class="row"
        v-for="organization in filterOrganization"
        :key="organization.id"
      >
        <div class="col-12" @click="onShowTeams(organization.id)">
          <div class="card">
            <div class="orgFoto"></div>
            <div class="card_body">
              <h3>{{ organization.name }}</h3>
              <small
                >{{ $t("Organizations.Owner") }}:
                {{ organization.owner.surname }}
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
        <transition name="fade">
          <teams-in-organization
            v-if="onFindIndex(organization.id) != -1"
            :organizationId="organization.id"
          ></teams-in-organization>
        </transition>
      </div>

      <!-- Вывод сообщения об отсутствии организаций  -->
      <div class="organizationNotSearch" v-if="filterOrganization == ''">
        <Stub>
          <div slot="body">
            <h3 class="mb-4">{{ $t("Organizations.noOrganizations") }}</h3>
            <button class="btn btn-primary" @click="onLink()">
              {{ $t("Organizations.CreateOrganization") }}
            </button>
          </div>
        </Stub>
      </div>
    </div>

    <!-- Вывод компонента команд в организации -->
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import TeamsInOrganization from "@/components/TeamsInOrganization.vue";
import ArrowRight from "@/assets/svg/admin/arrow_right.svg?inline";
import Stub from "@/components/Stub.vue";
import { ORGS_QUERY } from "@/graphql/queries";
export default {
  name: "UserInOrganization",
  components: { ArrowRight, BreadCrumbs, Stub, TeamsInOrganization },

  data() {
    return {
      findOrganization: "",
      showTeams: []
    };
  },
  apollo: {
    // Массив всех организаций
    organizations: {
      query: ORGS_QUERY
    }
  },

  methods: {
    // Метод отображения команд по клику на них
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
    },

    // Переход на страницу создания организации
    onLink() {
      this.$router.push({ name: "NewOrganization" });
    }
  },

  computed: {
    // Фильтрация организаций
    filterOrganization() {
      // Если пользователь еще не прикреплен к организации...
      if (this.idOrganization == null || this.idOrganization == 0) {
        // Если строка поиска и массив организаций не пусты
        if (
          this.findOrganization !== "" &&
          this.organizations.length != 0 &&
          this.organizations != undefined
        ) {
          // Фильтровать организации по названию и ФИО владельца
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
        }
        // Иначе (если строка поиска или массив организаций пусты)...
        else {
          // Выводить все организации
          return this.organizations;
        }
      }
      // Иначе (если пользователь прикреплен к оргназации)...
      else {
        // Если организации не пусты ...
        if (this.organizations != undefined) {
          // Фитровать организации по прикрепленной к данному пользователю, а также  по названию и ФИО владельца
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
              el.id == this.idOrganization &&
              ((el.name
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
                  el.owner.patricity !== ""))
            );
          });
        }
        // Иначе (если организации пусты) выводить организации
        else return this.organizations;
      }
    },

    // Получение id пользователя из токена
    idUser() {
      return this.$store.getters.decodedToken.id;
    },

    // Получение id организации пользователя из токена
    idOrganization() {
      return this.$store.getters.decodedToken.organizationId;
    }
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
small {
  color: $gray;
}
</style>
