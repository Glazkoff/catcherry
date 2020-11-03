<template>
  <div class="flexbox">
    <non-detailed-post
      @like="onLike"
      @comment="onComment"
      @share="onShare"
      v-for="post in posts"
      :key="post.id"
      :post="post"
    ></non-detailed-post>
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
  components: {
    NonDetailedPost
  },
  data() {
    return {};
  },
  methods: {
    onLike(object) {
      console.log("Нажата кнопка лайка для поста с id " + object.id);
      console.log(this.posts);
    },
    onComment(object) {
      console.log("Нажата кнопка комментария для поста с id " + object.id);
    },
    onShare(object) {
      console.log("Нажата кнопка репоста для поста с id " + object.id);
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
