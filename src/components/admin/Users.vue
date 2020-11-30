<template>
  <div class="main">
    <popup v-if="isShowFullInformation">
      <!-- Редактирование пользователя -->
      <h3 slot="header" v-if="isShowModalEdit">
        <i18n path="editUser">{{ $t("editUser") }}</i18n>
        {{ fullName }}
      </h3>
      <div slot="body" v-if="isShowModalEdit">
        <form @submit.prevent="editUser()">
          <label for="surname"
            ><i18n path="surname">{{ $t("surname") }}</i18n></label
          >
          <input
            name="surname"
            v-model.trim="$v.oneUser.surname.$model"
            @blur="$v.oneUser.surname.$touch()"
            placeholder="Фамилия"
          />
          <div v-if="$v.oneUser.surname.$error" class="error">
            <span v-if="!$v.oneUser.surname.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
            <span v-else-if="!$v.oneUser.surname.alpha"
              ><i18n path="requiredLetters">{{
                $t("requiredLetters")
              }}</i18n></span
            >
          </div>
          <label for="name"
            ><i18n path="name">{{ $t("name") }}</i18n></label
          >
          <input
            name="name"
            v-model.trim="$v.oneUser.name.$model"
            placeholder="Имя"
            required
          />
          <div v-if="$v.oneUser.name.$error" class="error">
            <span v-if="!$v.oneUser.name.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
            <span v-else-if="!$v.oneUser.name.alpha"
              ><i18n path="requiredLetters">{{
                $t("requiredLetters")
              }}</i18n></span
            >
          </div>
          <label for="patricity"
            ><i18n path="patricity">{{ $t("patricity") }}</i18n></label
          >
          <input
            name="patricity"
            v-model.trim="$v.oneUser.patricity.$model"
            placeholder="Отчество"
            required
          />
          <label for="gender"
            ><i18n path="gender">{{ $t("gender") }}</i18n></label
          >
          <select
            name="gender"
            v-model.trim="$v.oneUser.gender.$model"
            required
          >
            <option
              ><i18n path="male">{{ $t("male") }}</i18n></option
            >
            <option
              ><i18n path="female">{{ $t("female") }}</i18n></option
            >
          </select>
          <div v-if="$v.oneUser.gender.$error" class="error">
            <span v-if="!$v.oneUser.gender.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
          </div>
          <label for="login"
            ><i18n path="login">{{ $t("login") }}</i18n></label
          >
          <input
            name="login"
            v-model.trim="$v.oneUser.login.$model"
            placeholder="Логин"
            required
          />
          <div v-if="$v.oneUser.login.$error" class="error">
            <span v-if="!$v.oneUser.login.required"
              ><i18n path="required">{{ $t("required") }}</i18n></span
            >
          </div>
          <div class="btn-group">
            <button
              class="modal-default-button"
              :disabled="$v.oneUser.$invalid"
              @click="editUser()"
            >
              <i18n path="save">{{ $t("save") }}</i18n>
            </button>
            <button @click="cancelModal()">
              <i18n path="cancel">{{ $t("cancel") }}</i18n>
            </button>
          </div>
        </form>
      </div>

      <!-- Удаление пользователя -->
      <h3 slot="header" v-if="isShowModalDelete">
        <i18n path="deleteQuestion"
          ><span place="title">{{ $t("deleteQuestion") }}</span></i18n
        >
        {{ fullName }}?
      </h3>
      <div slot="body" v-if="isShowModalDelete" class="btn-group">
        <button
          @click="deleteUser()"
          slot="action"
          class="modal-default-button"
        >
          <i18n path="delete">{{ $t("delete") }}</i18n>
        </button>
        <button @click="cancelModal()">
          <i18n path="cancel">{{ $t("cancel") }}</i18n>
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
        <h3>
          <i18n path="loading">{{ $t("loading") }}</i18n
          >...
        </h3>
        <button @click="cancelFullInformation()">
          <i18n path="cancel">{{ $t("cancel") }}</i18n>
        </button>
      </div>

      <!-- Подробная информация про одного пользователя -->
      <h3
        slot="header"
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
      >
        <i18n path="user">{{ $t("user") }}</i18n> {{ user.surname }}
        {{ user.name }} {{ user.patricity }}
      </h3>
      <div
        slot="body"
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
      >
        <p>
          <i18n path="surname">{{ $t("surname") }}</i18n
          >: {{ user.surname }}
        </p>
        <p>
          <i18n path="name">{{ $t("name") }}</i18n
          >: {{ user.name }}
        </p>
        <p>
          <i18n path="patricity">{{ $t("patricity") }}</i18n
          >: {{ user.patricity }}
        </p>
        <p>
          <i18n path="gender">{{ $t("gender") }}</i18n
          >: {{ user.gender }}
        </p>
        <p>
          <i18n path="birthday">{{ $t("birthday") }}</i18n
          >: {{ $d(user.birthday, "long") }}
        </p>
        <p>
          <i18n path="login">{{ $t("login") }}</i18n
          >: {{ user.login }}
        </p>
        <div v-if="!isEditPoints && getPointsUser !== null">
          <p>
            <i18n path="numberOfPoints">{{ $t("numberOfPoints") }}</i18n
            >: {{ getPointsUser.pointQuantity }}
          </p>
          <button @click="editPoints()">
            <i18n path="editNumberOfPoints">{{
              $t("editNumberOfPoints")
            }}</i18n>
          </button>
        </div>
        <div v-if="isEditPoints">
          <p>
            <i18n path="numberOfPoints">{{ $t("numberOfPoints") }}</i18n
            >: <input type="number" name="points" v-model.trim="points" />
          </p>
          <button @click="savePoints()">
            <i18n path="saveNumberOfPoints">{{
              $t("saveNumberOfPoints")
            }}</i18n>
          </button>
          <button @click="cancelPoints()">
            <i18n path="cancel">{{ $t("cancel") }}</i18n>
          </button>
        </div>

        <p>
          <i18n path="createdAt">{{ $t("createdAt") }}</i18n
          >: {{ $d(user.createdAt, "long") }}
        </p>
        <p v-if="oneUserInTeams.length === 0">
          <i18n path="noTeam">{{ $t("noTeam") }}</i18n>
        </p>
        <p v-if="oneUserInTeams.length !== 0">
          <i18n path="userTeams">{{ $t("userTeams") }}</i18n
          >:
        </p>
        <div v-for="team in oneUserInTeams" :key="team.id" class="oneTeam">
          <p>
            <i18n path="nameInanimate">{{ $t("nameInanimate") }}</i18n
            >: {{ team.team.name }}
          </p>
          <p>
            <i18n path="organization">{{ $t("organization") }}</i18n
            >: {{ team.team.organization.name }}
          </p>
          <p>
            <i18n path="status">{{ $t("status") }}</i18n
            >: {{ team.status }}
          </p>
          <p>
            <i18n path="role">{{ $t("role") }}</i18n
            >: {{ team.role.name }}
          </p>
          <div class="btn-group">
            <button
              v-if="team.status === 'Принято'"
              @click="changeStatusInTeam(team, 'Не принято')"
            >
              <i18n path="deleteUserFromTeam">{{
                $t("deleteUserFromTeam")
              }}</i18n>
            </button>
            <button
              v-if="team.status !== 'Принято'"
              @click="changeStatusInTeam(team, 'Принято')"
            >
              <i18n path="addUserToTeam">{{ $t("addUserToTeam") }}</i18n>
            </button>
          </div>
        </div>
        <div class="btn-group">
          <button @click="showModalEdit()">
            <i18n path="edit">{{ $t("edit") }}</i18n>
          </button>
          <button @click="showModalDelete()">
            <i18n path="delete">{{ $t("delete") }}</i18n>
          </button>
          <button @click="cancelFullInformation()">
            <i18n path="cancel">{{ $t("cancel") }}</i18n>
          </button>
        </div>
      </div>
    </popup>

    <!-- Вывод списка краткой информации пользователей -->
    <h2>
      <i18n path="listUser"
        ><span place="title">{{ $t("listUser") }}</span></i18n
      >
    </h2>
    <h3 v-if="$apollo.queries.users.loading">
      <i18n path="loading">{{ $t("loading") }}</i18n
      >...
    </h3>
    <div v-if="!$apollo.queries.users.loading">
      <h6 v-if="users.length == 0">
        <i18n path="noUser">{{ $t("noUser") }}</i18n>
      </h6>
      <div>
        <input
          v-model.trim="findString"
          type="text"
          placeholder="Поиск по пользователям"
        />
        <div class="oneUser" v-for="user in filterUser" :key="user.id">
          <p>{{ user.id }}.</p>
          <p>{{ user.surname }} {{ user.name }} {{ user.patricity }}</p>
          <p>{{ user.login }}</p>
          <button @click="showFullInformation(user.id)">
            <i18n path="more">{{ $t("more") }}</i18n>
          </button>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">
        <i18n path="minialertEditUser">{{ $t("minialertEditUser") }}</i18n>
      </p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">
        <i18n path="minialertDeleteUser">{{ $t("minialertDeleteUser") }}</i18n>
      </p></minialert
    >
    <minialert v-if="isError || $apollo.error"
      ><p slot="title">
        <i18n path="minialertError">{{ $t("minialertError") }}</i18n>
      </p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/Popup.vue";
