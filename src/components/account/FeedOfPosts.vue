<template>
  <div v-if="!this.$apollo.queries.posts.loading" class="doubleColumn">
    <div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <BreadCrumbs></BreadCrumbs>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12" v-if="!this.isEmpty">
            <non-detailed-post
              @like="onLike"
              v-for="post in posts"
              :key="post.id"
              :post="post"
            ></non-detailed-post>
          </div>
          <div v-else class="col-12">
            <h3>Постов пока нет, мне очень жаль</h3>
          </div>
        </div>
      </div>
    </div>
    <list-of-notifications></list-of-notifications>
  </div>
  <div v-else class="wrapOfLoader">
    <Loader></Loader>
  </div>
</template>

<script>
import NonDetailedPost from "@/components/NonDetailedPost.vue";
import ListOfNotifications from "@/components/account/ListOfNotifications.vue";
import Loader from "@/components/Loader.vue";
import BreadCrumbs from "@/components/BreadCrumbs.vue";
import {
  POSTS_QUERY,
  CREATE_LIKE_OF_POST,
  DELETE_LIKE_OF_POST
} from "@/graphql/queries";
export default {
  name: "FeedOfPosts",
  apollo: {
    posts: {
      query: POSTS_QUERY,
      variables() {
        return {
          userId: this.userId
        };
      }
    }
  },
  computed: {
    isEmpty() {
      if (this.posts == undefined) {
        return true;
      } else {
        if (this.posts.length == 0) {
          return true;
        } else return false;
      }
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
    Loader,
    BreadCrumbs
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
              let data = cache.readQuery({
                query: POSTS_QUERY,
                variables: {
                  userId: this.userId
                }
              });
              let indexlikedPost = data.posts.findIndex(
                el => el.id == object.id
              );
              if (data.posts[indexlikedPost] != null) {
                let indexLike = data.posts[
                  indexlikedPost
                ].likesOfPost.findIndex(el => el.userId == this.userId);
                data.posts[indexlikedPost].likesOfPost.splice(indexLike, 1);
              }
              cache.writeQuery({
                query: POSTS_QUERY,
                variables: {
                  userId: this.userId
                },
                data
              });
            }
          })
          .then()
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
              let data = cache.readQuery({
                query: POSTS_QUERY,
                variables: {
                  userId: this.userId
                }
              });
              let indexlikedPost = data.posts.findIndex(
                el => el.id === object.id
              );
              if (data.posts[indexlikedPost] != null) {
                data.posts[indexlikedPost].likesOfPost.push({
                  userId: this.userId,
                  __typename: "LikeOfPost"
                });
              }
              cache.writeQuery({
                query: POSTS_QUERY,
                variables: {
                  userId: this.userId
                },
                data
              });
            }
          })
          .then()
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/_grid.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_dimensions.scss";

.doubleColumn {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
