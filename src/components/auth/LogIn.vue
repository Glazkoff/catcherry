<template>
  <form class="form-auth" @submit.prevent="logIn">
    <h1>{{ $t("logIn.title") }}</h1>
    <p>{{ $t("markRequiredField") }}</p>
    <div v-if="loginPasswordError" class="error">
      <span>{{ $t("logIn.loginPasswordError") }}</span>
    </div>
    <div class="form-group">
      <label class="form-name">{{ $t("logIn.login") }} *</label><br />
      <input
        id="login"
        :disabled="authLoading"
        type="text"
        v-model.trim="$v.login.$model"
        :placeholder="$t('logIn.loginInputPlaceholder')"
        class="form-control block"
        :class="{ is_invalid: $v.login.$error }"
        @input="hideErrors()"
      />
      <div v-if="$v.login.$error" class="error">
        <span v-if="!$v.login.required" class="form-text danger">{{
          $t("required")
        }}</span>
      </div>
    </div>
    <div class="form-group">
      <label class="form-name">{{ $t("logIn.password") }} *</label><br />
      <input
        id="password"
        :disabled="authLoading"
        type="password"
        v-model.trim="$v.password.$model"
        :placeholder="$t('logIn.passwordInputPlaceholder')"
        class="form-control block"
        :class="{ is_invalid: $v.password.$error }"
        @input="hideErrors()"
      />
      <div v-if="$v.password.$error" class="error">
        <span v-if="!$v.password.required" class="form-text danger">{{
          $t("required")
        }}</span>
        <span v-else-if="!$v.password.minLength" class="form-text danger">{{
          $t("requredSomeSymbols", { num: $v.password.$params.minLength.min })
        }}</span>
      </div>
    </div>
    <input
      class="btn btn-primary block"
      :disabled="authLoading"
      type="submit"
      :value="$t('logIn.buttonSubmit')"
    /><br />
    <p>
      {{ $t("logIn.noAccountQuestion") }}
      <router-link tag="a" :to="{ name: 'SignUp' }">{{
        $t("logIn.signUpLink")
      }}</router-link>
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
            this.authLoading = false;
            if (resp.data.logIn && !resp.data.logIn.error) {
              if (resp.data.logIn.accessToken !== null) {
                this.$store.commit(
                  "SET_ACCESS_TOKEN",
                  resp.data.logIn.accessToken
                );
                console.log(this.$store.getters.decodedToken.roleInSystem);
                if (
                  this.$store.getters.decodedToken.roleInSystem ===
                  "Administration"
                ) {
                  this.$router.push({ name: "Dashboard" });
                } else {
                  this.$router.push({ name: "FeedOfPosts" });
                }
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

<style lang="scss"></style>
