<template>
    <div class="main">
        <popup v-if="isShowModalEdit" @close="isShowModalEdit = false">
            <h3 slot="header">Редактировать пользователя</h3>
        </popup>
        <popup v-if="isShowModalDelete" @close="isShowModalDelete = false">
            <h3 slot="header">Вы действительно хотите удалить пользователя </h3>
        </popup>
        <h2>Список пользователей</h2>
        <table>
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
          this.isShowModalDelete = true;
          this.$emit('ModalDelete', user);
      }
  },
};
</script>

<style lang="scss" scoped>

</style>