<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
      <popup v-if="isShowFullInformation">
        <!-- Редактирование пользователя -->
        <h3 slot="header" v-if="isShowModalEdit">
          {{ $t("editUser") }}
          {{ fullName }}
        </h3>
        <div slot="exit" @click="cancelModal()" v-if="isShowModalEdit">×</div>
        <div slot="body" v-if="isShowModalEdit">
          <form @submit.prevent="editUser()">
            <div class="form-group">
              <label for="surname">{{ $t("surname") }}</label>
              <input
                name="surname"
                v-model.trim="$v.oneUser.surname.$model"
                @blur="$v.oneUser.surname.$touch()"
                :placeholder="$t('surname')"
                class="form-control"
              />
              <div v-if="$v.oneUser.surname.$error" class="error">
                <span
                  v-if="!$v.oneUser.surname.required"
                  class="form-text danger"
                  >{{ $t("required") }}</span
                >
                <span
                  v-else-if="!$v.oneUser.surname.alpha"
                  class="form-text danger"
                  >{{ $t("requiredLetters") }}</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="name">{{ $t("name") }}</label>
              <input
                name="name"
                v-model.trim="$v.oneUser.name.$model"
                :placeholder="$t('name')"
                class="form-control"
              />
              <div v-if="$v.oneUser.name.$error" class="error">
                <span
                  v-if="!$v.oneUser.name.required"
                  class="form-text danger"
                  >{{ $t("required") }}</span
                >
                <span
                  v-else-if="!$v.oneUser.name.alpha"
                  class="form-text danger"
                  >{{ $t("requiredLetters") }}</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="patricity">{{ $t("patricity") }}</label>
              <input
                name="patricity"
                v-model.trim="$v.oneUser.patricity.$model"
                :placeholder="$t('patricity')"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="gender">{{ $t("gender") }}</label>
              <select name="gender" v-model.trim="$v.oneUser.gender.$model">
                <option>{{ $t("male") }}</option>
                <option>{{ $t("female") }}</option>
              </select>
              <div v-if="$v.oneUser.gender.$error" class="error">
                <span
                  v-if="!$v.oneUser.gender.required"
                  class="form-text danger"
                  >{{ $t("required") }}</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="login">{{ $t("login") }}</label>
              <input
                name="login"
                v-model.trim="$v.oneUser.login.$model"
                :placeholder="$t('login')"
                class="form-control"
              />
              <div v-if="$v.oneUser.login.$error" class="error">
                <span
                  v-if="!$v.oneUser.login.required"
                  class="form-text danger"
                  >{{ $t("required") }}</span
                >
              </div>
            </div>
            <div class="form-group">
              <label for="birthday">{{ $t("birthday") }}</label>
              <input
                name="birthday"
                type="date"
                v-model.trim="$v.oneUser.birthday.$model"
                :placeholder="$t('birthday')"
                class="form-control"
              />
              <div v-if="$v.oneUser.birthday.$error" class="error">
                <span
                  v-if="!$v.oneUser.birthday.required"
                  class="form-text danger"
                  >{{ $t("required") }}</span
                >
              </div>
            </div>
            <div class="btn-group">
              <button
                class="btn btn-primary"
                :disabled="$v.oneUser.$invalid"
                @click="editUser()"
              >
                {{ $t("save") }}
              </button>
              <button @click="cancelModal()" class="btn btn-alternate">
                {{ $t("cancel") }}
              </button>
            </div>
          </form>
        </div>

        <!-- Удаление пользователя -->
        <h3 slot="header" v-if="isShowModalDelete">
          {{ $t("deleteQuestion") }}
          {{ fullName }}?
        </h3>
        <div slot="exit" @click="cancelModal()" v-if="isShowModalDelete">×</div>
        <div slot="body" v-if="isShowModalDelete" class="btn-group">
          <button @click="deleteUser()" slot="action" class="btn btn-primary">
            {{ $t("delete") }}
          </button>
          <button @click="cancelModal()" class="btn btn-alternate">
            {{ $t("cancel") }}
          </button>
        </div>

        <!-- Заголовок загрузки информации про одного пользователя -->
        <div
          slot="header"
          v-if="
            !isShowModalDelete &&
              !isShowModalEdit &&
              $apollo.loading &&
              isShowFullInformation
          "
        >
          <h3>{{ $t("loading") }}...</h3>
          <h4 v-if="queryError">{{ queryError }}</h4>
          <button
            @click="cancelFullInformation()"
            class="btn btn-alternate block"
          >
            {{ $t("cancel") }}
          </button>
        </div>

        <!-- Подробная информация про одного пользователя -->
        <h3
          slot="header"
          v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
        >
          {{ $t("user") }} {{ user.surname }} {{ user.name }}
          {{ user.patricity }}
        </h3>
        <div
          slot="exit"
          @click="cancelFullInformation()"
          v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
        >
          ×
        </div>
        <div
          slot="body"
          v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
        >
          <p>{{ $t("surname") }}: {{ user.surname }}</p>
          <p>{{ $t("name") }}: {{ user.name }}</p>
          <p>{{ $t("patricity") }}: {{ user.patricity }}</p>
          <p>{{ $t("gender") }}: {{ user.gender }}</p>
          <p>{{ $t("birthday") }}: {{ $d(user.birthday, "number") }}</p>
          <p>{{ $t("login") }}: {{ user.login }}</p>
          <div v-if="!isEditPoints && getPointsUser !== null">
            <p>{{ $t("numberOfPoints") }}: {{ getPointsUser.pointQuantity }}</p>
            <button @click="editPoints()" class="btn btn-primary block">
              {{ $t("editNumberOfPoints") }}
            </button>
          </div>
          <div v-if="isEditPoints">
            <p>
              {{ $t("numberOfPoints") }}:
              <input
                type="number"
                name="points"
                v-model.trim="points"
                class="form-control"
              />
            </p>
            <div class="btn-group">
              <button @click="savePoints()" class="btn btn-primary">
                {{ $t("saveNumberOfPoints") }}
              </button>
              <button @click="cancelPoints()" class="btn btn-alternate">
                {{ $t("cancel") }}
              </button>
            </div>
          </div>

          <p>{{ $t("createdAt") }}: {{ $d(user.createdAt, "long") }}</p>
          <p v-if="oneUserInTeams.length === 0">
            {{ $t("noTeam") }}
          </p>
          <p v-if="oneUserInTeams.length !== 0">{{ $t("userTeams") }}:</p>
          <div v-for="team in oneUserInTeams" :key="team.id" class="oneTeam">
            <p>{{ $t("nameInanimate") }}: {{ team.team.name }}</p>
            <p>{{ $t("organization") }}: {{ team.team.organization.name }}</p>
            <p>{{ $t("status") }}: {{ team.status }}</p>
            <p v-if="team.role !== null">
              {{ $t("role") }}: {{ team.role.name }}
            </p>
            <div class="btn-group">
              <button
                v-if="team.status === 'Принят'"
                @click="changeStatusInTeam(team, 'Не принят')"
                class="btn btn-primary block"
              >
                {{ $t("deleteUserFromTeam") }}
              </button>
              <button
                v-if="team.status !== 'Принят'"
                @click="changeStatusInTeam(team, 'Принят')"
                class="btn btn-primary block"
              >
                {{ $t("addUserToTeam") }}
              </button>
            </div>
          </div>
          <button
            class="btn btn-primary block"
            @click="addUserInTeam()"
            v-if="!isShowAddUserInTeam"
          >
            {{ $t("addUserToTeam") }}
          </button>
          <div class="addToTeam" v-if="isShowAddUserInTeam">
            <div class="form-group">
              <label for="team" class="form-name">Название команды</label>
              <select name="team" class="form-control" v-model="newTeam">
                <option v-for="team in teams" :key="team.id" :value="team.id">{{
                  team.name
                }}</option>
              </select>
            </div>
            <button class="btn btn-primary" @click="addOneUserInTeam()">
              {{ $t("addUserToTeam") }}
            </button>
          </div>
          <div class="btn-group">
            <button @click="showModalEdit()" class="btn btn-primary">
              {{ $t("edit") }}
            </button>
            <button
              @click="showModalDelete()"
              class="btn btn-primary"
              :disabled="$store.getters.decodedToken.id == userId"
            >
              {{ $t("delete") }}
            </button>
            <button @click="cancelFullInformation()" class="btn btn-alternate">
              {{ $t("cancel") }}
            </button>
          </div>
        </div>
      </popup>

      <!-- Вывод списка краткой информации пользователей -->
      <div class="row">
        <div class="col-12">
          <h2>
            {{ $t("listUser") }}
          </h2>
          <div v-if="$apollo.queries.users.loading" class="wrapOfLoader">
            <loader></loader>
          </div>
          <div v-if="!$apollo.queries.users.loading">
            <h6 v-if="users.length == 0">
              {{ $t("noUser") }}
            </h6>
            <div>
              <input
                v-model.trim="findString"
                type="text"
                :placeholder="$t('placeholderSearchByUsers')"
                class="form-control block"
              />
              <div
                class="row card"
                v-for="user in filterUser"
                :key="user.id"
                @click="showFullInformation(user.id)"
              >
                <div class="col-1">
                  <img src="~@/assets/avatar.jpg" />
                </div>
                <div class="col-9">
                  <h3>
                    {{ user.surname }} {{ user.name }} {{ user.patricity }}
                  </h3>
                  <p>{{ user.login }}</p>
                  <small>№ {{ user.id }}</small>
                </div>
                <div class="col-2">
                  <ArrowRight></ArrowRight>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">
        {{ $t("minialertEditUser") }}
      </p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">
        {{ $t("minialertDeleteUser") }}
      </p></minialert
    >
    <minialert v-if="isError || $apollo.error"
      ><p slot="title">
        {{ $t("minialertError") }}
      </p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/Popup.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import ArrowRight from "@/assets/svg/admin/arrow_right.svg?inline";
