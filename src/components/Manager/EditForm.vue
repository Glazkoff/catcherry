<template>
<div>
  <span>Последнее редактирование: {{ stampToDate(t.updatedAt) }} </span>
  <form action="" @submit="$emit('update', name, description, parseInt(maxUsersLimit))">
    <label for="name">Название</label>
    <input type="text" name="name" class="form-control" placeholder="Название" v-model="name" />
    <label for="description">Описание</label>
    <textarea name="description" class="form-control" id="" cols="10" rows="5" placeholder="Описание" v-model="description"></textarea>
    <label for="maxUsersLimit">Максимальное число пользователей</label>
    <input type="number" name="maxUsersLimit" class="form-control" placeholder="Максимальное число участников" v-model="maxUsersLimit" />
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
  methods: {
    // Метод для корректного отображения даты последнего редактирования
    stampToDate(stamp) {
      let a = new Date(+stamp);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
      return time;
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
