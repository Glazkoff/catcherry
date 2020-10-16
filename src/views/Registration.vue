<template>
  <div>
    <form @submit.prevent="submit">
      <h1>Регистрация</h1>
      <p>* - обязательное поле</p>
      <label>Фамилия Имя Отчество</label><br />
      <input
        :disabled="signUpLoading"
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
        :disabled="signUpLoading"
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
        :disabled="signUpLoading"
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
      <input
        :disabled="signUpLoading"
        type="submit"
        value="Зарегистрироваться"
      /><br />
      <p>
        Уже есть аккаунт?
        <router-link tag="a" to="/auth">Войти!</router-link>
      </p>
    </form>
  </div>
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
  // TODO: добавить защиту роутов
  name: "Registration",
  data() {
    return {
      fullName: "",
      birthday: "",
      login: "",
      password: "",
      signUpLoading: false,
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
      minLength: minLength(6),
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
        // TODO: Отправлять данные
        this.signUpLoading = true;
        this.$apollo
          .mutate({
            mutation: SIGN_UP,
            variables: {
              name: userData.name,
              login: userData.login,
              password: userData.password,
            },
          })
          .then((resp) => {
            this.signUpLoading = false;
            if (!resp.data.signUp.error) {
              this.$store.commit(
                "SET_ACCESS_TOKEN",
                resp.data.signUp.accessToken
              );
              this.$router.push("/");
            } else {
              // TODO: добавить обработку ошибок
              console.error("ERROR");
            }
          })
          .catch((error) => {
            this.signUpLoading = false;
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
