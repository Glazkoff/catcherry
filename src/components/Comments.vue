<template>
  <div class="col-12">
    <div class="col-12 postComments">
      <h2 class="heading">Комментарии</h2>
      <form @submit.prevent="onAddComment" class="form-group">
        <div class="form-group">
          <textarea
            v-model="message"
            rows="3"
            class="form-control col-8 dark"
            placeholder="Описание"
          ></textarea>
        </div>
        <div class="form-group">
          <button class="btn btn-alternate" type="submit">Добавить</button>
        </div>
      </form>
      <div class="oneComment" v-for="comment in comments" :key="comment.id">
        <h5>{{ comment.author }}</h5>
        <p class="bodyOfComment">{{ comment.body }}</p>
      </div>
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

<style scoped lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_grid.scss";
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
  line-height: 2rem;
}
.bodyOfComment {
  margin-top: 0.6rem;
  color: $gray;
}
.oneComment {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid $bright_violet;
}
</style>
