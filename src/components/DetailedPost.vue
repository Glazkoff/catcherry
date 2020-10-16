<template>
  <div class="container">
    <img src="../assets/placeholder.png" alt="placeholder" />
    <h2>{{ this.headline }}</h2>
    <p>{{ this.date }}</p>
    <p>
      {{ this.body }}
    </p>
    <button v-on:click="onLike()">Лайк</button>
    <button v-on:click="onComment()">Коммент</button>
    <button v-on:click="onRepost()">Репост</button>
  </div>
</template>

<script>
export default {
  name: "DetailedPost",
  data() {
    return {
      errors: [],
      headline: "Новая срочная новость из отдела техподдержки",
      date: "29.09.2020 17:00",
      body:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?",
    };
  },
  methods: {
    onLike() {
      console.log("Нажата кнопка лайка");
    },
    onComment() {
      console.log("Нажата кнопка комментария");
    },
    onRepost() {
      console.log("Нажата кнопка репоста");
    },
  },
};
</script>

<style scoped>
.container {
  border: 1px solid #b1b1b1;
  margin: 5%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.container img {
  margin-right: 5%;
  /* float: left; */
  /* max-width: 30%; */
  height: 50vh;
  width: 100%;
  display: block;
}

button {
  margin: 0 1% 0 0;
}
</style>
