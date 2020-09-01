<template>
  <div>
    <h4>Тестовый Graphql компонент</h4>
    <h4 v-if="this.$apollo.queries.users.loading">Загружается...</h4>
    {{ users }}
  </div>
</template>

<script>
import { usersQuery } from "../graphql/queries";
export default {
  name: "TestGraphql",
  apollo: {
    users: {
      query: usersQuery,
    },
  },
};
</script>

<style lang="scss" scoped></style>
