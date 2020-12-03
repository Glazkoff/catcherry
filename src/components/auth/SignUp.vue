<template>
  <form class="form-auth" @submit.prevent="submit">
    <h1>{{ $t("signUp.title") }}</h1>
    <p>{{ $t("markRequiredField") }}</p>
    <label>{{ $t("signUp.fullName") }} *</label><br />
    <input
      :disabled="signUpLoading"
      type="text"
      v-model.trim="$v.fullName.$model"
      :placeholder="$t('signUp.fullNamePlaceholder')"
      class="form-control block"
    />
    <div v-if="$v.fullName.$error" class="error">
      <span class="form-text danger" v-if="!$v.fullName.required">{{
        $t("required")
      }}</span>
      <span class="form-text danger" v-else-if="!$v.fullName.alpha">{{
        $t("requiredLetters")
      }}</span>
    </div>
    <br />
    <label>{{ $t("signUp.birthday") }}</label
    ><br />
    <input
      :disabled="signUpLoading"
      type="date"
      v-model="$v.birthday.$model"
      class="form-control block"
    />
    <br />
    <label>{{ $t("signUp.login") }} *</label><br />
    <input
      :disabled="signUpLoading"
      type="text"
      v-model.trim="$v.login.$model"
      :placeholder="$t('signUp.loginPlaceholder')"
      class="form-control block"
    />
    <div v-if="$v.login.$error" class="error">
      <span class="form-text danger" v-if="!$v.login.required">{{
        $t("required")
      }}</span>
      <span class="form-text danger" v-else-if="!$v.login.email">{{
        $t("reuiredEmail")
      }}</span>
    </div>
    <br />
    <label>{{ $t("signUp.password") }} *</label><br />
    <input
      type="password"
      :disabled="signUpLoading"
      v-model.trim="$v.password.$model"
      :placeholder="$t('signUp.passwordPlaceholder')"
      class="form-control block"
    />
    <div v-if="$v.password.$error" class="error">
      <span class="form-text danger" v-if="!$v.password.required">{{
        $t("required")
      }}</span>
      <span class="form-text danger" v-else-if="!$v.password.minLength"
        >{{
          $t("requredSomeSymbols", { num: $v.password.$params.minLength.min })
        }}
      </span>
    </div>
    <div>
      <label class="box-label">
        <input
          type="checkbox"
          id="checkbox"
          v-model="privacyPolicyIsChecked"
          checked=""
        />
        <small class="">
          {{ $t("userAgreement.bySignUp") }}
          <a>{{ $t("userAgreement.termsOfPrivacy") }}</a></small
        >
      </label>
    </div>
    <br />
    <input
      :disabled="signUpLoading || !privacyPolicyIsChecked"
      type="submit"
      class="btn btn-primary block"
      :value="$t('signUp.buttonSubmit')"
    /><br />
    <p>
      {{ $t("signUp.accountQuestion") }}
      <router-link tag="a" :to="{ name: 'LogIn' }">{{
        $t("signUp.logInLink")
      }}</router-link>
    </p>
  </form>
</template>

<script>
import {
  required,
  // TODO: email,
  minLength
} from "vuelidate/lib/validators";
import { SIGN_UP } from "@/graphql/queries.js";

export default {
  // TODO: добавить защиту роутов
  name: "SignUp",
  data() {
    return {
      fullName: "",
      birthday: "",
      login: "",
      password: "",
      signUpLoading: false,
      fingerprint: "",
      privacyPolicyIsChecked: false
    };
  },
  async created() {
    const fp = await this.$fingerprint.load();
    const result = await fp.get();
    const visitorId = result.visitorId;
    this.fingerprint = visitorId;
  },
  validations: {
    fullName: {
      required,
      alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
    },
    birthday: {
      required
    },
    login: {
      required
      // email,
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    submit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
      } else {
        let userData = {
          name: this.$v.fullName.$model,
          birthday: this.$v.birthday.$model,
          login: this.$v.login.$model,
          password: this.$v.password.$model
        };
        this.signUpLoading = true;
        this.$apollo
          .mutate({
            mutation: SIGN_UP,
            variables: {
              name: userData.name,
              birthday: userData.birthday,
              login: userData.login,
              password: userData.password,
              fingerprint: this.fingerprint
            }
          })
          .then(resp => {
            this.signUpLoading = false;
            if (!resp.data.signUp.error) {
              this.$store.commit(
                "SET_ACCESS_TOKEN",
                resp.data.signUp.accessToken
              );
              this.$router.push({ name: "FeedOfPosts" });
            } else {
              // TODO: добавить обработку ошибок
              console.error("ERROR");
            }
          })
          .catch(error => {
            this.signUpLoading = false;
            console.error(error);
          });
      }
    }
  }
};
</script>
<style>
.error {
  color: red;
}
</style>
