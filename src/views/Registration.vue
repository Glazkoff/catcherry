<template>
  <form @submit.prevent="submit">
    <h1>Регистрация</h1>
    <p>* - обязательное поле</p>
    <label>Фамилия Имя Отчество</label><br />
    <input
      type="text"
      v-model.trim="$v.fullName.$model"
      placeholder="Иванов Иван Иванович"
      class="formControl"
    />
    <div v-if="$v.fullName.$error" class="error">
      <span v-if="!$v.fullName.required">FullName is required</span>
      <span v-else-if="!$v.fullName.alpha"
        >FullName accepts only alphabet characters.</span
      >
    </div>
    <br />
    <!-- TODO: добавить обработку даты рождения -->
    <!-- <label>Дата рождения</label><br />
    <input type="date" v-model.trim="$v.birthday.$model" class="formControl" />
    <div v-if="$v.birthday.$error" class="error">
      <span v-if="!$v.birthday.required">Birthday is required</span>
    </div>
    <br /> -->
    <label>Логин</label><br />
    <input
      type="text"
      v-model.trim="$v.login.$model"
      placeholder="login"
      class="formControl"
    />
    <div v-if="$v.login.$error" class="error">
      <span v-if="!$v.login.required">Login is required</span>
      <span v-else-if="!$v.login.email">Login must be an email</span>
    </div>
    <br />
    <label>Пароль</label><br />
    <input
      type="password"
      v-model.trim="$v.password.$model"
      placeholder="password"
      class="formControl"
    />
    <div v-if="$v.password.$error" class="error">
      <span v-if="!$v.password.required">Password is required</span>
      <span v-else-if="!$v.password.minLength"
        >Password must have at least
        {{ $v.password.$params.minLength.min }} letters.</span
      >
    </div>
    <br />
    <input type="submit" value="Зарегистрироваться" /><br />
    <p>
      Уже есть аккаунт?
      <a href="/auth">Войти!</a>
    </p>
  </form>
</template>

<script>
import {
  required,
  // TODO: email,
  minLength,
} from "vuelidate/lib/validators";
import {
  SIGN_UP,
  // CREATE_USER_QUERY,
} from "@/graphql/queries.js";

export default {
  name: "Registration",
  data() {
    return {
      fullName: "",
      birthday: "",
      login: "",
      password: "",
    };
  },
  validations: {
    fullName: {
      required,
      alpha: (val) => /^[а-яёa-zA-Z ]*$/i.test(val),
    },
    // TODO: добавить обработку поля даты рождения
    // birthday: {
    //   required,
    // },
    login: {
      required,
      // TODO: добавить обработку поля даты рождения
      // email,
    },
    password: {
      required,
      minLength: minLength(8),
    },
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        let userData = {
          name: this.$v.fullName.$model,
          login: this.$v.login.$model,
          password: this.$v.password.$model,
        };
        console.log(userData);
        // TODO: Отправлять данные

        this.$apollo
          .mutate({
            mutation: SIGN_UP,
            variables: {
              name: userData.name,
              login: userData.login,
              password: userData.password,
            },
            //   update: (cache, { data: { updateUser } }) => {
            //     let data = cache.readQuery({ query: USERS_QUERY });
            //     data.users.find(
            //       (el) => el.id === this.editUser.id
            //     ).name = this.editUser.name;
            //     cache.writeQuery({ query: USERS_QUERY, data });
            //     console.log(updateUser);
            //   },
            //   optimisticResponse: {
            //     __typename: "Mutation",
            //     createUser: {
            //       __typename: "User",
            //       id: -1,
            //       name: this.editUser.name,
            //     },
            //   },
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
<style>
.error {
  color: red;
}
</style>
