<template>
  <div>
    <h3>Редактирование</h3>
    <hr />
    <span>Последнее редактирование: </span>
    <form action="">
      <label for="name">Название</label>
      <input type="text" class="form-control" placeholder="Название" />
      <label for="description">Описание</label>
      <textarea
        name="description"
        class="form-control"
        id=""
        cols="10"
        rows="5"
        placeholder="Описание"
      ></textarea>
      <button type="submit" class="btn btn-primary">Сохранить</button>
    </form>
  </div> 
</template>

<script>
export default {};
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
