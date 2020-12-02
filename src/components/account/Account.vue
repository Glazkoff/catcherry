<template>
  <div class="main">
    <popup v-if="isShowFullInformation">
      <h3 slot="header" v-if="isShowModalEdit">
        <i18n path="editUser"
          ><span place="title">{{ $t("editUser") }}</span></i18n
        >
      </h3>
      <div slot="body" v-if="isShowModalEdit">
        <form @submit.prevent="saveUserOnPopup()">
          <label for="surname">Фамилия</label>
          <input
            class="form-control form-text"
            name="surname"
            v-model.trim="$v.user.surname.$model"
            @blur="$v.user.surname.$touch()"
            placeholder="Фамилия"
          />
          <div v-if="$v.user.surname.$error" class="error">
            <span v-if="!$v.user.surname.required"
              >Данное поле обязательно</span
            >
            <span v-else-if="!$v.user.surname.alpha"
              >Поле должно содержать только буквы</span
            >
          </div>
          <label for="name">Имя</label>
          <input
            class="form-control form-text"
            name="name"
            v-model.trim="$v.user.name.$model"
            placeholder="Имя"
            required
          />
          <label for="patricity">Отчество (при наличии)</label>
          <input
            class="form-control form-text"
            name="patricity"
            v-model.trim="$v.user.patricity.$model"
            placeholder="Отчество"
            required
          />
          <label for="gender">Пол</label>
          <select
            class="form-control"
            name="gender"
            v-model.trim="$v.user.gender.$model"
            required
          >
            <option>Мужской</option>
            <option>Женский</option>
          </select>
          <label for="login">Логин</label>
          <input
            class="form-control form-text"
            name="login"
            v-model.trim="$v.user.login.$model"
            placeholder="Логин"
            required
          />
          <label for="password">Пароль</label>
          <input
            class="form-control form-text"
            name="password"
            v-model.trim="$v.user.password.$model"
            placeholder="Пароль"
            required
          />
        </form>
      </div>
      <div slot="footer" class="btn-group" v-if="isShowModalEdit">
        <button
          class="modal-default-button btn btn-primary"
          @click="saveUserOnPopup()"
        >
          <i18n path="save"
            ><span>{{ $t("save") }}</span></i18n
          >
        </button>
        <button class="btn btn-secondary" @click="cancelModal()">
          <i18n path="cancel"
            ><span place="title">{{ $t("cancel") }}</span></i18n
          >
        </button>
      </div>

      <h3 slot="header" v-if="isShowModalDelete">
        <i18n path="deleteQuestion"
          ><span place="title">{{ $t("deleteQuestion") }}</span></i18n
        >
        {{ fullName }}?
      </h3>
      <div slot="body" v-if="isShowModalDelete" class="btn-group">
        <button
          @click="deleteUser()"
          slot="footer"
          class="modal-default-button"
        >
          <i18n path="delete"
            ><span place="title">{{ $t("delete") }}</span></i18n
          >
        </button>
        <button @click="cancelModal()">
          <i18n path="cancel"
            ><span place="title">{{ $t("cancel") }}</span></i18n
          >
        </button>
      </div>

      <h3
        slot="header"
        v-if="!isShowModalDelete && !isShowModalEdit && $apollo.loading"
      >
        Загрузка...
      </h3>
      <h3
        slot="header"
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
      >
        Карточка пользователя
      </h3>
      <div
        slot="body"
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
      >
        <p>Фамилия: {{ user.surname }}</p>
        <p>Имя: {{ user.name }}</p>
        <p>Отчетсво: {{ user.patricity }}</p>
        <p>Пол: {{ user.gender }}</p>
        <p>
          Дата рождения:
          {{
            new Date(user.birthday).toLocaleString("ru", {
              day: "numeric",
              month: "long",
              year: "numeric"
            })
          }}
        </p>
        <p>Логин: {{ user.login }}</p>
        <p>Пароль: {{ user.password }}</p>
      </div>
      <div
        slot="footer"
        class="btn-group"
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
      >
        <button class="btn btn-primary" @click="showModalEdit()">
          Редактировать
        </button>
        <button class="btn btn-link" @click="showModalDelete()">
          Удалить
        </button>
        <button class="btn btn-secondary" @click="cancelFullInformation()">
          <i18n path="close"
            ><span place="title">{{ $t("close") }}</span></i18n
          >
        </button>
      </div>
    </popup>

    <h2>
      <i18n path="profileUser"
        ><h2 place="title">{{ $t("profileUser") }}</h2></i18n
      >
    </h2>
    <h3 v-if="$apollo.loading">
      Загрузка...
    </h3>
    <div v-if="!$apollo.loading">
      <h6 v-if="users.length == 0">К сожалению, такого пользователя нет!</h6>
      <div>
        <div class="oneUser">
          <p>
            <i18n path="surname"
              ><span place="title">{{ $t("surname") }}</span></i18n
            >: {{ user.surname }}
          </p>
          <p>
            <i18n path="name"
              ><span place="title">{{ $t("name") }}</span></i18n
            >: {{ user.name }}
          </p>

          <p>
            <i18n path="patricity"
              ><span place="title">{{ $t("patricity") }}</span></i18n
            >: {{ user.patricity }}
          </p>
          <p>
            <i18n path="login"
              ><span place="title">{{ $t("login") }}</span></i18n
            >: {{ user.login }}
          </p>
          <button
            class="btn btn-secondary"
            @click="showFullInformation(user.id)"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">Вы успешно изменили пользователя</p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">Вы успешно удалили пользователя</p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/Popup.vue";
import minialert from "@/components/MiniAlert.vue";
import { required, minLength } from "vuelidate/lib/validators";
import {
  USERS_QUERY,
  DELETE_USER_QUERY,
  UPDATE_USER_QUERY,
  ONE_USER_QUERY
} from "@/graphql/queries";
export default {
  components: { minialert, popup },
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
      isShowFullInformation: false,
      index: 0,
      userId: -1,
      fullName: "",
      isShowAlertDelete: false,
      isShowAlertEdit: false,
      isShowModalEdit: false,
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
      this.isShowFullInformation = true;
    },
    cancelFullInformation() {
      this.isShowFullInformation = false;
    },
    cancelModal() {
      this.isShowModalEdit = false;
      this.isShowModalDelete = false;
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
      this.isShowFullInformation = false;
      this.isShowModalDelete = false;
      this.isShowAlertDelete = true;
      setTimeout(() => {
        this.isShowAlertDelete = false;
      }, 3000);
    },
    showModalEdit() {
      this.fullName = `${this.user.surname} ${this.user.name} ${this.user.patricity}`;
      this.isShowModalEdit = true;
    },
    saveUserOnPopup() {
      console.log(this.user);
      this.isShowModalEdit = false;
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
.btn-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
input,
select {
  display: block;
}
</style>
