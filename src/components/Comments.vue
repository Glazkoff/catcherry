<template>
  <div class="postComments">
    <textarea
      type="text"
      placeholder="Введите текст комментария"
      v-model="newComment"
    />
    <button @click="toAddComment()">Добавить</button>
    <div v-for="comment in comments" :key="comment.id">
      <p>{{ comment.author.name }}</p>
      <p>{{ comment.createdAt }}</p>
      <!-- <p>{{ $d(comment.createdAt, "number") }}</p> -->
      <p>{{ comment.body }}</p>
      <button
        v-if="comment.authorId == $store.getters.decodedToken.id"
        @click="toDeleteComment(comment.id)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script>
import {
  CREATE_COMMENT_QUERY,
  DELETE_COMMENT_QUERY,
  COMMENTS_QUERY
} from "@/graphql/queries";
export default {
  name: "Comments",
  apollo: {
    comments: {
      query: COMMENTS_QUERY,
      variables() {
        return {
          postId: Number(this.$route.params.id)
        };
      }
    }
  },
  props: ["DetailedPost"],
  data() {
    return {
      newComment: ""
    };
  },
  methods: {
    toAddComment() {
      let bodyComment = this.newComment;
      let authorIdComment = this.$store.getters.decodedToken.id;
      let postIdComment = Number(this.$route.params.id);
      this.$apollo
        .mutate({
          mutation: CREATE_COMMENT_QUERY,
          variables: {
            body: bodyComment,
            authorId: authorIdComment,
            postId: postIdComment
          },
          update: (cache, { data: { createComment } }) => {
            let data = cache.readQuery({
              query: COMMENTS_QUERY,
              variables: { postId: Number(this.$route.params.id) }
            });
            data.comments.push(createComment);
            cache.writeQuery({
              query: COMMENTS_QUERY,
              variables: { postId: Number(this.$route.params.id) },
              data
            });
          }
        })
        .then(data => {
          this.newComment = "";
          console.log(data);
        })
        .catch(error => {
          // this.newComment = body;
          console.error(error);
        });
    },
    toDeleteComment(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_COMMENT_QUERY,
          variables: {
            id
          },
          update: cache => {
            let data = cache.readQuery({
              query: COMMENTS_QUERY,
              variables: { postId: Number(this.$route.params.id) }
            });
            let index = data.comments.findIndex(el => el.id == id);
            data.comments.splice(index, 1);
            cache.writeQuery({
              query: COMMENTS_QUERY,
              variables: { postId: Number(this.$route.params.id) },
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
  }
};
</script>

<style scoped>
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
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 2rem;
  color: #613490;
}

.authorOfComment {
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.5rem;
  margin-bottom: 0;
  color: #4c235b;
}
.bodyOfComment {
  margin-top: 0.6rem;
}
.oneComment {
  margin-bottom: 1.5px;
}
</style>
