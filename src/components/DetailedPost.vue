<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-12 breadcrumbs">
          <p><span>Здесь должны быть хлебные крошки</span></p>
        </div>
      </div>
    </div>
    <div v-if="!this.$apollo.queries.post.loading" class="container">
      <div class="row">
        <div class="col-10 wrap">
          <div class="container m-0">
            <div class="row">
              <div class="col-5 m-0">
                <img
                  src="../assets/placeholder.png"
                  v-bind:alt="post.body.header"
                />
              </div>
              <div class="col-7 info-wrap">
                <h2 class="heading">
                  {{ post.body.header }}
                </h2>
                <small class="infoBody">
                  {{ post.body.text }}
                </small>
                <small class="infoDate">
                  {{ $d(post.createdAt, "number") }}
                </small>

                <div class="iconContainer">
                  <div class="iconAndNumber" v-on:click="onLike(post.id)">
                    <div class="icon">
                      <EmptyLike v-if="!isLikedByUser"></EmptyLike>
                      <FilledLike v-else></FilledLike>
                    </div>
                    <p class="numOfIcon">{{ post.likesOfPost.length }}</p>
                  </div>

                  <div class="iconAndNumber">
                    <div class="icon">
                      <Comment></Comment>
                    </div>
                    <p class="numOfIcon">3</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <Comments></Comments>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else><Loader></Loader></div>
  </div>
</template>

<script>
import EmptyLike from "@/assets/empty_like.svg?inline";
import FilledLike from "@/assets/filled_like.svg?inline";
import Comment from "@/assets/comment.svg?inline";
import Comments from "../components/Comments.vue";
import Loader from "@/components/Loader.vue";
import {
  POST_QUERY,
  CREATE_LIKE_OF_POST,
  DELETE_LIKE_OF_POST
} from "@/graphql/queries";
export default {
  name: "DetailedPost",
  computed: {
    userId() {
      if (this.$store.getters.decodedToken != null) {
        return this.$store.getters.decodedToken.id;
      } else return null;
    },
    isLikedByUser() {
      let likeIndex = this.post.likesOfPost.findIndex(el => {
        return +el.userId === +this.userId;
      });
      return likeIndex !== -1;
    }
  },
  apollo: {
    post: {
      query: POST_QUERY,
      variables() {
        return {
          id: this.$route.params.id,
          userId: this.userId
        };
      }
    }
  },
  components: { Loader, EmptyLike, FilledLike, Comment, Comments },
  data() {
    return {};
  },
  methods: {
    onLike(id) {
      if (this.isLikedByUser) {
        this.$apollo
          .mutate({
            mutation: DELETE_LIKE_OF_POST,
            variables: {
              userId: this.userId,
              postId: id
            },
            update: cache => {
              let data = cache.readQuery({
                query: POST_QUERY,
                variables: {
                  id: this.$route.params.id,
                  userId: this.userId
                }
              });
              let indexLikePostByUser = data.post.likesOfPost.findIndex(
                el => el.userId === this.userId
              );
              data.post.likesOfPost.splice(indexLikePostByUser, 1);
              cache.writeQuery({
                query: POST_QUERY,
                variables: {
                  id: this.$route.params.id,
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
              postId: id
            },
            update: cache => {
              let data = cache.readQuery({
                query: POST_QUERY,
                variables: {
                  id: this.$route.params.id,
                  userId: this.userId
                }
              });
              data.post.likesOfPost.push({
                userId: this.userId,
                __typename: "LikeOfPost"
              });
              cache.writeQuery({
                query: POST_QUERY,
                variables: {
                  id: this.$route.params.id,
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

<style scoped lang="scss">
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";
@import "@/styles/_grid.scss";

.wrap {
  background: $violet;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0.7rem;
}
.col-5 img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  max-width: 22rem;
}
.col-7.info-wrap {
  margin-top: 2rem;
  margin-left: 1.5rem;
  & h2 {
    margin-bottom: 1rem;
  }
  & .infoBody,
  & .infoDate {
    display: block;
    color: $light_grey;
    margin-bottom: 0.5rem;
  }
}
.iconContainer {
  display: flex;
  height: 20px;
}

.iconAndNumber {
  display: flex;
  cursor: pointer;
  align-items: center;
}

.iconAndNumber:first-child {
  margin-right: 2.8rem;
}

.numOfIcon {
  display: inline;
  color: $white;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-left: 0;
  margin-right: 0.3rem;
}
</style>
