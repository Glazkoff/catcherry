<template>
  <form @submit.prevent="submit">
    <h1>Вход в Catcherry</h1>
    <p>* - обязательное поле</p>
    <label>Логин *</label><br />
    <input
      type="text"
      v-model.trim="$v.login.$model"
      placeholder="Введите логин"
      class="formControl"
    />
    <div v-if="$v.login.$error" class="error">
      <span v-if="!$v.login.required">Login is required</span>
    </div>
    <br />
    <label>Пароль *</label><br />
    <input
      type="password"
      v-model.trim="$v.password.$model"
      placeholder="Введите пароль"
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
    <input type="submit" value="Войти" /><br />
    <p>
      Нет аккаунта?
      <a href="/registration">Зарегистрироваться!</a>
    </p>
  </form>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Authentication",
  data() {
    return {
      login: "",
      password: "",
    };
  },
  validations: {
    login: {
      required,
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
      }
    },
  },
};
</script>

<style></style>
