<template>
  <div class="main">
    <popup v-if="isShowModalEdit" :user="users[index]">
      <h3 slot="header">
        <i18n path="editUser"
          ><span place="title">{{ $t("editUser") }}</span></i18n
        >
        {{ nameOfUser }}
      </h3>
      <div slot="body">
        <form @submit.prevent="saveUserOnPopup()">
          <label for="surname">Фамилия</label>
          <input
            name="surname"
            v-model.trim="$v.oneUser.surname.$model"
            @blur="$v.oneUser.surname.$touch()"
            placeholder="Фамилия"
          />
          <div v-if="$v.oneUser.surname.$error" class="error">
            <span v-if="!$v.oneUser.surname.required"
              >Данное поле обязательно</span
            >
            <span v-else-if="!$v.oneUser.surname.alpha"
              >Поле должно содержать только буквы</span
            >
          </div>
          <label for="name">Имя</label>
          <input
            name="name"
            v-model.trim="$v.oneUser.name.$model"
            placeholder="Имя"
            required
          />
          <label for="patricity">Отчество (при наличии)</label>
          <input
            name="patricity"
            v-model.trim="$v.oneUser.patricity.$model"
            placeholder="Отчество"
            required
          />
          <label for="gender">Пол</label>
          <select
            name="gender"
            v-model.trim="$v.oneUser.gender.$model"
            required
          >
            <option>Мужской</option>
            <option>Женский</option>
          </select>
          <label for="login">Логин</label>
          <input
            name="login"
            v-model.trim="$v.oneUser.login.$model"
            placeholder="Логин"
            required
          />
          <label for="password">Пароль</label>
          <input
            name="password"
            v-model.trim="$v.oneUser.password.$model"
            placeholder="Пароль"
            required
          />
          <button
            class="modal-default-button"
            :disabled="$v.oneUser.$invalid"
            @click="saveUserOnPopup()"
          >
            <i18n path="save"
              ><span place="title">{{ $t("save") }}</span></i18n
            >
          </button>
        </form>
      </div>
    </popup>
    <popup v-if="isShowModalDelete">
      <h3 slot="header">
        <i18n path="deleteQuestion"
          ><span place="title">{{ $t("deleteQuestion") }}</span></i18n
        >
        {{ nameOfUser }}?
      </h3>
      <!-- @click="closePopup({ ans: true, action: 'delete' })" -->
      <button slot="action" class="modal-default-button">
        <i18n path="delete"
          ><span place="title">{{ $t("delete") }}</span></i18n
        >
      </button>
    </popup>
    <h2>
      <i18n path="listUser"
        ><span place="title">{{ $t("listUser") }}</span></i18n
      >
    </h2>
    <h6 v-if="users.length == 0">К сожалению, пока пользователей нет</h6>
    <div v-if="users.length > 0">
      <input
        v-model.trim="findString"
        type="text"
        placeholder="Поиск по пользователям"
      />
      <div class="oneUser" v-for="user in filterUser" :key="user.id">
        <p>{{ user.id }}.</p>
        <p>{{ user.surname }} {{ user.name }} {{ user.patricity }}</p>
        <p>{{ user.gender }}</p>
        <p>{{ user.login }}</p>
        <p>{{ user.password }}</p>
        <button @click="showModalEdit(user)">
          <i18n path="edit"
            ><span place="title">{{ $t("edit") }}</span></i18n
          >
        </button>
        <button @click="showModalDelete(user)">
          <i18n path="delete"
            ><span place="title">{{ $t("delete") }}</span></i18n
          >
        </button>
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
import popup from "@/components/admin/Popup.vue";
import minialert from "@/components/admin/MiniAlert.vue";
import { required, minLength } from "vuelidate/lib/validators";
import { USERS_QUERY } from "@/graphql/queries";

export default {
  components: { minialert, popup },
  apollo: {
    users: {
      query: USERS_QUERY
    }
  },
  data() {
    return {
      nameOfUser: "",
      index: 0,
      oneUser: {
        id: -1,
        name: "",
        surname: "",
        patricity: "",
        gender: "",
        birthday: new Date(),
        login: "",
        password: ""
      },
      isShowAlertDelete: false,
      isShowAlertEdit: false,
      isShowModalEdit: false,
      isShowModalDelete: false,
      findString: "",
      surname: ""
      // users: [
      //   {
      //     id: 1,
      //     name: "Иван",
      //     surname: "Иванов",
      //     patricity: "Иванович",
      //     gender: "Мужской",
      //     birthday: new Date(),
      //     login: "ivanovIvan",
      //     password: "123456",
      //     createAt: new Date(),
      //     updateAt: new Date()
      //   },
      //   {
      //     id: 2,
      //     name: "Петр",
      //     surname: "Петров",
      //     patricity: "Петрович",
      //     gender: "Мужской",
      //     birthday: new Date(),
      //     login: "ivanovIvan",
      //     password: "123456",
      //     createAt: new Date(),
      //     updateAt: new Date()
      //   }
      // ]
    };
  },
  validations: {
    oneUser: {
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
    showModalDelete(user) {
      (this.nameOfUser = `${user.surname} ${user.name} ${user.patricity}`),
        (this.isShowModalDelete = true);
      this.index = this.users.findIndex(el => el.id === user.id);
      this.oneUser = user;
      this.surname = this.oneUser.surname;
    },
    showModalEdit(user) {
      (this.nameOfUser = `${user.surname} ${user.name} ${user.patricity}`),
        (this.oneUser = Object.assign(this.oneUser, user));
      this.isShowModalEdit = true;
    },
    saveUserOnPopup() {
      this.isShowModalEdit = false;
      this.index = this.users.findIndex(el => el.id === this.oneUser.id);
      this.users.splice(this.index, 1, this.oneUser);
      this.isShowAlertEdit = true;
      setTimeout(() => {
        this.isShowAlertEdit = false;
      }, 3000);
    }
    // closePopup() {
    //   this.isShowModalEdit = false;
    //   this.index = this.users.findIndex(el => el.id === this.oneUser.id);
    //   this.users.splice(this.index, 1);
    //   this.isShowAlertDelete = true;
    //   setTimeout(() => {
    //     this.isShowAlertDelete = false;
    //   }, 3000);
    // }
  },
  computed: {
    filterUser() {
      if (this.findString !== "") {
        return this.users.filter(el => {
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
button {
  width: 100%;
  margin: 0 5%;
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
