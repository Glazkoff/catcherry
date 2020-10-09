<template>
  <div>
    <h1>Вход в Catcherry</h1>
    <p>* - обязательное поле</p>
    <label>Логин *</label><br />
    <input
      type="text"
      v-model="login"
      placeholder="Введите логин"
      class="form-control"
    /><br />
    <label>Пароль *</label><br />
    <input
      type="password"
      v-model="password"
      placeholder="Введите пароль"
      class="form-control"
    /><br />
    <input type="submit" value="Войти" /><br />
    <p>
      Нет аккаунта?
      <a href="#">Зарегистрироваться!</a>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
