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
      <p>{{ comment.body}}</p>
      <button @click="toDeleteComment(comment.id)">Удалить</button>
    </div>
  </div>
</template>

<script>
import {
  CREATE_COMMENT_QUERY,
  COMMENTS_QUERY,
  UPDATE_COMMENT_QUERY,
  DELETE_COMMENT_QUERY
} from "@/graphql/queries";
export default {
  name: "Comments",
  apollo: {
    comments: {
      query: COMMENTS_QUERY
    }
  },
  props: ['DetailedPost'],
  data() {
    return {
      newComment: "",
      editComment: {
        isEdit: false,
        body: "",
        authorId: "",
        postId: "",
        id: -1
      }
    };
  },
  methods: {
    toSaveEditComment() {
      this.editComment.isEdit = false;
      this.$apollo
        .mutate({
          mutation: UPDATE_COMMENT_QUERY,
          variables: {
            body: this.editComment.body,
            authorId: this.editComment.authorId,
            postId: this.editComment.postId,
            id: this.editComment.id
          },
          update: (cache, { data: { updateComment } }) => {
            let data = cache.readQuery({ query: COMMENTS_QUERY });
            console.log(data);
            data.comments.find(
              el => el.id === this.editComment.id
            ).body = this.editComment.body;
            cache.writeQuery({ query: COMMENTS_QUERY, data });
            console.log(updateComment);
          },
          optimisticResponse: {
            __typename: "Mutation",
            createComment: {
              __typename: "Comment",
              id: -1,
              name: this.editComment.name
            }
          }
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    toEditComment(id) {
      let editComment = this.comments.find(el => el.id === id);
      this.editComment.body = editComment.body;
      this.editComment.authorId = editComment.authorId;
      this.editComment.postId = editComment.postId;
      this.editComment.id = editComment.id;
      this.editComment.isEdit = true;
    },
    toAddComment() {
      let bodyComment = this.newComment;
      let authorIdComment = this.$store.getters.decodedToken.id;
      let postIdComment = this.$route.params.id;
      this.newComment = "";
      this.$apollo
        .mutate({
          mutation: CREATE_COMMENT_QUERY,
          variables: {
            body: bodyComment,
            authorId: authorIdComment,
            postId: postIdComment
          },
          update: (cache, { data: { createComment } }) => {
            let data = cache.readQuery({ query: COMMENTS_QUERY });
            data.comments.push(createComment);
            cache.writeQuery({ query: COMMENTS_QUERY, data });
          },
          optimisticResponse: {
            __typename: "Mutation",
            createComment: {
              __typename: "Comment",
              id: -1,
              body: bodyComment,
              authorId: authorIdComment,
              postId: postIdComment
            }
          }
        })
        .then(data => {
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
            let data = cache.readQuery({ query: COMMENTS_QUERY });
            let index = data.comments.findIndex(el => el.id == id);
            data.comments.splice(index, 1);
            cache.writeQuery({ query: COMMENTS_QUERY, data });
          }
        })
        .then(data => {
          console.log(data);
          console.log(this.$route.params.id);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
.postComments {
  margin: 0 5% 0 5%;
}

h1 {
  text-align: center;
}

textarea {
  width: 100%;
}

button {
  margin: 0 1% 3% 0;
}

input[type="submit"] {
  display: block;
  margin: 0 0 0 auto;
}
</style>
