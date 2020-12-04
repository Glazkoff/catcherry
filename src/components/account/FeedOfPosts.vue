<template>
  <div v-if="!this.$apollo.queries.posts.loading" class="doubleColumn">
    <div class="flexbox">
      <div>
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
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import NonDetailedPost from "@/components/NonDetailedPost.vue";
import ListOfNotifications from "@/components/account/ListOfNotifications.vue";
import Loader from "@/components/Loader.vue";
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
    ListOfNotifications,
    Loader
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
.wrapOfLoader {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  background: $dark_blue;
  z-index: 99999;
  width: 100vw;
  height: 100vh;
  padding-top: calc(50vh - 100px);
}

.flexbox {
  display: flex;
  width: 100%;
  padding: 3rem;
  flex-direction: column;
}
.doubleColumn {
  display: flex;
  justify-content: space-between;
  & .flexbox h2 {
    margin-top: 0;
    margin-bottom: 2.5rem;
  }
}
</style>
