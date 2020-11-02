<template>
  <div class="container">
    <div class="containerImg">
      <img src="../assets/placeholder.png" alt="placeholder" />
    </div>
    <div class="postBody">
      <h1>{{ this.post.headline }}</h1>
      <p class="date">{{ this.post.date }}</p>
      <p>
        {{ this.post.body }}
      </p>
      <span class="countLike">99</span>
      <button v-on:click="onLike()">Лайк</button>
      <span class="countComment">9</span>
      <button v-on:click="onComment()">Коммент</button>
      <span class="countRepost">999</span>
      <button v-on:click="onShare()">Репост</button>
      <div class="postComments">
        <div v-for="comment in comments" :key="comment.id">
          <p>{{ comment.author }}</p>
          <p class="commentBody">{{ comment.body }}</p>
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
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  data() {
    return {
      message: null,
      post: {
        headline: "Новая срочная новость из отдела техподдержки",
        date: "29.09.2020 17:00",
        body:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?"
      },
      comments: [
        {
          id: 1,
          author: "Олег Дубенский",
          body:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?"
        },
        {
          id: 2,
          author: "Олег Недубенский",
          body:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae suscipit voluptate nemo. Perferendis, impedit! Quaerat nemo nulla soluta sunt accusamus in quae sed. Nam perferendis ratione totam autem minus quibusdam?"
        }
      ]
    };
  },
  methods: {
    onLike() {
      console.log("Нажата кнопка лайка");
    },
    onComment() {
      console.log("Нажата кнопка комментария");
    },
    onShare() {
      console.log("Нажата кнопка репоста");
    },
    onAddComment() {
      console.log("Был оставлен комментарий: " + this.message);
    }
  }
};
</script>

<style scoped>
.container {
  margin: 5%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
  border-radius: 8px 8px 0px 0px;
  color: purple;
}

.container img {
  margin-right: 5%;
  width: 100%;
  margin: 0 auto;
  display: block;
}

.containerImg {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100%;
  overflow: hidden;
}

.postBody {
  margin: 5%;
}

.postComments {
  margin: 0 5% 0 5%;
}

.commentBody {
  padding: 0 5% 0 5%;
}

.date {
  text-align: right;
}

span {
  padding: 5px;
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
