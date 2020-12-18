<template>
  <div>
    <div class="double" v-if="!isEdit">
      <div class="flexCont">
        <h2>{{ $t("profileUser") }}</h2>
        <div>
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
    <div v-if="isEdit">
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
          <form
            @submit.prevent="saveUserOnPopup(fullname, gender, birthday, login)"
          >
            <div class="form-group">
              <label for="fullname" class="form-name ">{{
                $t("fullname")
              }}</label>
              <input
                class="form-control"
                name="fullname"
                v-model.trim="$v.fullname.$model"
                @blur="$v.fullname.$touch()"
                :placeholder="$t('fullname')"
              />
              <div v-if="$v.fullname.$error">
                <span v-if="!$v.fullname.required" class="danger">{{
                  $t("required")
                }}</span>
                <span v-else-if="!$v.fullname.alpha" class="danger">{{
                  $t("requiredLetters")
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label for="gender" class="form-name ">{{ $t("gender") }}</label>
              <div class="form_radio">
                <input
                  type="radio"
                  name="male"
                  :value="$t('male')"
                  v-model.trim="gender"
                />
                <label for="male">{{ $t("male") }}</label>
              </div>

              <div class="form_radio">
                <input
                  type="radio"
                  name="female"
                  :value="$t('female')"
                  v-model.trim="gender"
                />
                <label for="female">{{ $t("female") }}</label>
              </div>
              <div class="form_radio">
                <input
                  type="radio"
                  name="nothing"
                  :value="$t('notIndicated')"
                  v-model.trim="gender"
                />
                <label for="nothing">{{ $t("notIndicated") }}</label>
              </div>
            </div>
            <div class="form-group">
              <label for="birthday" class="form-name ">{{
                $t("birthday")
              }}</label>
              <input
                type="date"
                class="form-control"
                name="name"
                v-model.trim="birthday"
                :placeholder="$t('birthday')"
                required
              />
            </div>
            <div class="form-group">
              <label for="login" class="form-name ">{{ $t("login") }}</label>
              <input
                class="form-control"
                name="login"
                v-model.trim="login"
                :placeholder="$t('login')"
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
        {{ fullname }}?
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
import { required } from "vuelidate/lib/validators";
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
      fullname: "",
      isShowAlertDelete: false,
      isShowAlertEdit: false,
      isShowModalDelete: false,
      findString: "",
      surname: "",
      name: "",
      patricity: "",
      gender: "",
      birthday: "",
      login: ""
    };
  },
  validations: {
    fullname: {
      required,
      alpha: val => /^[а-яёa-zA-Z ]*$/i.test(val)
    }
  },
  methods: {
    showFullInformation(id) {
      this.userId = id;
      this.isEdit = true;
      this.fullname = `${this.user.surname} ${this.user.name} ${this.user.patricity}`;
      this.gender = this.user.gender;
      this.birthday = this.user.birthday;
      this.login = this.user.login;
    },
    showModalDelete() {
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
    saveUserOnPopup(fullname, gender, birthday, login) {
      let fio = fullname.split(" ");
      this.surname = fio[0];
      if (fio[1] === undefined || fio[1] === null) {
        this.name = " ";
      } else this.name = fio[1];
      if (fio[2] === undefined || fio[2] === null) {
        this.patricity = " ";
      } else this.patricity = fio[2];
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_QUERY,
          variables: {
            id: this.user.id,
            surname: this.surname,
            name: this.name,
            patricity: this.patricity,
            gender: gender,
            birthday: birthday,
            login: login
          },
          update: (cache, { data: { updateUser } }) => {
            let data = cache.readQuery({ query: USERS_QUERY });
            data.users.find(
              el => el.id === this.user.id
            ).surname = this.surname;
            data.users.find(el => el.id === this.user.id).name = this.name;
            data.users.find(
              el => el.id === this.user.id
            ).patricity = this.patricity;
            data.users.find(el => el.id === this.user.id).gender = gender;
            data.users.find(el => el.id === this.user.id).birthday = birthday;
            data.users.find(el => el.id === this.user.id).login = login;
            cache.writeQuery({ query: USERS_QUERY, data });
            console.log(updateUser);
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
