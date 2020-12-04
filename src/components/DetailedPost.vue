<template>
  <div v-if="!this.$apollo.queries.post.loading" class="container">
    <div class="post">
      <div class="imageContainer">
        <img src="../assets/placeholder.png" v-bind:alt="post.body.header" />
      </div>
      <div class="infoContainer">
        <h1 class="heading">
          {{ post.body.header }}
        </h1>
        <p class="infoDate">
          {{ $d(post.createdAt, "number") }}
        </p>
        <p class="infoBody">
          {{ post.body.text }}
        </p>
        <div class="iconContainer">
          <div class="iconAndNumber" v-on:click="onLike(post.id)">
            <div class="icon">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="heart"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-inline--fa fa-heart fa-w-16 fa-3x"
              >
                <path
                  v-if="!isLikedByUser"
                  fill="#C4C4C4"
                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                ></path>
                <path
                  v-else
                  fill="#ED4C67"
                  d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                ></path>
              </svg>
            </div>
            <span class="numOfIcon">{{ post.likesOfPost.length }}</span>
          </div>

          <div class="iconAndNumber" v-on:click="onComment(post.id)">
            <div class="icon">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="comment"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                class="svg-inline--fa fa-comment fa-w-16 fa-3x"
              >
                <path
                  fill="#C4C4C4"
                  d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"
                ></path>
              </svg>
            </div>
            <span class="numOfIcon">3</span>
          </div>
        </div>
        <comments></comments>
      </div>
    </div>
  </div>
  <div v-else class="wrapOfLoader"><loader></loader></div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import Comments from "../components/Comments.vue";
import {
  ONE_POST_QUERY,
  DELETE_LIKE_OF_POST,
  CREATE_LIKE_OF_POST
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
      query: ONE_POST_QUERY,
      variables() {
        return {
          id: this.$route.params.id
        };
      }
    }
  },
  components: {
    Comments,
    Loader
  },
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
                query: ONE_POST_QUERY,
                variables: {
                  id: this.$route.params.id
                }
              });
              let indexLikePostByUser = data.post.likesOfPost.findIndex(
                el => el.userId === this.userId
              );
              data.post.likesOfPost.splice(indexLikePostByUser, 1);
              cache.writeQuery({
                query: ONE_POST_QUERY,
                variables: {
                  id: this.$route.params.id
                },
                data
              });
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
              postId: id
            },
            update: cache => {
              let data = cache.readQuery({
                query: ONE_POST_QUERY,
                variables: {
                  id: this.$route.params.id
                }
              });
              data.post.likesOfPost.push({
                userId: this.userId,
                __typename: "LikeOfPost"
              });
              cache.writeQuery({
                query: ONE_POST_QUERY,
                variables: {
                  id: this.$route.params.id
                },
                data
              });
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
    onComment() {
      console.log("Нажата кнопка комментария");
    }
  }
};
</script>

<style scoped lang="scss">
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

.container {
  display: flex;
  justify-content: center;
}
.post {
  width: 56rem;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
  border-radius: 0.5rem;
  margin-bottom: 4rem;
}

.imageContainer img {
  width: 56rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  max-height: 25rem;
}

.infoContainer {
  width: 44rem;
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.heading {
  margin-top: 0;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  line-height: 2rem;
  color: #613490;
  margin-bottom: 2rem;
}

.infoDate {
  font-size: 0.8rem;
  line-height: 1rem;
  color: #4c235b;
}

.infoBody {
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: justify;
  color: #4c235b;
  margin-bottom: 1.5rem;
}

.iconContainer {
  display: flex;
  margin-bottom: 2rem;
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
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #000000;
}

.icon {
  width: 1.8rem;
  height: 1.8rem;
  margin-right: 0.7rem;
}
</style>