import minialert from "@/components/MiniAlert.vue";
import { required } from "vuelidate/lib/validators";
import {
  USERS_QUERY,
  DELETE_USER_QUERY,
  UPDATE_USER_QUERY,
  ONE_USER_QUERY,
  ONE_USER_IN_TEAMS_QUERY,
  ADD_IN_TEAM_QUERY,
  GET_POINTS_QUERY,
  CARGE_POINTS_QUERY
} from "@/graphql/queries";

export default {
  components: { minialert, popup },
  apollo: {
    // Получить список всех пользователей
    users: {
      query: USERS_QUERY
    },
    // Получить всю информацию про одного пользователя
    user: {
      query: ONE_USER_QUERY,
      variables() {
        return {
          id: this.userId
        };
      }
    },
    // Получить список всех команд пользователя
    oneUserInTeams: {
      query: ONE_USER_IN_TEAMS_QUERY,
      variables() {
        return {
          userId: this.userId
        };
      }
    },
    // Получить количество баллов пользователя
    getPointsUser: {
      query: GET_POINTS_QUERY,
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
      findString: "",
      points: 0,
      isEditPoints: false,
      oneUser: {
        id: -1,
        surname: "",
        name: "",
        patricity: "",
        gender: "",
        login: ""
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
    },
    // Закрыть попапы с редактированием или удалением
    cancelModal() {
      this.isShowModalEdit = false;
      this.isShowModalDelete = false;
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
      this.fullName = `${this.user.surname} ${this.user.name} ${this.user.patricity}`; // Записываем полное имя
      this.isShowModalEdit = true;
    },
    // Редактировать информацию про пользователя
    editUser() {
      this.isShowModalEdit = false;
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_QUERY, // Изменяем в БД
          variables: {
            id: this.oneUser.id,
            surname: this.oneUser.surname,
            name: this.oneUser.name,
            patricity: this.oneUser.patricity,
            gender: this.oneUser.gender,
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
              el.patricity !== "")
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
.btn-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
button {
  width: 100%;
  margin: 0 2%;
}
.oneUser {
  display: grid;
  grid-template-columns: 5% 25% 10% 15% 15% 15% 15%;
  grid-template-rows: 1fr;
}
.oneTeam {
  border: 1px solid black;
  padding: 10px;
  p {
    display: block;
  }
}

input,
select {
  display: block;
}
</style>
