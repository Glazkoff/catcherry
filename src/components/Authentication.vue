<template>
    <form 
          @submit.prevent="submit">
    <h1>Вход в Catcherry</h1>
    <p>* - обязательное поле</p>
    <!-- <p v-if="errors.length">
      <b>Пожалуйста исправьте указанные ошибки:</b>
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p> -->
    <label>Логин *</label><br />
    <input
      type="text"
      v-model.trim="$v.login.$model"
      placeholder="Введите логин"
      class="formControl"
    />
      <div v-if="$v.login.$error" class="error">
  <span   v-if="!$v.login.required">Login is required</span>
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
  <span   v-if="!$v.password.required">Password is required</span>
  <span   v-else-if="!$v.password.minLength">Password must have at least {{$v.password.$params.minLength.min}} letters.</span>
  </div>
    <br />
    <input type="submit" value="Войти" /><br />
    <p>
      Нет аккаунта?
      <a href="#">Зарегистрироваться!</a>
    </p>
    </form>
  
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators';
export default {
  name: 'Authentication',
  data() {
    return {
    // errors: [],
    login: '',
    password: ''
    }
  },
  validations:{
        login: {
         required
      },
    password: {
      required, 
      minLength:minLength(8)
      }
  },
  methods: {
    submit(){
      if(this.$v.$invalid){
        this.$v.$touch();
      }
    }
    // validPassword: function (str) {
    //   var regularExpression =  /([a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[A-Z]+[a-z]+[0-9]+|[A-Z]+[0-9]+[a-z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+)/;
    //   return regularExpression.test(str);
    // },
    
    // hasNotSpace: function (str) {
    //   var regularExpression = /^\S*$/;  
    //   return regularExpression.test(str);
    // },
    
    // checkForm: function (e) {
    //   this.errors = [];
    //   // console.log('Login - ' + this.login);
    //   // console.log('Password - ' + this.password);
    //   // console.log(this.login.length);

    //   if (!this.login) {
    //     this.errors.push('Поле логин обязательно!');
    //   } else if (!this.hasNotSpace(this.login))  {
    //     this.errors.push('Поле логин не должно содержать пробелов!');
    //   }  else if (this.login.length < 6)  {
    //     this.errors.push('Поле логин должно содержать не менее 6 символов!');
    //   }
    //   if (!this.password) {
    //     this.errors.push('Поле пароль обязательно!');
    //   }  else if (this.password.length < 8)  {
    //     this.errors.push('Поле пароль должно содержать не менее 8 символов!');
    //     } else if (!this.hasNotSpace(this.password))  {
    //     this.errors.push('Поле пароль не должно содержать пробелов!');
    //   } else if (!this.validPassword(this.password))  {
    //     this.errors.push('Поле пароль должен содержать латинские символы верхнего и нижнего регистров и хотя бы одну цифру!');
    //   }
    //   e.preventDefault();
    // },
    

  }
}
</script>

<style></style>
