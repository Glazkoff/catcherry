<template>
  <div class="col-12">
    <div
      class="row"
      v-if="teamsInOrganization != undefined && teamsInOrganization.length != 0"
    >
      <!-- Поиск по названию команды -->
      <div class="col-12">
        <input
          v-model.trim="findTeam"
          type="text"
          placeholder="Введите название команды"
          class="form-control block find dark"
        />
      </div>
    </div>

    <!-- Вывод сообщения, что команд не найдено -->
    <div v-if="filterTeam != undefined && filterTeam.length == 0">
      <div class="row">
        <div class="col-12">
          <h5>{{ $t("Organizations.noTeamsInOrganization") }}</h5>
        </div>
      </div>
    </div>

    <!-- Вывод заголовков для информации о командах -->
    <div v-else>
      <div class="row">
        <div class="col-12 mt-0 mb-0">
          <div class="row table-border headtable">
            <div class="col-4">
              <p>{{ $t("Organizations.nameTeam") }}</p>
            </div>
            <div class="col-3">
              <p>{{ $t("Organizations.statusUserInTeam") }}</p>
            </div>
            <div class="col-3">
              <p>{{ $t("Organizations.usersLimitInTeam") }}</p>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>

      <!-- Вывод информации о командах -->
      <div class="row" v-for="team in filterTeam" :key="team.id">
        <div class="col-12 mt-0 mb-0">
          <div class="row table-border">
            <div class="col-4">
              <small>{{ team.name }}</small>
            </div>
            <div class="col-3">
              <small class="gray">
                {{ onCheckUserStatus(team.usersInTeam) }}
                {{
                  $tc(
                    "Organizations.UserStatus",
                    onCheckUserStatus(team.usersInTeam)
                  )
                }}
              </small>
            </div>
            <div class="col-3">
              <small class="gray">
                {{ onCountTeamMember(team.usersInTeam) }}/{{
                  team.maxUsersLimit
                }}
              </small>
            </div>

            <div class="col-2">
              <div
                v-if="
                  onCheckUserStatus(team.usersInTeam) == '-' &&
                    team.usersInTeam.length < team.maxUsersLimit
                "
              >
                <button class="btn btn-link" @click="requestInTeam(team)">
                  {{ $t("Organizations.requestInTeam") }}
                </button>
              </div>
              <div
                v-else-if="
                  onCheckUserStatus(team.usersInTeam) == '-' &&
                    onCountTeamMember(team.usersInTeam) == team.maxUsersLimit
                "
              >
                <p>{{ $t("Organizations.noSeatsInTeam") }}</p>
              </div>
              <div v-else-if="onCheckUserStatus(team.usersInTeam) == 'Accept'">
                <button
                  class="btn btn-link red"
                  @click="RemoveRequestUser(team)"
                >
                  {{ $t("Organizations.leaveTeam") }}
                </button>
              </div>
              <div v-else-if="onCheckUserStatus(team.usersInTeam) == 'Reject'">
                <button
                  class="btn btn-link white"
                  @click="updateRequestInTeam(team)"
                >
                  {{ $t("Organizations.addRequestAgain") }}
                </button>
              </div>
              <div v-else>
                <button
                  class="btn btn-link red"
                  @click="RemoveRequestUser(team)"
                >
                  {{ $t("Organizations.removeRequestInTeam") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Появление окошка с информацией о создании заявки -->
    <minialert v-if="showAlertAddRequest"
      ><p slot="title">
        {{ $t("Organizations.goodRequestInTeam") }}
      </p></minialert
    >
  </div>
</template>

<script>
import minialert from "@/components/MiniAlert.vue";
import {
  TEAM_IN_ORG_QUERY,
  CREATE_USER_IN_TEAM,
  UPDATE_USER_IN_TEAM,
  ADD_USER_TO_ORGANIZATION,
  DELETE_USER_FROM_TEAM,
  STATUS_USER_IN_TEAMS_QUERY
} from "@/graphql/queries";
export default {
  name: "TeamsInOrganization",
  components: { minialert },
  props: ["organizationId"],
  data() {
    return {
      findTeam: "",
      showAlertAddRequest: false
    };
  },

  apollo: {
    // Массив команд, находящихся в организации
    teamsInOrganization: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: +this.organizationId
        };
      }
    },

    // Массив статусов участия в командах для пользователя
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
    // Проверка статуса пользователя в команде
    onCheckUserStatus(usersInTeam) {
      let index;
      if (usersInTeam.length != 0) {
        index = usersInTeam.findIndex(el => {
          if (el != null || el != undefined) {
            if (el.user != null || el.user != undefined) {
              return el.user.id == this.idUser;
            } else return false;
          } else return false;
        });
        if (index == -1) {
          return "-";
        } else {
          return usersInTeam[index].status;
        }
      } else return "-";
    },

    // Метод обновления токена
    async updateTokens() {
      this.$store.dispatch("GET_TOKENS").then(
        () => {},
        err => {
          console.warn(err);
        }
      );
    },

    // Переподача отклоненной заявки
    updateRequestInTeam(team) {
      // Если в команде есть места...
      if (team.maxUsersLimit > this.onCountTeamMember(team.usersInTeam)) {
        // Изменить статус заявки в локальном массиве статусов
        if (this.oneUserInTeams != undefined) {
          this.oneUserInTeams.forEach(el => {
            if (el.status == "Reject" && el.team.id == team.id)
              el.status == "Do not accept";
          });
        }

        // Добавление id организации в информацию о пользователе, если организация еще не добавлена
        if (this.idUserOrganization == null || this.idUserOrganization == 0) {
          this.addUsertoOrganization(this.organizationId);
        }

        // Выполнение запроса об изменении статуса
        this.$apollo.mutate({
          mutation: UPDATE_USER_IN_TEAM,
          variables: {
            userId: this.idUser,
            teamId: +team.id,
            status: "Do not accept"
          },
          update: cache => {
            let data = cache.readQuery({
              query: TEAM_IN_ORG_QUERY,
              variables: {
                organizationId: +this.organizationId
              }
            });
            let indexTeam = data.teamsInOrganization.findIndex(
              el => el.id == team.id
            );
            let indexUserInTeam = data.teamsInOrganization[
              indexTeam
            ].usersInTeam.findIndex(el => el.user.id == this.idUser);
            if (
              data.teamsInOrganization[indexTeam] != null &&
              data.teamsInOrganization[indexTeam].usersInTeam[
                indexUserInTeam
              ] != null
            ) {
              data.teamsInOrganization[indexTeam].usersInTeam[
                indexUserInTeam
              ].status = "Do not accept";
            }
            cache.writeQuery({
              query: TEAM_IN_ORG_QUERY,
              variables: {
                organizationId: +this.organizationId
              },
              data
            });
          }
        });

        // Обновление токена, если организации у пользователя еще не существует
        if (this.idUserOrganization == null || this.idUserOrganization == 0) {
          this.updateTokens();
        }

        // Появление окошка с информацией о создании заявки
        this.showAlertAddRequest = true;
        setTimeout(() => {
          this.showAlertAddRequest = false;
        }, 3000);
      }
    },

    // Обработка добавление заявки в команду
    requestInTeam(team) {
      // Если в команде есть места...
      if (team.maxUsersLimit > this.onCountTeamMember(team.usersInTeam)) {
        // Добавление id организации в информацию о пользователе, если организация еще не добавлена
        if (this.idUserOrganization == null || this.idUserOrganization == 0) {
          this.addUsertoOrganization(this.organizationId);
        }

        // Выполнение запроса по добавлению заявки в команду
        this.$apollo.mutate({
          mutation: CREATE_USER_IN_TEAM,
          variables: {
            userId: this.idUser,
            teamId: +team.id,
            status: "Do not accept",
            roleId: 1 //FIXME: определить роли в командах
          },
          update: cache => {
            let data = cache.readQuery({
              query: TEAM_IN_ORG_QUERY,
              variables: {
                organizationId: +this.organizationId
              }
            });
            let indexTeam = data.teamsInOrganization.findIndex(
              el => el.id === team.id
            );
            if (data.teamsInOrganization[indexTeam] != null) {
              data.teamsInOrganization[indexTeam].usersInTeam.push({
                status: "Do not accept",
                user: {
                  id: this.idUser,
                  __typename: "User"
                },
                __typename: "UserInTeam",
                createdAt: new Date()
              });
            }
            cache.writeQuery({
              query: TEAM_IN_ORG_QUERY,
              variables: {
                organizationId: +this.organizationId
              },
              data
            });
          }
        });

        // Добавление информации о статусе заявки в локальный массив статусов пользователя
        if (this.oneUserInTeams != undefined) {
          this.oneUserInTeams.push({
            status: "Do not accept",
            team: {
              id: team.id
            }
          });
        }

        // Обновление токена, если организации у пользователя еще не существует
        if (this.idUserOrganization == null || this.idUserOrganization == 0) {
          this.updateTokens();
        }

        // Появление окошка с информацией о создании заявки
        this.showAlertAddRequest = true;
        setTimeout(() => {
          this.showAlertAddRequest = false;
        }, 3000);
      }
    },

    // Обработка удаления заявки пользователя из команды
    async RemoveRequestUser(team) {
      // Удаление информации о статусе заявки из локального массива статусов пользователя
      if (this.oneUserInTeams != undefined) {
        let index = this.oneUserInTeams.findIndex(el => el.id == team.id);
        this.oneUserInTeams.splice(index, 1);
      }

      // Проверка на наличие отклоненных заявок у пользователя
      let numOfReject = 0;
      this.oneUserInTeams.forEach(el => {
        if (el.status == "Reject") numOfReject++;
      });
      if (
        this.oneUserInTeams.length == 0 ||
        this.oneUserInTeams.length == numOfReject
      ) {
        // Удаление id организации из информации о пользователе
        await this.addUsertoOrganization(null);
        // Обновление токена
        this.updateTokens();
      }

      // Обработка запроса удаления заявки из команды
      this.$apollo
        .mutate({
          mutation: DELETE_USER_FROM_TEAM,
          variables: {
            userId: this.idUser,
            teamId: +team.id
          },
          update: cache => {
            let data = cache.readQuery({
              query: TEAM_IN_ORG_QUERY,
              variables: {
                organizationId: +this.organizationId
              }
            });
            let indexTeam = data.teamsInOrganization.findIndex(
              el => el.id == team.id
            );
            if (data.teamsInOrganization[indexTeam] != null) {
              let indexUser = data.teamsInOrganization[
                indexTeam
              ].usersInTeam.findIndex(el => el.user.id == this.idUser);
              data.teamsInOrganization[indexTeam].usersInTeam.splice(
                indexUser,
                1
              );
            }
            cache.writeQuery({
              query: TEAM_IN_ORG_QUERY,
              variables: {
                organizationId: +this.organizationId
              },
              data
            });
          }
        })
        .then()
        .catch(error => {
          console.error(error);
        });
    },

    // Метод добавления id организации в сведения о пользователе
    addUsertoOrganization(organizationId) {
      this.$apollo.mutate({
        mutation: ADD_USER_TO_ORGANIZATION,
        variables: {
          id: this.idUser,
          organizationId: +organizationId
        }
      });
    },

    // Счет количества людей уже принятых в команду
    onCountTeamMember(usersInTeam) {
      let count = 0;
      usersInTeam.forEach(el => {
        if (el.status == "Accept") count++;
      });
      return count;
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
    },

    // Поиск по командам
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
