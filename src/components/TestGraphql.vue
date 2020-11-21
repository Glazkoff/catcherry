<template>
  <div>
    <h4>Тестовый Graphql компонент</h4>
    <h5 v-if="queryError">{{ queryError }}</h5>
    <h4 v-if="this.$apollo.queries.users.loading">Загружается...</h4>
    <div v-if="editUser.isEdit">
      <label for="editUserName"
        >Редактирование пользователя #{{ editUser.id }}
        <input
          id="editUserName"
          type="text"
          placeholder="Введите имя"
          v-model="editUser.name"
        />
      </label>
      <button class="primary" @click="toSaveEditUser()">Сохранить</button>
    </div>
    <div v-else>
      <input type="text" placeholder="Введите имя" v-model="newUser" />
      <button class="primary block" @click="toAddUser()">Добавить</button>
    </div>
    <table>
      <tr>
        <td>№</td>
        <td>Имя</td>
        <td>Логин</td>
        <td>Дата регистрации</td>
        <td>Дата обновления</td>
        <td colspan="2">Действия</td>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td v-if="user.isEdit">
          <input type="text" placeholder="Введите имя" v-model="user.name" />
        </td>
        <td v-else>{{ user.name }}</td>
        <td>{{ user.login }}</td>
        <td>{{ $d(user.createdAt, "long") }}</td>
        <td>{{ $d(user.updatedAt, "long") }}</td>
        <td v-if="user.isEdit">
          <button class="primary" @click="toSaveEditUser(user.id)">Сохранить</button>
        </td>
        <td><button class="primary" @click="toEditUser(user.id)">Редактировать</button></td>
        <td><button class="alternate" @click="toDeleteUser(user.id)">Удалить</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import {
  CREATE_USER_QUERY,
  USERS_QUERY,
  UPDATE_USER_QUERY,
  DELETE_USER_QUERY
} from "@/graphql/queries";
export default {
  name: "TestGraphql",
  apollo: {
    users: {
      query: USERS_QUERY,
      error(error) {
        this.queryError = JSON.stringify(error.message);
      }
    }
  },
  data() {
    return {
      queryError: null,
      newUser: "",
      editUser: {
        isEdit: false,
        name: "",
        id: -1
      }
    };
  },
  methods: {
    toSaveEditUser() {
      this.editUser.isEdit = false;
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_QUERY,
          variables: {
            name: this.editUser.name,
            id: this.editUser.id
          },
          update: (cache, { data: { updateUser } }) => {
            let data = cache.readQuery({ query: USERS_QUERY });
            console.log(data);
            data.users.find(
              el => el.id === this.editUser.id
            ).name = this.editUser.name;
            cache.writeQuery({ query: USERS_QUERY, data });
            console.log(updateUser);
          },
          optimisticResponse: {
            __typename: "Mutation",
            createUser: {
              __typename: "User",
              id: -1,
              name: this.editUser.name
            }
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    toEditUser(id) {
      let editUser = this.users.find(el => el.id === id);
      this.editUser.name = editUser.name;
      this.editUser.id = editUser.id;
      this.editUser.isEdit = true;
    },
    toAddUser() {
      let username = this.newUser;
      this.newUser = "";
      this.$apollo
        .mutate({
          mutation: CREATE_USER_QUERY,
          variables: {
            name: username
          },
          update: (cache, { data: { createUser } }) => {
            let data = cache.readQuery({ query: USERS_QUERY });
            data.users.push(createUser);
            cache.writeQuery({ query: USERS_QUERY, data });
          },
          optimisticResponse: {
            __typename: "Mutation",
            createUser: {
              __typename: "User",
              id: -1,
              name: username
            }
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          this.newUser = username;
          console.error(error);
        });
    },
    toDeleteUser(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_USER_QUERY,
          variables: {
            id
          },
          update: cache => {
            let data = cache.readQuery({ query: USERS_QUERY });
            let index = data.users.findIndex(el => el.id == id);
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
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  border-spacing: 0px;
  td {
    font-family: sans-serif;
    padding: 0.25rem;
    border: 1px solid #000;
  }
}
</style>
