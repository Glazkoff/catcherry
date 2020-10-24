<template>
  <div class="main">
    <popup v-if="isShowFullInformation">
      <h3 slot="header" v-if="isShowModalEdit">
        <i18n path="editUser"
          ><span place="title">{{ $t("editUser") }}</span></i18n
        >
        {{ fullName }}
      </h3>
      <div slot="body" v-if="isShowModalEdit">
        <form @submit.prevent="saveUserOnPopup()">
          <label for="surname">Фамилия</label>
          <input
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
            name="name"
            v-model.trim="$v.user.name.$model"
            placeholder="Имя"
            required
          />
          <label for="patricity">Отчество (при наличии)</label>
          <input
            name="patricity"
            v-model.trim="$v.user.patricity.$model"
            placeholder="Отчество"
            required
          />
          <label for="gender">Пол</label>
          <select name="gender" v-model.trim="$v.user.gender.$model" required>
            <option>Мужской</option>
            <option>Женский</option>
          </select>
          <label for="login">Логин</label>
          <input
            name="login"
            v-model.trim="$v.user.login.$model"
            placeholder="Логин"
            required
          />
          <div class="btn-group">
            <button
              class="modal-default-button"
              :disabled="$v.user.$invalid"
              @click="saveUserOnPopup()"
            >
              <i18n path="save"
                ><span>{{ $t("save") }}</span></i18n
              >
            </button>
            <button @click="cancelModal()">
              <i18n path="cancel"
                ><span place="title">{{ $t("cancel") }}</span></i18n
              >
            </button>
          </div>
        </form>
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
          slot="action"
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
        Пользователь {{ user.surname }} {{ user.name }} {{ user.patricity }}
      </h3>
      <div
        slot="body"
        v-if="!isShowModalDelete && !isShowModalEdit && !$apollo.loading"
      >
        <p>Фамилия: {{ user.surname }}</p>
        <p>Имя: {{ user.name }}</p>
        <p>Отчетсво: {{ user.patricity }}</p>
        <p>Пол: {{ user.gender }}</p>
        <p>Дата рождения: {{ new Date(user.birthday) }}</p>
        <p>Логин: {{ user.login }}</p>
        <p>Дата создания: {{ new Date(user.createdAt).toGMTString() }}</p>
        <div class="btn-group">
          <button @click="showModalEdit()">Редактировать</button>
          <button @click="showModalDelete()">Удалить</button>
          <button @click="cancelFullInformation()">
            <i18n path="cancel"
              ><span place="title">{{ $t("cancel") }}</span></i18n
            >
          </button>
        </div>
      </div>
    </popup>

    <h2>
      <i18n path="listUser"
        ><span place="title">{{ $t("listUser") }}</span></i18n
      >
    </h2>
    <h3 v-if="$apollo.loading">
      Загрузка...
    </h3>
    <div v-if="!$apollo.loading">
      <h6 v-if="users.length == 0">К сожалению, пока пользователей нет</h6>
      <div>
        <input
          v-model.trim="findString"
          type="text"
          placeholder="Поиск по пользователям"
        />
        <div class="oneUser" v-for="user in filterUser" :key="user.id">
          <p>{{ user.id }}.</p>
          <p>{{ user.surname }} {{ user.name }} {{ user.patricity }}</p>
          <p>{{ user.login }}</p>
          <button @click="showFullInformation(user.id)">Подробнее</button>
        </div>
      </div>
    </div>
    <minialert v-if="isShowAlertEdit"
      ><p slot="title">Вы успешно изменили пользователя</p></minialert
    >
    <minialert v-if="isShowAlertDelete"
      ><p slot="title">Вы успешно удалили пользователя</p></minialert
    >
    <minialert v-if="isError"
      ><p slot="title">Произошла какая-то ошибка. Извините</p></minialert
    >
  </div>
</template>

<script>
import popup from "@/components/admin/Popup.vue";
import minialert from "@/components/admin/MiniAlert.vue";
import { required } from "vuelidate/lib/validators";
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
          id: this.userId
        };
      }
    }
  },
  data() {
    return {
      nameOfUser: "",
      isError: false,
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
          this.isShowFullInformation = false;
          this.isShowModalDelete = false;
          this.isShowAlertDelete = true;
          setTimeout(() => {
            this.isShowAlertDelete = false;
          }, 3000);
        })
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false;
          this.isShowModalDelete = false;
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        });
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
          this.isShowAlertEdit = true;
          setTimeout(() => {
            this.isShowAlertEdit = false;
          }, 3000);
        })
        .catch(error => {
          console.error(error);
          this.isShowFullInformation = false;
          this.isError = true;
          setTimeout(() => {
            this.isError = false;
          }, 3000);
        });
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
button {
  width: 100%;
  margin: 0 2%;
}
.oneUser {
  display: grid;
  grid-template-columns: 5% 25% 10% 15% 15% 15% 15%;
  grid-template-rows: 1fr;
}

input,
select {
  display: block;
}
</style>
