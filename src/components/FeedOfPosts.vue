<template>
  <div class="flexbox">
    <h1 v-if="this.$apollo.queries.posts.loading">Это лоадер</h1>
    <div v-else>
      <div v-if="!this.isEmpty">
        <non-detailed-post
          @like="onLike"
          @comment="onComment"
          v-for="post in posts"
          :key="post.id"
          :post="post"
        ></non-detailed-post>
      </div>
      <h2 v-else>Постов пока нет, мне очень жаль</h2>
    </div>
  </div>
</template>

<script>
import NonDetailedPost from "../components/NonDetailedPost.vue";
import { POSTS_QUERY } from "@/graphql/queries";
export default {
  name: "FeedOfPosts",
  apollo: {
    posts: {
      query: POSTS_QUERY
    }
  },
  computed: {
    isEmpty() {
      if (!this.$apollo.queries.posts.loading) {
        if (this.posts != undefined || this.posts.length != 0) return false;
        else return true;
      } else return false;
    }
  },
  components: {
    NonDetailedPost
  },
  data() {
    return {};
  },
  methods: {
    onLike(object) {
      console.log("Нажата кнопка лайка для поста с id " + object.id);
      // console.log(this.posts);
    },
    onComment(object) {
      console.log("Нажата кнопка комментария для поста с id " + object.id);
    }
  }
};
</script>

<style>
.flexbox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
