<template>
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
</template>

<script>
export default {
  name: "Comments",
  computed: {
    id() {
      return this.$route.params.id
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
  }
};
</script>

<style scoped>
.postComments {
  margin: 0 5% 0 5%;
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