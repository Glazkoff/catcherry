<template>
  <div class="container">
    <img src="../assets/placeholder.png" alt="placeholder" />
    <h2>{{ this.headline }}</h2>
    <p class="postDate">{{ this.date }}</p>
    <p class="postBody">
      {{ this.body }}
    </p>
    <span class="countLike">10</span>
    <button v-on:click="onLike()">Лайк</button>
    <span class="countComment">999</span>
    <button v-on:click="onComment()">Коммент</button>
    <span class="countRepost">9</span>
    <button v-on:click="onRepost()">Репост</button>
  </div>
</template>

<script>
export default {
  name: "OnePostList",
  data() {
    return {
      errors: [],
      headline: "Новая срочная новость из отдела техподдержки",
      date: "29.09.2020 17:00",
      body:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?"
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
    }
  }
};
</script>

<style scoped>
.container {
  /* border: 1px solid #b1b1b1; */
  border-radius: 8px;
  margin: 5%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
}

.container img {
  box-shadow: 0;
  margin-right: 5%;
  float: left;
  max-width: 30%;
  height: auto;
  display: block;
}

h2 {
  color: purple;
}

p.postBody {
  height: 5em;
  overflow: hidden;
  padding: 5px;
  text-overflow: ellipsis;
}

span {
  padding: 5px;
}

button {
  margin: 0 1% 0 0;
}
</style>
