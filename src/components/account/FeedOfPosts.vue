<template>
  <div class="flexbox">
    <div class="doubleColumn">
      <h1>Лента новостей</h1>
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
    <list-of-notifications></list-of-notifications>
  </div>
</template>

<script>
import NonDetailedPost from "@/components/NonDetailedPost.vue";
import ListOfNotifications from "@/components/account/ListOfNotifications.vue";
import { POSTS_QUERY } from "@/graphql/queries";
// import { CREATE_LIKE_OF_POST } from "@/graphql/queries";
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
      console.log("Нажата кнопка лайка для поста с id " + object.id);
      // this.$apollo
      //   .mutate({
      //     mutation: CREATE_LIKE_OF_POST,
      //     variables: {
      //       userId: this.userId,
      //       postId: object.id
      //     },
      //     update: (cache, { data: { createLikeOfPost } }) => {
      //       let data = cache.readQuery({ query: POSTS_QUERY });
      //       // data.users.push(createLikeOfPost);
      //       cache.writeQuery({ query: POSTS_QUERY, data });
      //     },
      //     optimisticResponse: {
      //       __typename: "Mutation",
      //       createLikeOfPost: {
      //         __typename: "User",
      //         id: -1,
      //         name: username
      //       }
      //     }
      //   })
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => {
      //     this.newUser = username;
      //     console.error(error);
      //   });
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
  padding: 30px;
}
.doubleColumn {
  display: flex;
}
</style>
