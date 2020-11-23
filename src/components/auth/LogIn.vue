<template>
  <form class="form-auth" @submit.prevent="logIn">
    <h1>Вход в Catcherry</h1>
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
      class="form-control block"
      @input="hideErrors()"
    />
    <div v-if="$v.login.$error" class="error">
      <span v-if="!$v.login.required" class="form-text danger">Login is required</span>
    </div>
    <br />
    <label>Пароль *</label><br />
    <input
      :disabled="authLoading"
      type="password"
      v-model.trim="$v.password.$model"
      placeholder="Введите пароль"
      class="form-control block"
      @input="hideErrors()"
    />
    <div v-if="$v.password.$error" class="error">
      <span v-if="!$v.password.required" class="form-text danger"git >Password is required</span>
      <span v-else-if="!$v.password.minLength" class="form-text danger"
        >Password must have at least
        {{ $v.password.$params.minLength.min }} letters.</span
      >
    </div>
    <br />
    <input
      class="btn btn-primary block"
      :disabled="authLoading"
      type="submit"
      value="Войти"
    /><br />
    <p>
      Нет аккаунта?
      <router-link tag="a" to="/signup">Зарегистрироваться!</router-link>
    </p>
  </form>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import { LOG_IN } from "@/graphql/queries.js";
export default {
  name: "LogIn",
  data() {
    return {
      login: "",
      password: "",
      authLoading: false,
      fingerprint: "",
      loginPasswordError: false
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
      required
    },
    password: {
      required,
      minLength: minLength(6)
    }
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
          password: this.$v.password.$model
        };
        this.$apollo
          .mutate({
            mutation: LOG_IN,
            variables: {
              login: userData.login,
              password: userData.password,
              fingerprint: this.fingerprint
            }
          })
          .then(resp => {
            console.log("AUTH", resp);
            this.authLoading = false;
            if (resp.data.logIn && !resp.data.logIn.error) {
              if (resp.data.logIn.accessToken !== null) {
                this.$store.commit(
                  "SET_ACCESS_TOKEN",
                  resp.data.logIn.accessToken
                );
                this.$router.push("/");
              } else {
                this.loginPasswordError = true;
              }
            } else {
              // TODO: добавить обработку ошибок
              this.loginPasswordError = true;
              // console.error("ERROR");
            }
          })
          .catch(error => {
            this.authLoading = false;
            console.error(error);
          });
      }
    }
  }
};
</script>

<style></style>
