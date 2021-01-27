<template>
  <div>
    <div class="marginB">
      <small>Последнее редактирование: {{ $d(t.updatedAt, "long") }} </small>
    </div>
    <form
      action=""
      @submit="$emit('update', name, description, parseInt(maxUsersLimit))"
    >
      <div class="form-group">
        <label for="name" class="form-name">{{ $t("nameInanimate") }}</label>
        <input
          type="text"
          name="name"
          class="form-control"
          :placeholder="$t('nameInanimate')"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="description" class="form-name">{{
          $t("description")
        }}</label>
        <textarea
          name="description"
          class="form-control"
          id=""
          cols="10"
          rows="5"
          :placeholder="$t('description')"
          v-model="description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="maxUsersLimit" class="form-name">{{
          $t("numberOfParticipants")
        }}</label>
        <input
          type="number"
          name="maxUsersLimit"
          class="form-control"
          :placeholder="$t('numberOfParticipants')"
          v-model="maxUsersLimit"
        />
      </div>
      <button type="submit" class="btn btn-alternate">
        {{ $t("save") }}
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
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
.form-control {
  background: $violet;
  border: 1px solid $violet_2;
  color: $gray;
  width: -webkit-fill-available;
}
.form-name {
  color: $white;
}
small {
  color: $gray;
}
.marginB {
  margin-bottom: 2rem;
}
.btn {
  margin-top: 4rem;
}
</style>