import minialert from "@/components/MiniAlert.vue";
import Loader from "@/components/Loader.vue";
import { required } from "vuelidate/lib/validators";
import {
  USERS_QUERY,
  DELETE_USER_QUERY,
  UPDATE_USER_QUERY,
  ONE_USER_QUERY,
  ONE_USER_IN_TEAMS_QUERY,
  ADD_IN_TEAM_QUERY,
  GET_POINTS_QUERY,
  CARGE_POINTS_QUERY,
  TEAMS_QUERY,
  ADD_USER_IN_TEAM_QUERY
} from "@/graphql/queries";

export default {
  components: { minialert, popup, ArrowRight, BreadCrumbs, Loader },
  apollo: {
    // Получить список всех пользователей
    users: {
      query: USERS_QUERY
    },
    // Получение списка всех команд
    teams: {
      query: TEAMS_QUERY
    },
    // Получить всю информацию про одного пользователя
    user: {
      query: ONE_USER_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          id: this.userId
        };
      }
    },
    // Получить список всех команд пользователя
    oneUserInTeams: {
      query: ONE_USER_IN_TEAMS_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          userId: this.userId
        };
      }
    },
    // Получить количество баллов пользователя
    getPointsUser: {
      query: GET_POINTS_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      },
      variables() {
        return {
          userId: this.userId
        };
      }
    }
  },
  data() {
    return {
      nameOfUser: "",
      queryError: "",
      isError: false,
      isShowFullInformation: false,
      index: 0,
      userId: -1,
      teamId: -1,
      fullName: "",
      isShowAlertDelete: false,
      isShowAlertEdit: false,
      isShowModalEdit: false,
      isShowModalDelete: false,
      isShowAddUserInTeam: false,
      nameTeam: "Название команды",
      findString: "",
      points: 0,
      allTeams: [],
      isEditPoints: false,
      oneUser: {
        id: -1,
        surname: "",
        name: "",
        patricity: "",
        gender: "",
        login: "",
        birthday: new Date()
      }
    };
  },
  validations: {
    // Форма редактирования данных о пользователе
    oneUser: {
      surname: {
        required,
        alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
      },
      name: {
        required,
        alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
      },
      patricity: {
        alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
      },
      gender: {
        required
      },
      login: {
        required
      },
      birthday: {
        required
      }
    }
  },
  methods: {
    // Показать попап со всей информацией
    showFullInformation(id) {
      this.userId = id;
      this.isShowFullInformation = true;
    },
    // Закрыть попап со всей информацией
    cancelFullInformation() {
      this.isShowFullInformation = false;
      this.isShowAddUserInTeam = false;
    },
    // Закрыть попапы с редактированием или удалением
    cancelModal() {
      this.isShowModalEdit = false;
      this.isShowModalDelete = false;
      this.isShowAddUserInTeam = false;
    },
    addUserInTeam() {
      this.teams = this.teams.filter(
        team => this.oneUserInTeams.findIndex(t => +t.teamId === +team.id) < 0
      );
      this.isShowAddUserInTeam = true;
    },
    addOneUserInTeam() {
      console.log(this.newTeam);
      this.$apollo
        .mutate({
          mutation: ADD_USER_IN_TEAM_QUERY, // Удаляем из БД
          variables: {
            id: this.newTeam,
            userId: this.userId
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowAddUserInTeam = false;
          this.isShowAlertEdit = true; // Показать окно с информацией об успехе
          setTimeout(() => {
            this.isShowAlertEdit = false; // Закрыть окно с информацией об успехе
          }, 3000);
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isShowAddUserInTeam = false;
          this.isError = true; // Показать окно с ошибкой
          setTimeout(() => {
            this.isError = false; // Закрыть попап с ошибкой
          }, 3000);
        });
    },
    // Показать попап с удалением
    showModalDelete() {
      if (this.user.surname === null) {
        this.user.surname = "";
      }
      if (this.user.name === null) {
        this.user.name = "";
      }
      if (this.user.patricity === null) {
        this.user.patricity = "";
      }
      this.fullName = `${this.user.surname} ${this.user.name} ${this.user.patricity}`; // Запись полного имени пользователя
      this.isShowModalDelete = true;
    },
    // Удалить пользователя
    deleteUser() {
      this.$apollo
        .mutate({
          mutation: DELETE_USER_QUERY, // Удаляем из БД
          variables: {
            id: this.user.id
          },
          // Обновляем кеш
          update: cache => {
            let data = cache.readQuery({ query: USERS_QUERY });
            let index = data.users.findIndex(el => el.id == this.user.id); // Удаляем из списка одного пользователя
            data.users.splice(index, 1);
            cache.writeQuery({ query: USERS_QUERY, data });
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowFullInformation = false; // закрываем попапы все
          this.isShowModalDelete = false;
          this.isShowAlertDelete = true; // Показать окно с информацией об успехе
          setTimeout(() => {
            this.isShowAlertDelete = false; // Закрыть окно с информацией об успехе
          }, 3000);
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false; // Закрыть попап
          this.isShowModalDelete = false;
          this.isError = true; // Показать окно с ошибкой
          setTimeout(() => {
            this.isError = false; // Закрыть попап с ошибкой
          }, 3000);
        });
    },
    // Показать попап с редактированием
    showModalEdit() {
      this.oneUser = Object.assign({}, this.user); // Записываем данные о пользователе в другой объект, чтобы при редактировании данные в основном объекте не изменялись
      this.oneUser.birthday = new Date(+this.oneUser.birthday);
      this.oneUser.birthday =
        this.oneUser.birthday.getFullYear() +
        "-" +
        (this.oneUser.birthday.getMonth() < 8
          ? "0" + (this.oneUser.birthday.getMonth() + 1)
          : this.oneUser.birthday.getMonth() + 1) +
        "-" +
        (this.oneUser.birthday.getDate() < 9
          ? "0" + this.oneUser.birthday.getDate()
          : this.oneUser.birthday.getDate());
      this.fullName = `${this.user.surname} ${this.user.name} ${this.user.patricity}`; // Записываем полное имя
      this.isShowModalEdit = true;
    },
    // Редактировать информацию про пользователя
    editUser() {
      this.isShowModalEdit = false;
      console.log(new Date(this.oneUser.birthday));
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_QUERY, // Изменяем в БД
          variables: {
            id: this.oneUser.id,
            surname: this.oneUser.surname,
            name: this.oneUser.name,
            patricity: this.oneUser.patricity,
            gender: this.oneUser.gender,
            birthday: new Date(this.oneUser.birthday),
            login: this.oneUser.login
          },
          // Обновляем кеш
          update: (cache, { data: { updateUser } }) => {
            let data = cache.readQuery({ query: USERS_QUERY });
            data.users.find(
              el => el.id === this.oneUser.id
            ).surname = this.oneUser.surname; // Редактируем фамилию
            data.users.find(
              el => el.id === this.oneUser.id
            ).name = this.oneUser.name; // Редактируем имя
            data.users.find(
              el => el.id === this.oneUser.id
            ).patricity = this.oneUser.patricity;
            data.users.find(
              el => el.id === this.oneUser.id
            ).gender = this.oneUser.gender;
            data.users.find(
              el => el.id === this.oneUser.id
            ).login = this.oneUser.login;
            data.users.find(
              el => el.id === this.oneUser.id
            ).birthday = new Date(this.oneUser.birthday);
            cache.writeQuery({ query: USERS_QUERY, data });
            console.log(updateUser);
          },
          // Данные, пока идет запрос и ответ сервера
          optimisticResponse: {
            __typename: "Mutation",
            createUser: {
              __typename: "User",
              id: -1,
              surname: this.oneUser.surname,
              name: this.oneUser.name,
              patricity: this.oneUser.patricity,
              birthday: new Date(this.oneUser.birthday),
              gender: this.oneUser.gender,
              login: this.oneUser.login
            }
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowAlertEdit = true; // Показать окно с успехом
          setTimeout(() => {
            this.isShowAlertEdit = false; // Закрыть окно с успехом
          }, 3000);
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false; // Закрыть все попапы
          this.isError = true; // Показать окно в ошибкой
          setTimeout(() => {
            this.isError = false; // Закрыть окно с ошибкой
          }, 3000);
        });
    },
    // Изменить статус пользователя в команде
    changeStatusInTeam(team, newStatus) {
      this.$apollo
        .mutate({
          mutation: ADD_IN_TEAM_QUERY, // Изменить в БД
          variables: {
            status: newStatus,
            id: team.id
          },
          // Обновляем кеш
          update: cache => {
            let data = cache.readQuery({
              query: ONE_USER_IN_TEAMS_QUERY,
              variables: { userId: this.userId }
            });
            data.oneUserInTeams.find(
              el => el.id === team.id
            ).status = newStatus; // Меняем статус
            cache.writeQuery({
              query: ONE_USER_IN_TEAMS_QUERY,
              variables: { userId: this.userId },
              data
            });
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowAlertEdit = true; // Показываем окно с успехом
          setTimeout(() => {
            this.isShowAlertEdit = false; // Закрываем окно с успехом
          }, 3000);
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false; // Закрыть все попапы
          this.isShowModalDelete = false;
          this.isError = true; // Показать окно с ошибкой
          setTimeout(() => {
            this.isError = false; // Закрыть окно с ошибкой
          }, 3000);
        });
    },
    editPoints() {
      this.points = this.getPointsUser.pointQuantity;
      this.isEditPoints = true;
    },
    savePoints() {
      this.isEditPoints = false;
      this.$apollo
        .mutate({
          mutation: CARGE_POINTS_QUERY, // Изменяем в БД
          variables: {
            pointAccountId: parseInt(this.getPointsUser.id),
            delta: parseInt(this.points - this.getPointsUser.pointQuantity),
            operationDescription: "Действия администратора"
          },
          // Обновляем кеш
          update: (cache, { data: { updatePoints } }) => {
            let data = cache.readQuery({
              query: GET_POINTS_QUERY,
              variables: { userId: this.userId }
            });
            data.getPointsUser.pointQuantity = this.points; // Редактируем количество баллов
            cache.writeQuery({
              qquery: GET_POINTS_QUERY,
              variables: { userId: this.userId },
              data
            });
            console.log(updatePoints);
          }
        })
        // В случае успеха
        .then(data => {
          console.log(data);
          this.isShowAlertEdit = true; // Показать окно с успехом
          setTimeout(() => {
            this.isShowAlertEdit = false; // Закрыть окно с успехом
          }, 3000);
        })
        // В случае ошибки
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false; // Закрыть все попапы
          this.isError = true; // Показать окно в ошибкой
          setTimeout(() => {
            this.isError = false; // Закрыть окно с ошибкой
          }, 3000);
        });
    },
    cancelPoints() {
      this.isEditPoints = false;
    }
  },
  computed: {
    // Фильтрация пользователей
    filterUser() {
      if (this.findString !== "") {
        // Ищем по фамилии, имени и отчеству
        return this.users.filter(el => {
          if (el.surname === undefined || el.surname === null) {
            el.surname = " ";
          }
          if (el.name === undefined || el.name === null) {
            el.name = " ";
          }
          if (el.patricity === undefined || el.patricity === null) {
            el.patricity = " ";
          }
          if (el.login === undefined || el.login === null) {
            el.login = " ";
          }
          return (
            (el.surname.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 &&
              el.surname !== "") ||
            (el.name.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 &&
              el.name !== "") ||
            (el.patricity
              .toLowerCase()
              .indexOf(this.findString.toLowerCase()) !== -1 &&
              el.patricity !== "") ||
            (el.login.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 &&
              el.login !== "")
          );
        });
      } else {
        return this.users;
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
.oneTeam {
  border: 1px solid black;
  padding: 10px;
  p {
    display: block;
  }
}
.wrapOfLoader {
  overflow: hidden;
  background: $dark_blue;
  z-index: 99999;
  width: 100%;
  height: 40vh;
  padding-top: calc(20vh - 100px);
  position: relative;
}
</style>
