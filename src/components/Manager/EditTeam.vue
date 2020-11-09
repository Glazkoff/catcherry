<template>
<div>
  <h3>Редактирование</h3>
  <hr />
  <span>Последнее редактирование: {{ updatedAt }} </span>
  <div>
    <form action="" @submit.prevent="toSaveEditTeam">
      <label for="name">Название</label>
      <input type="text" name="name" class="form-control" placeholder="Название" v-model="name" />
      <label for="description">Описание</label>
      <textarea name="description" class="form-control" id="" cols="10" rows="5" placeholder="Описание" v-model="description"></textarea>
      <label for="maxUsersLimit">Число</label>
      <input type="number" name="maxUsersLimit" class="form-control" placeholder="Максимальное число участников" v-model="maxUsersLimit" />
      <button type="submit" class="btn btn-primary">
        Сохранить
      </button>
    </form>
  </div>
</div>
</template>

<script>
import {
  TEAMS_QUERY,
  UPDATE_TEAMS_QUERY
} from "@/graphql/queries";
export default {
  apollo: {
    teams: {
      query: TEAMS_QUERY
    }
  },
  data() {
    return {
      id: this.$route.params.id,
      name: this.$route.params.name,
      description: this.$route.params.description,
      maxUsersLimit: this.$route.params.maxUsersLimit,
      updatedAt: ""
    };
  },
  methods: {
    toSaveEditTeam() {
      this.$apollo
        .mutate({
          mutation: UPDATE_TEAMS_QUERY,
          variables: {
            id: this.id,
            name: this.name,
            description: this.description,
            maxUsersLimit: this.maxUsersLimit
          },
          update: cache => {
            let data = cache.readQuery({
              query: TEAMS_QUERY
            });
            data.teams.find(el => el.id === this.id).name = this.name;
            data.teams.find(
              el => el.id === this.id
            ).description = this.description;
            data.teams.find(
              el => el.id === this.id
            ).maxUsersLimit = this.maxUsersLimit;
          }
        })
        .then(data => {
          this.updatedAt = new Date().toLocaleString();
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
form {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

form input,
textarea {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

form button {
  padding: 0.5rem;
}
</style>
