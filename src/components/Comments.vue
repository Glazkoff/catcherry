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
      <button v-if="comment.authorId==$store.getters.decodedToken.id" @click="toDeleteComment(comment.id)">Удалить</button>
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
      let postIdComment = Number(this.$route.params.id);
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
          console.log(this.$store.getters.decodedToken.id);
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
