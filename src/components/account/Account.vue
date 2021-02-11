<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <BreadCrumbs></BreadCrumbs>
        </div>
      </div>
    </div>
    <div class="container" v-if="$apollo.loading">
      <Loader></Loader>
    </div>
    <div class="container" v-else-if="!isEdit && !$apollo.loading">
      <div class="row">
        <div class="col-4">
          <h6 v-if="users.length == 0">
            К сожалению, такого пользователя нет!
          </h6>
          <div class="card">
            <div class="container">
              <div class="row">
                <div class="col-5 d-flex flex-center">
                  <img src="@/assets/avatar.jpg" alt="user" class="bigAvatar" />
                </div>
                <div class="col-5 ">
                  <p>
                    {{ user.surname }}<br />
                    {{ user.name }}<br />
                    {{ user.patricity }}
                  </p>
                </div>
                <div class="col-2 btnEdit">
                  <Edit @click="showFullInformation(user.id)" />
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <p>
                    {{ $t("gender") }}:
                    <span v-if="user.gender != null">{{ user.gender }}</span
                    ><span v-else>Не указано</span><br />{{ $t("birthday") }}:
                    <span
                      v-if="
                        new Date(+user.birthday).toLocaleString('ru', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        }) != 'Invalid date' && user.birthday != null
                      "
                    >
                      {{
                        new Date(+user.birthday).toLocaleString("ru", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })
                      }}</span
                    ><span v-else>Не указано</span>
                    <br />
                    {{ $t("login") }}:
                    <span v-if="user.login != null">{{ user.login }}</span
                    ><span v-else>Не указано</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="side-bar__locales">
                    <h3>{{ $t("languageInterface") }}</h3>
                    <div class="locales ">
                      <a @click="setLocale('en')">eng</a>
                      <a @click="setLocale('ru')">rus</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-5 card h-100">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <PointQuantity></PointQuantity>
                <PointOperation :limit="3" ref="pOperation"></PointOperation>
                <button
                  class="mt-4 w-100 btn btn-primary"
                  v-on:click="onLink()"
                >
                  Посмотреть все операции
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-3 card h-100">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <TeamList ref="teamsList"></TeamList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-if="isEdit" class="container">
        <div class="row">
          <div class="col-3 d-flex flex-center flex-column">
            <img src="@/assets/avatar.jpg" alt="user" class="bigAvatar mb-3" />
            <button @click="showModalDelete" class="btn btn-danger block">
              {{ $t("delete") }}
            </button>
          </div>
          <div class="col-5">
            <form @submit.prevent="saveUserOnPopup">
              <div class="form-group">
                <label for="surname" class="form-name ">{{
                  $t("surname")
                }}</label>
                <input
                  class="form-control"
                  :class="{ is_invalid: $v.userEditData.surname.$error }"
                  name="surname"
                  v-model.trim="$v.userEditData.surname.$model"
                  @blur="$v.userEditData.surname.$touch()"
                  :placeholder="$t('surname')"
                />
                <div v-if="$v.userEditData.surname.$error">
                  <span
                    v-if="!$v.userEditData.surname.required"
                    class="danger"
                    >{{ $t("required") }}</span
                  >
                  <span
                    v-else-if="!$v.userEditData.surname.alpha"
                    class="danger"
                    >{{ $t("requiredLetters") }}</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="name" class="form-name ">{{ $t("name") }}</label>
                <input
                  class="form-control"
                  :class="{ is_invalid: $v.userEditData.name.$error }"
                  name="name"
                  v-model.trim="$v.userEditData.name.$model"
                  :placeholder="$t('name')"
                  required
                />
                <div v-if="$v.userEditData.name.$error">
                  <span v-if="!$v.userEditData.name.required" class="danger">{{
                    $t("required")
                  }}</span>
                  <span
                    v-else-if="!$v.userEditData.name.alpha"
                    class="danger"
                    >{{ $t("requiredLetters") }}</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="patricity" class="form-name ">{{
                  $t("patricity")
                }}</label>
                <input
                  class="form-control"
                  :class="{ is_invalid: $v.userEditData.patricity.$error }"
                  name="patricity"
                  v-model.trim="$v.userEditData.patricity.$model"
                  :placeholder="$t('patricity')"
                  required
                />
                <div v-if="$v.userEditData.patricity.$error">
                  <span
                    v-if="!$v.userEditData.patricity.alpha"
                    class="danger"
                    >{{ $t("requiredLetters") }}</span
                  >
                </div>
              </div>
              <div class="form-group">
                <label for="gender" class="form-name ">{{
                  $t("gender")
                }}</label>
                <div class="form_radio">
                  <input
                    type="radio"
                    name="male"
                    :value="$t('male')"
                    v-model.trim="$v.userEditData.gender.$model"
                  />
                  <label for="male">{{ $t("male") }}</label>
                </div>

                <div class="form_radio">
                  <input
                    type="radio"
                    name="female"
                    :value="$t('female')"
                    v-model.trim="$v.userEditData.gender.$model"
                  />
                  <label for="female">{{ $t("female") }}</label>
                </div>
                <div class="form_radio">
                  <input
                    type="radio"
                    name="nothing"
                    :value="$t('notIndicated')"
                    v-model.trim="$v.userEditData.gender.$model"
                  />
                  <label for="nothing">{{ $t("notIndicated") }}</label>
                </div>
              </div>
              <div class="form-group">
                <label for="birthday" class="form-name">{{
                  $t("signUp.birthday")
                }}</label>
                <input
                  name="birthday"
                  type="date"
                  v-model="$v.userEditData.birthday.$model"
                  class="form-control block"
                  :max="new Date().toISOString().substr(0, 10)"
                />
              </div>
              <div class="form-group">
                <label for="login" class="form-name ">{{ $t("login") }}</label>
                <input
                  class="form-control"
                  :class="{ is_invalid: $v.userEditData.login.$error }"
                  name="login"
                  v-model.trim="$v.userEditData.login.$model"
                  :placeholder="$t('login')"
                  required
                />
                <div v-if="$v.userEditData.login.$error">
                  <span v-if="!$v.userEditData.login.required" class="danger">{{
                    $t("required")
                  }}</span>
                  <span
                    v-else-if="!$v.userEditData.login.alpha"
                    class="danger"
                    >{{ $t("requiredLetters") }}</span
                  >
                </div>
              </div>
              <!-- <div class="form-group">
                <label for="password" class="form-name ">{{
                  $t("password")
                }}</label>
                <input
                  class="form-control"
                  name="password"
                  v-model.trim="$v.userEditData.password.$model"
                  :placeholder="$t('password')"
                  required
                />
              </div> -->
            </form>
          </div>
          <div class="col-1"></div>
          <div class="col-3 sticky">
            <button
              class="btn btn-alternate w-100 mb-2"
              @click="closeFullInformation"
            >
              {{ $t("cancel") }}
            </button>
            <button
              type="submit"
              class="btn btn-alternate w-100"
              @click="saveUserOnPopup"
              :disabled="$v.userEditData.$anyError"
            >
              {{ $t("save") }}
            </button>
          </div>
        </div>
      </div>
      <Popup v-if="isShowModalDelete">
        <h3 slot="header">
          {{ $t("deleteQuestion") }}
          {{ fullName }}?
        </h3>
        <div slot="footer" class="double">
          <button @click="deleteUser" class="btn  btn-alternate danger">
            {{ $t("delete") }}
          </button>
          <button @click="isShowModalDelete = false" class="btn btn-alternate">
            {{ $t("cancel") }}
          </button>
        </div>
      </Popup>
      <MiniAlert v-if="isShowAlertEdit"
        ><p slot="title">{{ $t("minialertEditUser") }}</p></MiniAlert
      >
      <MiniAlert v-if="isShowAlertDelete"
        ><p slot="title">{{ $t("minialertDeleteUser") }}</p></MiniAlert
      >
    </div>
  </div>
