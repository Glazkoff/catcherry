<template>
  <div>
    <h4>Тестовый Graphql компонент</h4>
    <h4 v-if="this.$apollo.queries.users.loading">Загружается...</h4>
    <input type="text" placeholder="Введите имя" v-model="newUser" />
    <button @click="toAddUser()">Добавить</button>
    <table>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.__typename }}</td>
        <td><button @click="toDeleteUser(user.id)">Удалить</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import {
  USERS_QUERY,
  DELETE_USER_QUERY,
  CREATE_USER_QUERY,
} from "../graphql/queries";
export default {
  name: "TestGraphql",
  apollo: {
    users: {
      query: USERS_QUERY,
    },
  },
  data() {
    return {
      newUser: "",
    };
  },
  methods: {
    toAddUser() {
      let username = this.newUser;
      this.newUser = "";
      this.$apollo
        .mutate({
          mutation: CREATE_USER_QUERY,
          variables: {
            name: username,
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
              name: username,
            },
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          this.newUser = username;
          console.error(error);
        });
    },
    toDeleteUser(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_USER_QUERY,
          variables: {
            id,
          },
          update: (cache) => {
            let data = cache.readQuery({ query: USERS_QUERY });
            let index = data.users.findIndex((el) => el.id == id);
            data.users.splice(index, 1);
            cache.writeQuery({ query: USERS_QUERY, data });
          },
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
input[type="text"] {
  margin-right: 0.5rem;
  &,
  & + button {
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }
  & + button {
    border-radius: 2px;
    border: 0px;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(to top left, #647ce6, #3721ff);
    color: #fff;
    transition: all 3s ease-in;
    &:hover {
      background: linear-gradient(to top left, #3721ff, #39498f);
    }
  }
}
table {
  border-spacing: 0px;
  td {
    font-family: sans-serif;
    padding: 0.25rem;
    border: 1px solid #000;
    button {
      border: 0px solid #fff;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      cursor: pointer;
      background: linear-gradient(to top left, #e66465, #ff2121);
      color: #fff;
      transition: all 3s ease-in;
      &:hover {
        background: linear-gradient(to top left, #b14242, #ff2121);
      }
    }
  }
}
</style>
