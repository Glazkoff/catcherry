<template>
  <div>
    <h1>Создание нового поста</h1>
    <form action="">
      <label for="image">Загрузите изображение:</label><br />
      <input type="file" name="image" id="image" /><br />
      <label for="">Введите заговок поста:</label><br />
      <input type="text" name="heading" id="heading" /><br />
      <label for="">Введите текст поста:</label><br />
      <textarea name="" id="" rows="10"></textarea><br />
      <label for="">Введите дату публикации:</label><br />
      <input type="date" name="" id="" /><br />
      <input type="submit" value="Опубликовать" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatePost",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
div {
  width: 80%;
  margin: 0 auto;
}
textarea {
  width: 100%;
}
</style>
