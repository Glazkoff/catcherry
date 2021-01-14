<template>
  <form class="form-auth" @submit.prevent="submit">
    <h1>{{ $t("signUp.title") }}</h1>
    <p>{{ $t("markRequiredField") }}</p>
    <div class="form-group">
      <label class="form-name">{{ $t("signUp.name") }} *</label>
      <input
        id="name"
        :disabled="signUpLoading"
        type="text"
        v-model.trim="$v.name.$model"
        :placeholder="$t('signUp.namePlaceholder')"
        class="form-control block"
      />
      <div v-if="$v.name.$error" class="error">
        <span class="form-text danger" v-if="!$v.name.required">{{
          $t("required")
        }}</span>
        <span class="form-text danger" v-else-if="!$v.name.alpha">{{
          $t("requiredLetters")
        }}</span>
      </div>
    </div>
    <div class="form-group">
      <label class="form-name">{{ $t("signUp.surname") }} *</label>
      <input
        id="surname"
        :disabled="signUpLoading"
        type="text"
        v-model.trim="$v.surname.$model"
        :placeholder="$t('signUp.surnamePlaceholder')"
        class="form-control block"
      />
      <div v-if="$v.surname.$error" class="error">
        <span class="form-text danger" v-if="!$v.surname.required">{{
          $t("required")
        }}</span>
        <span class="form-text danger" v-else-if="!$v.surname.alpha">{{
          $t("requiredLetters")
        }}</span>
      </div>
    </div>
    <div class="form-group">
      <label class="form-name">{{ $t("signUp.patricity") }}</label>
      <input
        id="patricity"
        :disabled="signUpLoading"
        type="text"
        v-model.trim="$v.patricity.$model"
        :placeholder="$t('signUp.patricityPlaceholder')"
        class="form-control block"
      />
      <div v-if="$v.patricity.$error" class="error">
        <span class="form-text danger" v-if="!$v.patricity.alpha">{{
          $t("requiredLetters")
        }}</span>
      </div>
    </div>
    <!-- <div class="form-group">
      <label class="form-name">{{ $t("signUp.fullName") }} *</label>
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
    </div> -->
    <div class="form-group">
      <label class="form-name">{{ $t("signUp.birthday") }}</label>
      <input
        :disabled="signUpLoading"
        type="date"
        v-model="$v.birthday.$model"
        class="form-control block"
        :max="new Date().toISOString().substr(0, 10)"
      />
    </div>
    <div class="form-group">
      <label class="form-name">{{ $t("signUp.login") }} *</label>
      <input
        id="login"
        :disabled="signUpLoading"
        type="text"
        v-model.trim="$v.login.$model"
        :placeholder="$t('signUp.loginPlaceholder')"
        class="form-control block"
        @input="checkLogin()"
      />
      <div v-if="$v.login.$error" class="error">
        <span class="form-text danger" v-if="!$v.login.required">{{
          $t("required")
        }}</span>
        <span class="form-text danger" v-else-if="!$v.login.email">{{
          $t("reuiredEmail")
        }}</span>
      </div>
      <div class="error">
        <span class="form-text danger" v-if="isLoginUsed">{{
          $t("signUp.loginAlreadyTaken")
        }}</span>
      </div>
    </div>
    <div class="form-group">
      <label class="form-name">{{ $t("signUp.password") }} *</label><br />
      <input
        id="password"
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
    </div>
    <div>
      <label class="box-label">
        <input
          type="checkbox"
          id="checkbox"
          v-model="privacyPolicyIsChecked"
          checked=""
        />
        <span class="form-text box"></span>
        {{ $t("userAgreement.bySignUp") }}
        <br /><a id="PrivacyPolicy" @click.prevent="openPrivacyPolicy()">{{
          $t("userAgreement.termsOfPrivacy")
        }}</a></label
      >
    </div>
    <br />
    <input
      :disabled="signUpLoading || !privacyPolicyIsChecked || isLoginUsed"
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
    <PrivacyPolicyPopup
      v-if="showPrivacyPolicy"
      @close="closePrivacyPolicy()"
      @accept="accept()"
    ></PrivacyPolicyPopup>
  </form>
</template>

<script>
import {
  required,
  // TODO: email,
  minLength
} from "vuelidate/lib/validators";
import { SIGN_UP, IS_LOGIN_USED } from "@/graphql/queries.js";
import PrivacyPolicyPopup from "@/components/auth/PrivacyPolicyPopup.vue";
export default {
  // TODO: добавить защиту роутов
  name: "SignUp",
  components: {
    PrivacyPolicyPopup
  },
  data() {
    return {
      name: "",
      surname: "",
      patricity: "",
      birthday: "",
      login: "",
      password: "",
      signUpLoading: false,
      fingerprint: "",
      privacyPolicyIsChecked: false,
      showPrivacyPolicy: false,
      isLoginUsed: false
    };
  },
  async created() {
    const fp = await this.$fingerprint.load();
    const result = await fp.get();
    const visitorId = result.visitorId;
    this.fingerprint = visitorId;
  },
  validations: {
    surname: {
      required,
      alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
    },
    name: {
      required,
      alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
    },
    patricity: {
      alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
    },
    birthday: {},
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
        console.log("BIRTHDAY: ", this.$v.birthday.$model);
        let userData = {
          name: this.$v.name.$model,
          surname: this.$v.surname.$model,
          patricity: this.$v.patricity.$model,
          birthday: this.$v.birthday.$model,
          login: this.$v.login.$model,
          password: this.$v.password.$model
        };
        this.signUpLoading = true;
        this.checkLogin();
        if (!this.isLoginUsed) {
          this.$apollo
            .mutate({
              mutation: SIGN_UP,
              variables: {
                name: userData.name,
                surname: userData.surname,
                patricity: userData.patricity,
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
    },
    openPrivacyPolicy() {
      this.showPrivacyPolicy = true;
    },
    closePrivacyPolicy() {
      this.showPrivacyPolicy = false;
    },
    accept() {
      this.showPrivacyPolicy = false;
      this.privacyPolicyIsChecked = true;
    },
    checkLogin() {
      this.$apollo
        .query({
          query: IS_LOGIN_USED,
          variables: {
            login: this.$v.login.$model
          }
        })
        .then(result => {
          this.isLoginUsed = result.data.isLoginUsed;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/_colors.scss";
</style>
