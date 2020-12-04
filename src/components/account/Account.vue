<template>
  <div>
    <div class="double" v-if="!isEdit">
      <div class="flexCont">
        <h2>{{ $t("profileUser") }}</h2>
        <h3 v-if="$apollo.loading">
          {{ $t("loading") }}
        </h3>
        <div v-if="!$apollo.loading">
          <h6 v-if="users.length == 0">
            К сожалению, такого пользователя нет!
          </h6>
          <div class="card">
            <div class="pad">
              <div class="double">
                <img src="@/assets/avatar.jpg" alt="user" class="bigAvatar" />

                <div>
                  <p>{{ user.surname }}</p>
                  <p>{{ user.name }}</p>

                  <p>{{ user.patricity }}</p>
                </div>
              </div>
              <div class="double">
                <div>
                  <p>{{ $t("gender") }}: {{ user.gender }}</p>
                  <p>
                    {{ $t("birthday") }}:
                    {{
                      new Date(user.birthday).toLocaleString("ru", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })
                    }}
                  </p>
                  <p>{{ $t("login") }}: {{ user.login }}</p>
                </div>
                <div></div>
              </div>
            </div>
            <div class="btnEdit">
              <Edit @click="showFullInformation(user.id)" />
            </div>
          </div>

          <div class="card pad">
            <Points />
          </div>
        </div>
      </div>
      <div class="card">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
          provident cupiditate, a culpa adipisci laudantium repudiandae
          excepturi consequuntur architecto officiis ex, voluptatem est
          obcaecati odit ipsum? Necessitatibus placeat animi pariatur.
        </p>
      </div>
    </div>

    <!-- Редактирование пользователя -->
    <div v-else>
      <h2 class="padLeftTop">{{ $t("profileUser") }}</h2>
      <div class="flexBlock">
        <div class="flexCont smallBlock">
          <div>
            <img src="@/assets/avatar.jpg" alt="user" class="bigAvatar" />
          </div>
          <button @click="showModalDelete" class="btn danger btnDelete">
            {{ $t("delete") }}
          </button>
        </div>
        <div class="flexCont bigBlock">
          <form @submit.prevent="saveUserOnPopup">
            <div class="form-group">
              <label for="surname" class="form-name ">{{
                $t("surname")
              }}</label>
              <input
                class="form-control"
                name="surname"
                v-model.trim="$v.user.surname.$model"
                @blur="$v.user.surname.$touch()"
                :placeholder="$t('surname')"
              />
              <div v-if="$v.user.surname.$error">
                <span v-if="!$v.user.surname.required" class="danger">{{
                  $t("required")
                }}</span>
                <span v-else-if="!$v.user.surname.alpha" class="danger">{{
                  $t("requiredLetters")
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="name" class="form-name ">{{ $t("name") }}</label>
              <input
                class="form-control"
                name="name"
                v-model.trim="$v.user.name.$model"
                :placeholder="$t('name')"
                required
              />
            </div>
            <div class="form-group">
              <label for="patricity" class="form-name ">{{
                $t("patricity")
              }}</label>
              <input
                class="form-control"
                name="patricity"
                v-model.trim="$v.user.patricity.$model"
                :placeholder="$t('patricity')"
                required
              />
            </div>
            <div class="form-group">
              <label for="gender" class="form-name ">{{ $t("gender") }}</label>
              <div class="form_radio">
                <input
                  type="radio"
                  name="male"
                  :value="$t('male')"
                  v-model.trim="$v.user.gender.$model"
                />
                <label for="male">{{ $t("male") }}</label>
              </div>

              <div class="form_radio">
                <input
                  type="radio"
                  name="female"
                  :value="$t('female')"
                  v-model.trim="$v.user.gender.$model"
                />
                <label for="female">{{ $t("female") }}</label>
              </div>
              <div class="form_radio">
                <input
                  type="radio"
                  name="nothing"
                  :value="$t('notIndicated')"
                  v-model.trim="$v.user.gender.$model"
                />
                <label for="nothing">{{ $t("notIndicated") }}</label>
              </div>
            </div>
            <div class="form-group">
              <label for="login" class="form-name ">{{ $t("login") }}</label>
              <input
                class="form-control"
                name="login"
                v-model.trim="$v.user.login.$model"
                :placeholder="$t('login')"
                required
              />
            </div>
            <div class="form-group">
              <label for="password" class="form-name ">{{
                $t("password")
              }}</label>
              <input
                class="form-control"
                name="password"
                v-model.trim="$v.user.password.$model"
                :placeholder="$t('password')"
                required
              />
            </div>
            <div class="double">
              <button type="submit" class="btn btn-alternate">
                {{ $t("save") }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <popup v-if="isShowModalDelete">
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
    </popup>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">{{ $t("minialertEditUser") }}</p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">{{ $t("minialertDeleteUser") }}</p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/Popup.vue";
import minialert from "@/components/MiniAlert.vue";
import Edit from "@/assets/account_edit.svg?inline";
import Points from "@/components/account/PointsUser.vue";
import { required, minLength } from "vuelidate/lib/validators";
import {
  USERS_QUERY,
  DELETE_USER_QUERY,
  UPDATE_USER_QUERY,
  ONE_USER_QUERY
} from "@/graphql/queries";
export default {
  components: { minialert, popup, Edit, Points },
  apollo: {
    users: {
      query: USERS_QUERY
    },
    user: {
      query: ONE_USER_QUERY,
      variables() {
        return {
          id: this.$route.params.id
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
      findString: ""
    };
  },
  validations: {
    user: {
      surname: {
        required,
        alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
      },
      name: {
        required,
        alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
      },
      patricity: {
        required,
        alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
      },
      gender: {
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
  methods: {
    showFullInformation(id) {
      this.userId = id;
      this.isEdit = true;
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
        .then(data => {
          console.log(data);
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
      console.log(this.user);
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_QUERY,
          variables: {
            id: this.user.id,
            surname: this.user.surname,
            name: this.user.name,
            patricity: this.user.patricity,
            gender: this.user.gender,
            login: this.user.login
          },
          update: (cache, { data: { updateUser } }) => {
            let data = cache.readQuery({ query: USERS_QUERY });
            data.users.find(
              el => el.id === this.user.id
            ).surname = this.user.surname;
            data.users.find(el => el.id === this.user.id).name = this.user.name;
            data.users.find(
              el => el.id === this.user.id
            ).patricity = this.user.patricity;
            data.users.find(
              el => el.id === this.user.id
            ).gender = this.user.gender;
            data.users.find(
              el => el.id === this.user.id
            ).login = this.user.login;
            cache.writeQuery({ query: USERS_QUERY, data });
            console.log(updateUser);
          },
          optimisticResponse: {
            __typename: "Mutation",
            createUser: {
              __typename: "User",
              id: -1,
              surname: this.user.surname,
              name: this.user.name,
              patricity: this.user.patricity,
              gender: this.user.gender,
              login: this.user.login
            }
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
      this.isEdit = false;
      this.isShowAlertEdit = true;
      setTimeout(() => {
        this.isShowAlertEdit = false;
      }, 3000);
    }
  },
  computed: {
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
@import "@/styles/_colors.scss";

.flexCont {
  display: flex;
  padding: 3rem;
  flex-direction: column;
}
.double {
  display: flex;
  justify-content: space-around;
}
.pad {
  padding: 2.5rem;
}
.btnEdit {
  display: flex;
  align-self: flex-start;
  margin: 2rem;
  cursor: pointer;
}
.card {
  margin-bottom: 3rem;
  justify-content: center;
}
.form-name {
  color: $white;
}
.flexBlock {
  display: flex;
}
.smallBlock {
  justify-content: space-between;
}
.bigBlock {
  margin-left: 6rem;
  width: 40%;
}
.padLeftTop {
  padding-left: 2.5rem;
  padding-top: 2.5rem;
}
.form-group {
  margin-bottom: 2.5rem;
}
.form-control {
  background: $violet;
  border: 1px solid $violet_2;
  color: $gray_3;
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
  height: 125px;
  border-radius: 65px;
  margin-right: 3rem;
}
</style>
