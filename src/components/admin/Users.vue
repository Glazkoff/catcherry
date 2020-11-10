<template>
    <div class="main">
        <popup @answer="closePopup" v-if="isShowModalEdit" :user='users[index]'>
            <h3 slot="header">Редактирование пользователя {{ nameOfUser }}</h3>
            <div slot="body">
                <form>
                    <label for="surname">Фамилия</label>
                    <input name="surname" v-model="oneUser.surname" placeholder="Фамилия" required>
                    <label for="name">Имя</label>
                    <input name="name" v-model="oneUser.name" placeholder="Имя" required>
                    <label for="surname">Отчество (при наличии)</label>
                    <input name="patricity" v-model="oneUser.patricity" placeholder="Отчество" required>
                    <label for="surname">Пол</label>
                    <select name="gender" v-model="oneUser.gender" required>
                        <option>Мужской</option>
                        <option>Женский</option>
                    </select>
                    <label for="login">Логин</label>
                    <input name="login" v-model="oneUser.login" placeholder="Логин" required>
                    <label for="password">Пароль</label>
                    <input name="password" v-model="oneUser.password" placeholder="Пароль" required>
                </form>
            </div>
            <button slot="action" class="modal-default-button" @click="closePopup({ans: true, action: 'edit', user: oneUser})">Сохранить</button>
        </popup>
        <popup @answer="closePopup" v-if="isShowModalDelete">
            <h3 slot="header">Вы действительно хотите удалить пользователя {{ nameOfUser }}?</h3>
            <button slot="action" class="modal-default-button" @click="closePopup({ans: true, action: 'delete'})">Удалить</button>
        </popup>
        <h2>Список пользователей</h2>
        <h6 v-if="users.length==0">К сожалению, пока пользователей нет</h6>
        <div v-if="users.length>0">
            <input v-model="findString" type="text" placeholder="Поиск по пользователям">
            <div class="oneUser" v-for="user in filterUser" :key="user.id">
                <p>{{ user.id }}.</p>
                <p>{{ user.surname }} {{ user.name }} {{ user.patricity }}</p>
                <p>{{ user.gender }}</p>
                <p>{{ user.login }}</p>
                <p>{{ user.password }}</p>
                <button @click="showModalEdit(user)">Редактировать</button>
                <button @click="showModalDelete(user)">Удалить</button>
            </div>
        </div>
        <minialert v-if="isShowAlertEdit"><p slot="title">Вы успешно изменили пользователя</p></minialert>
        <minialert v-if="isShowAlertDelete"><p slot="title">Вы успешно удалили пользователя</p></minialert>
    </div>
</template>

<script>
import popup from '@/components/admin/Popup.vue'
import minialert from '@/components/admin/MiniAlert.vue'

export default {
    components: { minialert, popup },
  data() {
    return {
        nameOfUser: '',
        index: 0,
        oneUser: {},
        isShowAlertDelete: false,
        isShowAlertEdit: false,
        isShowModalEdit: false,
        isShowModalDelete: false,
        findString: '',
        users: [{
            id: 1,
            name: "Иван",
            surname: "Иванов",
            patricity: "Иванович",
            gender: "Мужской",
            birthday: new Date(),
            login: "ivanovIvan",
            password: "123456",
            createAt: new Date(),
            updateAt: new Date()
        },
        {
            id: 2,
            name: "Петр",
            surname: "Петров",
            patricity: "Петрович",
            gender: "Мужской",
            birthday: new Date(),
            login: "ivanovIvan",
            password: "123456",
            createAt: new Date(),
            updateAt: new Date()
        }]
    };
  },
  methods: {
      showModalDelete(user) {
        this.nameOfUser = `${user.surname} ${user.name} ${user.patricity}`,
        this.isShowModalDelete = true;
        this.index = this.users.findIndex(el => el.id === user.id);
        this.oneUser = user;
      },
      showModalEdit(user) {
        this.nameOfUser = `${user.surname} ${user.name} ${user.patricity}`,
        console.log(user);
        this.oneUser = Object.assign(this.oneUser, user);
        this.isShowModalEdit = true;
      },
      closePopup(ans) {
          this.isShowModalDelete = false;
          this.isShowModalEdit = false;
          if (ans.ans && ans.action === 'delete') {
              this.index = this.users.findIndex(el => el.id === this.oneUser.id);
              this.users.splice(this.index, 1);
              this.isShowAlertDelete = true;
              setTimeout(() => {
                  this.isShowAlertDelete = false;
              }, 3000)
          } else if (ans.ans && ans.action === 'edit') {
              this.index = this.users.findIndex(el => el.id === this.oneUser.id);
              this.users.splice(this.index, 1, ans.user);
              this.isShowAlertEdit = true;
              setTimeout(() => {
                  this.isShowAlertEdit = false;
              }, 3000)
          }
      }
  },
  computed: {
    filterUser() {
      if (this.findString !== "") {
        return this.users.filter((el) => {
          return (
            (el.surname.toLowerCase().indexOf(this.findString.toLowerCase()) !==-1 && el.surname !== "") ||
            (el.name.toLowerCase().indexOf(this.findString.toLowerCase()) !==-1 && el.name !== "") || 
            (el.patricity.toLowerCase().indexOf(this.findString.toLowerCase()) !==-1 && el.patricity !== ""));
        });
      } else {
        return this.users;
      }
    },
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
</style>