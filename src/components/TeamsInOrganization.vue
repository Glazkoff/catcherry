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

    <div v-if="!teamsInOrganization">
      <h5>{{ $t("Organizations.noTeamsInOrganization") }}</h5>
    </div>

    <div v-else>
      <div class="row">
        <div class="col-4">
          <p>{{ $t("Organizations.nameTeam") }}</p>
        </div>
        <div class="col-3">
          <p>{{ $t("Organizations.statusUserInTeam") }}</p>
        </div>
        <div class="col-2">
          <p>{{ $t("Organizations.usersLimitInTeam") }}</p>
        </div>
        <div class="col-3"></div>
      </div>

      <div class="row" v-for="team in filterTeam" :key="team.id">
        <div class="col-4">
          <p>{{ team.name }}</p>
        </div>
        <div class="col-3">
          <p>{{ onCheckUserStatus(team.usersInTeam) }}</p>
        </div>
        <div class="col-2">
          <p>{{ team.usersInTeam.length }}/{{ team.maxUsersLimit }}</p>
        </div>
        <div class="col-3">
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

    <minialert v-if="isShowAlertAddReq"
      ><p slot="title">{{ $t("Organizations.goodRequestInTeam") }}</p></minialert
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
      console.log(this.consistOrganization)
      this.consistOrganization = this.organizationId;
      console.log(this.consistOrganization)
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
              organizationId: +this.organizationId
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
    },
    //Метод удаления заявки пользователя
    RemoveRequestUser(teamId) {
      console.log(this.consistOrganization)
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
