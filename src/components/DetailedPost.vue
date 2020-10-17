<template>
  <div class="container">
    <img src="../assets/placeholder.png" alt="placeholder" />
    <div class="postBody">
      <h1>{{ this.post.headline }}</h1>
      <p class="date">{{ this.post.date }}</p>
      <p>
        {{ this.post.body }}
      </p>
      <button v-on:click="onLike()">Лайк</button>
      <button v-on:click="onComment()">Коммент</button>
      <button v-on:click="onRepost()">Репост</button>
      <div class="postComments">
        <div v-for="comment in comments" :key="comment.id">
          <p>{{ comment.author }}</p>
          <p>{{ comment.body }}</p>
        </div>
        <form @submit.prevent="onAddComment">
          <textarea
            v-model="message"
            rows="10"
            placeholder="Добавить комментарий"
          ></textarea>
          <input type="submit" value="Добавить" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailedPost",
  data() {
    return {
      message: null,
      errors: [],
      post: {
        headline: "Новая срочная новость из отдела техподдержки",
        date: "29.09.2020 17:00",
        body:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?",
      },
      comments: [
        {
          id: 1,
          author: "Олег Дубенский",
          body:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?",
        },
        {
          id: 2,
          author: "Олег Недубенский",
          body:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?",
        },
      ],
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
    onAddComment() {
      console.log("Был оставлен комментарий: " + this.message);
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

.postBody {
  margin: 5%;
}

.postComments {
  margin: 0 5% 0 5%;
}

.date {
  text-align: right;
}

h1 {
  text-align: center;
}

textarea {
  width: 100%;
}

button {
  margin: 0 1% 3% 0;
}

input[type="submit"] {
  display: block;
  margin: 0 0 0 auto;
}
</style>
