<template>
    <form 
          @submit.prevent="checkForm">
    <h1>Регистрация</h1>
    <p>* - обязательное поле</p>
    <p v-if="errors.length">
      <b>Пожалуйста исправьте указанные ошибки:</b>
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
    <label>Фамилия Имя Отчество</label><br />
    <input
      type="text"
      v-model="fullName"
      placeholder="Иванов Иван Иванович"
      class="formControl"
    /><br />
    <label>Дата рождения</label><br />
    <input 
      type="date" 
      v-model="birthday" 
      class="formControl" /><br />
    <label>Логин</label><br />
    <input
      type="text"
      v-model="login"
      placeholder="login"
      class="formControl"
    /><br />
    <label>Пароль</label><br />
    <input
      type="password"
      v-model="password"
      placeholder="password"
      class="formControl"
    /><br />
    <input type="submit" value="Зарегистрироваться" /><br />
    <p>
      Уже есть аккаунт?
      <a href="#">Войти!</a>
    </p>
  </form>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
    errors: [],
    fullName: null,
    birthday: null,
    login: null,
    password: null
    }
  },
  methods: {
    validPassword: function (str) {
      var regularExpression =  /([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)/;
      return regularExpression.test(str);
    },

    validFullName: function (str) {
      var regularExpression =  /^[A-zА-яЁё]+$/;
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
        this.errors.push('Поле ФИО обязательно!');
      }  
      // else if (!this.validFullName(this.fullName))  {
      //   this.errors.push('Поле ФИО может содержать только латинские и кириллические символы!');
      // }

      if (!this.birthday) {
        this.errors.push('Поле Дата рождения обязательно!');
      }

      if (!this.login) {
        this.errors.push('Поле логин обязательно!');
      } else if (!this.hasNotSpace(this.login))  {
        this.errors.push('Поле логин не должно содержать пробелов!');
      }  else if (this.login.length < 6)  {
        this.errors.push('Поле логин должно содержать не менее 6 символов!');
      }
      if (!this.password) {
        this.errors.push('Поле пароль обязательно!');
      }  else if (this.password.length < 8)  {
        this.errors.push('Поле пароль должно содержать не менее 8 символов!');
        } else if (!this.hasNotSpace(this.password))  {
        this.errors.push('Поле пароль не должно содержать пробелов!');
      } else if (!this.validPassword(this.password))  {
        this.errors.push('Поле пароль должен содержать латинские символы верхнего и нижнего регистров и хотя бы одну цифру!');
      }
      e.preventDefault();
    },
  }
}
</script>
<style></style>
