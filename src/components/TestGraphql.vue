<template>
  <div>
    <h4>Тестовый Graphql компонент</h4>
    <h4 v-if="this.$apollo.queries.users.loading">Загружается...</h4>
    <!-- {{ users }} -->
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
import { USERS_QUERY, DELETE_USER_QUERY } from "../graphql/queries";
export default {
  name: "TestGraphql",
  apollo: {
    users: {
      query: USERS_QUERY,
    },
  },
  methods: {
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
