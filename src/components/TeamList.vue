<template>
  <div class="col-12">
    <div class="row">
      <div class="col-12">
        <h2>{{ $t("Organizations.informationAboutTeams") }}</h2>
      </div>
    </div>

    <!-- Вывод сообщения, что пользователь не прикреплен к организации -->
    <div v-if="oneUserInTeams != undefined && oneUserInTeams.length == 0">
      <div class="row">
        <div class="col-12">
          <h5>{{ $t("Organizations.userHasNotTeam") }}</h5>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="row">
        <!-- Название организации, к которой прикреплен пользователь -->
        <div class="col-12">
          <h3>{{ this.oneUserInTeams[0].team.organization.name }}</h3>
        </div>

        <!-- Вывод заголовков для информации о командах -->
        <div class="col-12 mt-0 mb-0">
          <div class="row table-border headtable">
            <div class="col-8">
              <p>{{ $t("Organizations.nameTeam") }}</p>
            </div>
            <div class="col-4">
              <p>{{ $t("Organizations.statusUserInTeam") }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Вывод информации о командах -->
      <div
        class="row"
        v-for="userInTeam in oneUserInTeams"
        :key="userInTeam.id"
      >
        <div class="col-12 mt-0 mb-0">
          <div class="row table-border">
            <div class="col-8">
              <small>{{ userInTeam.team.name }}</small>
            </div>
            <div class="col-4">
              <small class="gray">{{ userInTeam.status }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { STATUS_USER_IN_TEAMS_QUERY } from "@/graphql/queries";
export default {
  name: "TeamList",
  data() {
    return {};
  },

  apollo: {
    // Массив команд, с которыми свзян пользователь
    oneUserInTeams: {
      query: STATUS_USER_IN_TEAMS_QUERY,
      variables() {
        return {
          userId: +this.idUser
        };
      }
    }
  },

  methods: {
    // Обновление данных по запросу STATUS_USER_IN_TEAMS_QUERY из внешнего компонента
    refreshQuery() {
      if (this.idUser != undefined) {
        this.$apollo.queries.oneUserInTeams.refetch();
      }
    }
  },

  computed: {
    // Получение id пользователя из токена
    idUser() {
      return this.$store.getters.decodedToken.id;
    },

    // Получение id организации пользователя из токена
    idUserOrganization() {
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

.table-border {
  &.headtable {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  border-bottom: 1px solid $bright_violet;
  margin: 0;
  & .col-3,
  & .col-4,
  & .col-2,
  & .col-1,
  & .col-5 {
    margin-left: 0 !important;
  }
  & button {
    padding: 0;
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 0.75rem;
    &.red:hover {
      color: $dark_red;
    }
    &.white:hover {
      color: $light_grey;
    }
  }
}
</style>
