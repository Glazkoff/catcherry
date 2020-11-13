<template>
  <div class="postComments">
    <h2 class="heading">Комментарии</h2>
    <form @submit.prevent="onAddComment">
      <textarea
        v-model="message"
        rows="3"
        placeholder="Добавить комментарий"
      ></textarea>
      <input class="btn btn-secondary" type="submit" value="Добавить" />
    </form>
    <div class="oneComment" v-for="comment in comments" :key="comment.id">
      <p class="authorOfComment">{{ comment.author }}</p>
      <p class="bodyOfComment">{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comments",
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  data() {
    return {
      message: null,
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
    onAddComment() {
      console.log("Добавление комментария");
    }
  }
};
</script>

<style scoped>
textarea {
  width: 100%;
  background: #ffffff;
  border: 1px solid #aa87ce;
  box-sizing: border-box;
  border-radius: 0.5rem;
  resize: none;
  padding: 0.6rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-family: sans-serif;
}

textarea:focus,
input.btn {
  outline: none;
}
.heading {
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #613490;
}

.authorOfComment {
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 0;
  color: #4c235b;
}
.bodyOfComment {
  margin-top: 0.6rem;
}
.oneComment {
  margin-bottom: 1.5px;
}
</style>
