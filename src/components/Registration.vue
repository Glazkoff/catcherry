<template>
  <div>
    <h1>Регистрация</h1>
    <p>* - обязательное поле</p>
    <label>Фамилия Имя Отчество</label><br />
    <input
      type="text"
      v-model="fio"
      placeholder="Иванов Иван Иванович"
      class="form-control"
    /><br />
    <label>Дата рождения</label><br />
    <input type="date" v-model="birthday" class="form-control" /><br />
    <label>Логин</label><br />
    <input
      type="text"
      v-model="login"
      placeholder="login"
      class="form-control"
    /><br />
    <label>Пароль</label><br />
    <input
      type="password"
      v-model="password"
      placeholder="password"
      class="form-control"
    /><br />
    <input type="submit" value="Зарегистрироваться" /><br />
    <p>
      Уже есть аккаунт?
      <a href="#">Войти!</a>
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
