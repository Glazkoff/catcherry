<template>
  <div>
    <i>AAA</i>
    <div v-if="editUser.isEdit">
      <form @submit.prevent="checkForm">
        <h1>Личный кабинет</h1>
        <p>* - обязательное поле</p>
        <p v-if="errors.length">
          <b>Пожалуйста исправьте указанные ошибки:</b>
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </p>
        <label>Фамилия Имя Отчество</label><br />
        <input type="text" v-model="editUser.name" placeholder="Иванов Иван Иванович" class="formControl" /><br />
        <label>Пол</label><br />
        <input type="radio" name="gender" v-model="gender" class="formControl" /><label>Мужской</label><br />
        <input type="radio" name="gender" v-model="gender" class="formControl" /><label>Женский</label><br />
        <input type="radio" name="gender" v-model="gender" class="formControl" /><label>Не указан</label><br />
        <label>Дата рождения</label><br />
        <input type="date" v-model="birthday" class="formControl" /><br />
        <label>Логин</label><br />
        <input type="text" v-model="login" placeholder="login" class="formControl" /><br />
        <button class="btn" @click="toSaveEditUser(user)">Сохранить</button>
        <p>
          <a href="#" @click="toDeleteUser(user)">Удалить аккаунт</a>
        </p>
      </form>

    </div>
    <div v-if="!editUser.isEdit">
      <ul>
        <li>{{ user.id }}</li>
        <li>{{ user.name }}</li>
        <li>{{ user.__typename }}</li>
        <li><button @click="toEditUser(user)">Редактировать</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    ONE_USER_QUERY,
    CREATE_USER_QUERY,
    USERS_QUERY,
    UPDATE_USER_QUERY,
    DELETE_USER_QUERY
  } from "@/graphql/queries";
  export default {
    name: "Account",
    apollo: {
      user: {
        query: ONE_USER_QUERY
      }
    },
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
          id: -1
        }
      };
    },
    methods: {
      validFullName: function (str) {
        var regularExpression = /^[A-zА-яЁё]+$/;
        return regularExpression.test(str);
      },

      hasNotSpace: function (str) {
        var regularExpression = /^\S*$/;
        return regularExpression.test(str);
      },
      checkForm: function (e) {
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
              id: this.editUser.id
            },
            update: (cache, {
              data: {
                updateUser
              }
            }) => {
              let data = cache.readQuery({
                query: USERS_QUERY
              });
              data.users.find(
                el => el.id === this.editUser.id
              ).name = this.editUser.name;
              cache.writeQuery({
                query: USERS_QUERY,
                data
              });
              console.log(updateUser);
            },
            optimisticResponse: {
              __typename: "Mutation",
              createUser: {
                __typename: "User",
                id: -1,
                name: this.editUser.name
              }
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      },
      toEditUser(user) {
        let editUser = user;
        this.editUser.name = editUser.name;
        this.editUser.id = editUser.id;
        this.editUser.isEdit = true;
      },
      toAddUser() {
        let username = this.newUser;
        this.newUser = "";
        this.$apollo
          .mutate({
            mutation: CREATE_USER_QUERY,
            variables: {
              name: username
            },
            update: (cache, {
              data: {
                createUser
              }
            }) => {
              let data = cache.readQuery({
                query: USERS_QUERY
              });
              data.users.push(createUser);
              cache.writeQuery({
                query: USERS_QUERY,
                data
              });
            },
            optimisticResponse: {
              __typename: "Mutation",
              createUser: {
                __typename: "User",
                id: -1,
                name: username
              }
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            this.newUser = username;
            console.error(error);
          });
      },
      toDeleteUser(id) {
        this.$apollo
          .mutate({
            mutation: DELETE_USER_QUERY,
            variables: {
              id
            },
            update: cache => {
              let data = cache.readQuery({
                query: USERS_QUERY
              });
              let index = data.users.findIndex(el => el.id == id);
              data.users.splice(index, 1);
              cache.writeQuery({
                query: USERS_QUERY,
                data
              });
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };
</script>
<style></style>