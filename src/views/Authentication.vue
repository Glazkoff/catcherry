<template>
  <div>
    <form @submit.prevent="logIn">
      <h1>Вход</h1>
      <p>* - обязательное поле</p>
      <div v-if="loginPasswordError" class="error">
        <span>Ошибка ввода логина или пароля!</span>
      </div>
      <label>Логин *</label><br />
      <input
        :disabled="authLoading"
        type="text"
        v-model.trim="$v.login.$model"
        placeholder="Введите логин"
        class="formControl"
        @input="hideErrors()"
      />
      <div v-if="$v.login.$error" class="error">
        <span v-if="!$v.login.required">Login is required</span>
      </div>
      <br />
      <label>Пароль *</label><br />
      <input
        :disabled="authLoading"
        type="password"
        v-model.trim="$v.password.$model"
        placeholder="Введите пароль"
        class="formControl"
        @input="hideErrors()"
      />
      <div v-if="$v.password.$error" class="error">
        <span v-if="!$v.password.required">Password is required</span>
        <span v-else-if="!$v.password.minLength"
          >Password must have at least
          {{ $v.password.$params.minLength.min }} letters.</span
        >
      </div>
      <br />
      <input :disabled="authLoading" type="submit" value="Войти" /><br />
      <p>
        Нет аккаунта?
        <router-link tag="a" to="/registration"
          >Зарегистрироваться!</router-link
        >
      </p>
    </form>
    <h1>{{ authLoading }}</h1>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { LOG_IN } from "@/graphql/queries.js";
export default {
  // TODO: добавить защиту роутов
  name: "Authentication",
  data() {
    return {
      login: "",
      password: "",
      authLoading: false,
      fingerprint: "",
      loginPasswordError: false,
    };
  },
  async created() {
    const fp = await this.$fingerprint.load();
    const result = await fp.get();
    const visitorId = result.visitorId;
    this.fingerprint = visitorId;
  },
  validations: {
    login: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
    },
  },
  methods: {
    hideErrors() {
      this.loginPasswordError = false;
    },
    async logIn() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        this.hideErrors();
      } else {
        this.authLoading = true;
        let userData = {
          login: this.$v.login.$model,
          password: this.$v.password.$model,
        };
        this.$apollo
          .mutate({
            mutation: LOG_IN,
            variables: {
              login: userData.login,
              password: userData.password,
              fingerprint: this.fingerprint,
            },
          })
          .then((resp) => {
            this.authLoading = false;
            if (resp.data.logIn && !resp.data.logIn.error) {
              this.$store.commit(
                "SET_ACCESS_TOKEN",
                resp.data.logIn.accessToken
              );
              this.$router.push("/");
            } else {
              // TODO: добавить обработку ошибок
              this.loginPasswordError = true;
              // console.error("ERROR");
            }
          })
          .catch((error) => {
            this.authLoading = false;
            console.error(error);
          });
      }
    },
  },
};
</script>

<style></style>
