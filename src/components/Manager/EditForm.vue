<template>
  <div>
    <span>Последнее редактирование: {{ $d(t.updatedAt, "long") }} </span>
    <form
      action=""
      @submit="$emit('update', name, description, parseInt(maxUsersLimit))"
    >
      <label for="name">Название</label>
      <input
        type="text"
        name="name"
        class="form-control"
        placeholder="Название"
        v-model="name"
      />
      <label for="description">Описание</label>
      <textarea
        name="description"
        class="form-control"
        id=""
        cols="10"
        rows="5"
        placeholder="Описание"
        v-model="description"
      ></textarea>
      <label for="maxUsersLimit">Максимальное число пользователей</label>
      <input
        type="number"
        name="maxUsersLimit"
        class="form-control"
        placeholder="Максимальное число участников"
        v-model="maxUsersLimit"
      />
      <button type="submit" class="btn btn-primary">
        Сохранить
      </button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["t"], // Команда, которую хотим редактировать
  data() {
    return {
      name: this.t.name,
      description: this.t.description,
      maxUsersLimit: this.t.maxUsersLimit
    };
  },
  methods: {}
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
