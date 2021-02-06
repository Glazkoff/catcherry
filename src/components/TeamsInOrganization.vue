<template>
  <div class="col-12">
    <div class="row">
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

    <!-- FIXME: Сделать красивый вывод, что команд нет -->
    <div v-if="!teamsInOrganization">
      <h5>{{ $t("Organizations.noTeamsInOrganization") }}</h5>
    </div>

    <!-- Вывод информации о командах -->
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

      <div class="row" v-for="team in filterTeam" :key="team.id">
        <div class="col-12 mt-0 mb-0">
          <div class="row table-border">
            <div class="col-4">
              <small class="white">{{ team.name }}</small>
            </div>
            <div class="col-3">
              <small>{{ onCheckUserStatus(team.usersInTeam) }}</small>
            </div>
            <div class="col-3">
              <small>
                {{ onCountTeamMember(team.usersInTeam) }}/{{
                  team.maxUsersLimit
                }}
              </small>
            </div>
            <div class="col-2">
              <div
                v-if="
                  checkStatusUser(team) == -1 &&
                    team.usersInTeam.length < team.maxUsersLimit
                "
              >
                <button class="btn btn-link" @click="requestInTeam(team.id)">
                  {{ $t("Organizations.requestInTeam") }}
                </button>
              </div>
              <div
                v-else-if="
                  checkStatusUser(team) == -1 &&
                    team.usersInTeam.length == team.maxUsersLimit
                "
              >
                <p>{{ $t("Organizations.noSeatsInTeam") }}</p>
              </div>
              <div v-else>
                <button
                  class="btn btn-link red"
                  @click="RemoveRequestUser(team.id)"
                >
                  {{ $t("Organizations.removeRequestInTeam") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <minialert v-if="isShowAlertAddReq"
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
  USER_IN_ONE_ORGANIZATION_QUERY,
  ADD_USER_TO_ORGANIZATION,
  DELETE_USER_FROM_TEAM
} from "@/graphql/queries";
export default {
  name: "TeamsInOrganization",
  components: { minialert },
  props: ["organizationId"],
  data() {
    return {
      findTeam: "",
      search: 0,
      nameOfOrganization: "",
      isShowInfoModal: false,
      isShowAlertAddReq: false,
      // organizationId: 0,
      consistOrganization: -1
    };
  },
  apollo: {
    // массив команд, находящихся в организации
    teamsInOrganization: {
      query: TEAM_IN_ORG_QUERY,
      variables() {
        return {
          organizationId: +this.organizationId
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
  methods: {
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

    // метод создания заявки в команду
    requestInTeam(teamId) {
      this.consistOrganization = this.organizationId;
      this.$apollo.mutate({
        mutation: CREATE_USER_IN_TEAM,
        variables: {
          userId: this.idUser,
          teamId: +teamId,
          status: "Do not accept",
          roleId: 1 //FIXME: определить начальную роль при подаче заявки
        },
        update: cache => {
          let data = cache.readQuery({
            query: TEAM_IN_ORG_QUERY,
            variables: {
              organizationId: +this.organizationId
            }
          });
          let indexTeam = data.teamsInOrganization.findIndex(
            el => el.id === teamId
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
      // появление окошка информации о создании заявки
      this.isShowInfoModal = false;
      // this.isShowAlertAddReq = true;
      // setTimeout(() => {
      //   this.isShowAlertAddReq = false;
      // }, 3000);
    },
    //Метод удаления заявки пользователя
    RemoveRequestUser(teamId) {
      this.$apollo
        .mutate({
          mutation: DELETE_USER_FROM_TEAM,
          variables: {
            userId: this.idUser,
            teamId: +teamId
          },
          update: cache => {
            let data = cache.readQuery({
              query: TEAM_IN_ORG_QUERY,
              variables: {
                organizationId: +this.organizationId
              }
            });
            let indexTeam = data.teamsInOrganization.findIndex(
              el => el.id == teamId
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
          organizationId: organizationId
        }
      });
    },
    onCountTeamMember(usersInTeam) {
      let count = 0;
      usersInTeam.forEach(el => {
        if (el.status == "Accept") count++;
      });
      return count;
    }
  },
  computed: {
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

.white {
  color: $white;
}

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
    font-style: normal;
    font-weight: normal;
    font-size: 0.75rem;
    &.red:hover {
      color: $dark_red;
    }
  }
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
