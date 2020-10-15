<template>
    <div class="main">
        <popup @answer="closePopup" v-if="isShowModalEdit" :user='users[index]'>
            <h3 slot="header">Редактирование пользователя {{ nameOfUser }}</h3>
            <p slot="action">Сохранить</p>
            <div slot="body">
                <form>
                    <input v-model="surname">
                </form>
            </div>
        </popup>
        <popup @answer="closePopup" v-if="isShowModalDelete">
            <h3 slot="header">Вы действительно хотите удалить пользователя {{ nameOfUser }}?</h3>
            <p slot="action">Удалить</p>
        </popup>
        <h2>Список пользователей</h2>
        <h6 v-if="users.length==0">К сожалению, пока пользователей нет</h6>
        <table v-if="users.length>0">
            <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}.</td>
                <td>{{ user.surname }} {{ user.name }} {{ user.patricity }}</td>
                <td>{{ user.gender }}</td>
                <td>{{ user.login }}</td>
                <td>{{ user.password }}</td>
                <td><button @click="showModalEdit(user)">Редактировать</button></td>
                <td><button @click="showModalDelete(user)">Удалить</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import popup from '@/components/admin/Popup.vue'
export default {
    components: { popup },
  data() {
    return {
        nameOfUser: '',
        index: 0,
        oneUser: {},
        isShowModalEdit: false,
        isShowModalDelete: false,
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
        this.isShowModalEdit = true;
      },
      closePopup(ans) {
          this.isShowModalDelete = false;
          this.isShowModalEdit = false;
          if (ans.ans) {
              this.index = this.users.findIndex(el => el.id === this.oneUser.id);
              this.users.splice(this.index, 1);
          }
      }
  },
};
</script>

<style lang="scss" scoped>

</style>