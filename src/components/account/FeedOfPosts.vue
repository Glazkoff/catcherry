<template>
  <div class="doubleColumn">
    <div class="flexbox">
      <h2>Лента новостей</h2>
      <h1 v-if="this.$apollo.queries.posts.loading">Это лоадер</h1>
      <div v-else>
        <div v-if="!this.isEmpty">
          <non-detailed-post
            @like="onLike"
            v-for="post in posts"
            :key="post.id"
            :post="post"
          ></non-detailed-post>
        </div>
        <h3 v-else>Постов пока нет, мне очень жаль</h3>
      </div>
    </div>
    <list-of-notifications></list-of-notifications>
  </div>
</template>

<script>
import NonDetailedPost from "@/components/NonDetailedPost.vue";
import ListOfNotifications from "@/components/account/ListOfNotifications.vue";
import {
  POSTS_QUERY,
  CREATE_LIKE_OF_POST,
  DELETE_LIKE_OF_POST
} from "@/graphql/queries";
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
    },
    userId() {
      if (this.$store.getters.decodedToken != null) {
        return this.$store.getters.decodedToken.id;
      } else return null;
    }
  },
  components: {
    NonDetailedPost,
    ListOfNotifications
  },
  data() {
    return {};
  },
  methods: {
    onLike(object) {
      if (object.isLikedByUser) {
        this.$apollo
          .mutate({
            mutation: DELETE_LIKE_OF_POST,
            variables: {
              userId: this.userId,
              postId: object.id
            },
            update: cache => {
              let data = cache.readQuery({ query: POSTS_QUERY });
              let indexlikedPost = data.posts.findIndex(
                el => el.id === object.id
              );
              if (data.posts[indexlikedPost] != null) {
                let indexLike = data.posts[
                  indexlikedPost
                ].likesOfPost.findIndex(el => el.userId == this.userId);
                data.posts[indexlikedPost].likesOfPost.splice(indexLike, 1);
              }
              cache.writeQuery({ query: POSTS_QUERY, data });
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.$apollo
          .mutate({
            mutation: CREATE_LIKE_OF_POST,
            variables: {
              userId: this.userId,
              postId: object.id
            },
            update: cache => {
              let data = cache.readQuery({ query: POSTS_QUERY });
              let indexlikedPost = data.posts.findIndex(
                el => el.id === object.id
              );
              if (data.posts[indexlikedPost] != null) {
                data.posts[indexlikedPost].likesOfPost.push({
                  userId: this.userId,
                  __typename: "LikeOfPost"
                });
              }
              cache.writeQuery({ query: POSTS_QUERY, data });
            }
          })
          .then(data => {
            console.log(data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    onComment(object) {
      console.log("Нажата кнопка комментария для поста с id " + object.id);
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";

.flexbox {
  display: flex;
  width: 100%;
  padding: 3rem;
  flex-direction: column;
}
.doubleColumn {
  display: flex;
  justify-content: space-between;
}
</style>