</template>

<script>
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import TeamList from "@/components/TeamList.vue";
import Popup from "@/components/Popup.vue";
import MiniAlert from "@/components/MiniAlert.vue";
import Edit from "@/assets/account_edit.svg?inline";
import PointOperation from "@/components/PointOperation.vue";
import PointQuantity from "@/components/PointQuantity.vue";
import Loader from "@/components/Loader.vue";
import { setI18nLanguage } from "@/i18n/i18n";
import { required, minLength } from "vuelidate/lib/validators";
import {
  USERS_QUERY,
  DELETE_USER_QUERY,
  UPDATE_USER_QUERY,
  ONE_USER_QUERY
} from "@/graphql/queries";
export default {
  components: {
    MiniAlert,
    Popup,
    Edit,
    BreadCrumbs,
    Loader,
    PointOperation,
    PointQuantity,
    TeamList
  },
  apollo: {
    users: {
      query: USERS_QUERY,
      skip() {
        return !this.$store.getters.decodedToken.id;
      }
    },
    user: {
      query: ONE_USER_QUERY,
      variables() {
        return {
          id: this.$store.getters.decodedToken.id
        };
      }
    }
  },
  data() {
    return {
      nameOfUser: "",
      isEdit: false,
      index: 0,
      userId: -1,
      fullName: "",
      isShowAlertDelete: false,
      isShowAlertEdit: false,
      isShowModalDelete: false,
      findString: "",
      userEditData: {
        surname: "",
        name: "",
        patricity: "",
        gender: "",
        login: "",
        password: "",
        birthday: ""
      }
    };
  },
  validations: {
    userEditData: {
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
      gender: {
        required
      },
      birthday: {
        required
      },
      login: {
        required
      },
      password: {
        required,
        minLength: minLength(2)
      }
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (vm.$refs.pOperation) {
        vm.$refs.pOperation.refreshQuery();
      }
      if (vm.$refs.teamsList) {
        vm.$refs.teamsList.refreshQuery();
      }
      next();
    });
  },
  methods: {
    setLocale(locale) {
      setI18nLanguage(locale);
    },
    showFullInformation(id) {
      this.userId = id;
      this.isEdit = true;
      this.userEditData.id = this.user.id;
      this.userEditData.name = this.user.name;
      this.userEditData.surname = this.user.surname;
      this.userEditData.patricity = this.user.patricity;
      this.userEditData.gender = this.user.gender;
      this.userEditData.login = this.user.login;
      if (this.user.birthday != null) {
        this.userEditData.birthday = new Date(+this.user.birthday)
          .toISOString()
          .substr(0, 10);
      }
    },
    closeFullInformation() {
      this.isEdit = false;
    },
    showModalDelete() {
      this.fullName = `${this.user.surname} ${this.user.name} ${this.user.patricity}`;
      this.isShowModalDelete = true;
    },
    deleteUser() {
      this.$apollo
        .mutate({
          mutation: DELETE_USER_QUERY,
          variables: {
            id: this.user.id
          },
          update: cache => {
            let data = cache.readQuery({ query: USERS_QUERY });
            let index = data.users.findIndex(el => el.id == this.user.id);
            data.users.splice(index, 1);
            cache.writeQuery({ query: USERS_QUERY, data });
          }
        })
        .then(() => {
          this.$store.dispatch("LOG_OUT");
        })
        .catch(error => {
          console.error(error);
        });
      this.isEdit = false;
      this.isShowModalDelete = false;
      this.isShowAlertDelete = true;
      setTimeout(() => {
        this.isShowAlertDelete = false;
      }, 3000);
    },
    saveUserOnPopup() {
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_QUERY,
          variables: {
            id: this.userEditData.id,
            surname: this.userEditData.surname,
            name: this.userEditData.name,
            patricity: this.userEditData.patricity,
            gender: this.userEditData.gender,
            login: this.userEditData.login,
            birthday: this.$v.userEditData.birthday.$model
          },
          update: (cache, { data: { updateUser } }) => {
            console.log("updateUser", updateUser);
            let data = cache.readQuery({ query: USERS_QUERY });
            let user = data.users.find(el => el.id === this.userEditData.id);
            user.surname = this.userEditData.surname;
            user.name = this.userEditData.name;
            user.patricity = this.userEditData.patricity;
            user.gender = this.userEditData.gender;
            user.login = this.userEditData.login;
            if (
              this.userEditData.birthday != "" &&
              this.userEditData.birthday != null
            ) {
              user.birthday =
                "" + new Date(this.userEditData.birthday).getTime();
            } else {
              user.birthday = null;
            }
            cache.writeQuery({ query: USERS_QUERY, data });
          },
          optimisticResponse: {
            __typename: "Mutation",
            updateUser: {
              __typename: "User",
              id: -1,
              surname: this.userEditData.surname,
              name: this.userEditData.name,
              patricity: this.userEditData.patricity,
              gender: this.userEditData.gender,
              login: this.userEditData.login,
              birthday: this.$v.userEditData.birthday.$model
            }
          }
        })
        .then(() => {})
        .catch(error => {
          console.error(error);
        });
      this.isEdit = false;
      this.isShowAlertEdit = true;
      setTimeout(() => {
        this.isShowAlertEdit = false;
      }, 3000);
    },
    onLink() {
      this.$router.push({ name: "PointsUser" });
    }
  },
  computed: {
    createLimit() {
      return this.$route.query;
    },
    filterUser() {
      if (this.findString !== "") {
        return this.users.filter(el => {
          if (el.surname === undefined || el.surname === null) {
            el.surname = " ";
          }
          if (el.name === undefined || el.name === null) {
            el.name = " ";
          }
          if (el.patricity === undefined || el.patricity === null) {
            el.patricity = " ";
          }
          return (
            (el.surname.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 &&
              el.surname !== "") ||
            (el.name.toLowerCase().indexOf(this.findString.toLowerCase()) !==
              -1 &&
              el.name !== "") ||
            (el.patricity
              .toLowerCase()
              .indexOf(this.findString.toLowerCase()) !== -1 &&
              el.patricity !== "")
          );
        });
      } else {
        return this.users;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_grid.scss";
.flexCont {
  display: flex;
  padding: 3rem;
  flex-direction: column;
}
.double {
  display: flex;
  justify-content: space-around;
}
.btnEdit {
  display: flex;
  & > * {
    margin: 0 auto;
    cursor: pointer;
  }
}
.card {
  display: block;
  margin-bottom: 3rem;
  justify-content: center;
  border-radius: 16px;
}
.sticky {
  position: sticky;
  top: calc(#{$topBarHeight} + 1rem);
}
.form-name {
  color: $white;
}
.form-control {
  background: $violet;
  border: 1px solid $violet_2;
  color: $gray;
  width: -webkit-fill-available;
}
.btnDelete {
  border: solid $red;
  background: transparent;
  &:hover {
    text-decoration: underline;
  }
}
.bigAvatar {
  border-radius: 50%;
  width: 100%;
  max-width: 200px;
}
.container {
  position: relative;
}
.side-bar__locales {
  & h3 {
    text-align: center;
  }
  & .locales {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    & a {
      display: block;
      margin-right: 0;
      color: $white;
      transition-duration: 0.3s;
      &:hover {
        transform: scale(1.3);
      }
    }
  }
}
</style>
