<template>
  <div>
    <h4 v-if="this.$apollo.queries.user.loading">Загружается...</h4>
    <i>AAA User {{ $route.params.id }}</i>
    <div v-if="editUser.isEdit">
      <label for="editUserName"
        >Редактирование пользователя #{{ editUser.id }}
      </label>
      <form @submit.prevent="checkForm">
        <h1>Личный кабинет</h1>
        <p>* - обязательное поле</p>
        <span v-if="errors.length">
          <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </span>
        <label>Фамилия</label><br />
        <input
          type="text"
          v-model="editUser.name"
          placeholder="Иванов"
          class="formControl"
        /><br />
        <label>Имя</label><br />
        <input
          type="text"
          v-model="editUser.surname"
          placeholder="Иванов"
          class="formControl"
        /><br />
        <label>Отчество</label><br />
        <input
          type="text"
          v-model="editUser.patricity"
          placeholder="Иванов"
          class="formControl"
        /><br />
        <label>Пол</label><br />
        <input
          type="radio"
          name="gender"
          value="male"
          v-model="editUser.gender"
          class="formControl"
        /><label>Мужской</label><br />
        <input
          type="radio"
          name="gender"
          value="female"
          v-model="editUser.gender"
          class="formControl"
        /><label>Женский</label><br />
        <input
          type="radio"
          name="gender"
          value="none"
          v-model="editUser.gender"
          class="formControl"
        /><label>Не указан</label><br />
        <label>Дата рождения</label><br />
        <input
          type="date"
          v-model="editUser.birthday"
          class="formControl"
        /><br />
        <label>Логин</label><br />
        <input
          type="text"
          v-model="editUser.login"
          placeholder="login"
          class="formControl"
        /><br />
        <button class="btn" @click="toSaveEditUser()">Сохранить</button>
        <p>
          <a href="#" @click="toDeleteUser(user)">Удалить аккаунт</a>
        </p>
      </form>
    </div>

    <div v-if="!editUser.isEdit">
      <ul>
        <li>{{ user.id }}</li>
        <li>{{ user.name }}</li>
        <li>{{ user.surname }}</li>
        <li>{{ user.patricity }}</li>
        <li>{{ user.gender }}</li>
        <li>{{ dateUser(user.birthday) }}</li>
        <li>{{ user.login }}</li>
        <button @click="toEditUser(user)">Редактировать</button>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  ONE_USER_QUERY,
  USERS_QUERY,
  UPDATE_USER_QUERY,
  DELETE_USER_QUERY,
} from "@/graphql/queries";
export default {
  name: "Account",
  data() {
    return {
      errors: [],
      fullName: null,
      birthday: null,
      login: null,
      password: null,
      newUser: "",
      editUser: {
        isEdit: false,
        name: "",
        surname: "",
        patricity: "",
        gender: "",
        birthday: "",
        login: "",
        id: -1,
      },
    };
  },
  apollo: {
    user: {
      query: ONE_USER_QUERY,
      variables: {
        id: 111, // FIXME: сделать id пользователя динамическим
      },
    },
  },

  methods: {
    dateUser(date) {
      var options = {
        day: "numeric",
        month: "long",
      };
      return new Date(date).toLocaleString("ru", options);
    },

    validFullName: function(str) {
      var regularExpression = /^[A-zА-яЁё]+$/;
      return regularExpression.test(str);
    },

    hasNotSpace: function(str) {
      var regularExpression = /^\S*$/;
      return regularExpression.test(str);
    },

    checkForm: function(e) {
      this.errors = [];
      // console.log('Login - ' + this.login);
      // console.log('Password - ' + this.password);
      // console.log(this.login.length);

      if (!this.fullName) {
        this.errors.push("Поле ФИО обязательно!");
      }
      // else if (!this.validFullName(this.fullName))  {
      //   this.errors.push('Поле ФИО может содержать только латинские и кириллические символы!');
      // }

      if (!this.birthday) {
        this.errors.push("Поле Дата рождения обязательно!");
      }

      if (!this.login) {
        this.errors.push("Поле логин обязательно!");
      } else if (!this.hasNotSpace(this.login)) {
        this.errors.push("Поле логин не должно содержать пробелов!");
      } else if (this.login.length < 6) {
        this.errors.push("Поле логин должно содержать не менее 6 символов!");
      }
      e.preventDefault();
    },

    toSaveEditUser() {
      this.editUser.isEdit = false;
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_QUERY,
          variables: {
            name: this.editUser.name,
            surname: this.editUser.surname,
            patricity: this.editUser.patricity,
            gender: this.editUser.gender,
            birthday: this.editUser.birthday,
            login: this.editUser.login,
            id: this.editUser.id,
          },
          // update: (cache, { data: { updateUser } }) => {
          //   let data = cache.readQuery({ query: USERS_QUERY });
          //   data.user.name = this.editUser.name;
          //   data.user.surname = this.editUser.surname;
          //   data.user.patricity = this.editUser.patricity;
          //   cache.writeQuery({ query: USERS_QUERY, data });
          //   console.log(updateUser);
          // },
          // optimisticResponse: {
          //   __typename: "Mutation",
          //   createUser: {
          //     __typename: "User",
          //     id: -1,
          //     name: this.editUser.name,
          //     surname: this.editUser.surname,
          //   patricity: this.editUser.patricity,
          //   },
          // },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    toEditUser(user) {
      let editUser = user;
      this.editUser.name = editUser.name;
      this.editUser.surname = editUser.surname;
      this.editUser.patricity = editUser.patricity;
      this.editUser.gender = editUser.gender;
      this.editUser.birthday = editUser.birthday;
      this.editUser.login = editUser.login;

      this.editUser.id = editUser.id;
      this.editUser.isEdit = true;
    },
    toDeleteUser(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_USER_QUERY,
          variables: {
            id,
          },
          update: (cache) => {
            let data = cache.readQuery({ query: USERS_QUERY });
            let index = data.users.findIndex((el) => el.id == id);
            data.users.splice(index, 1);
            cache.writeQuery({ query: USERS_QUERY, data });
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {},
};
</script>
<style></style>
