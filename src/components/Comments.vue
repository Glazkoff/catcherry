<template>
  <div class="postComments container">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="toAddComment()">
          <div class="form-group">
            <textarea
              type="text"
              class="form-control col-12 dark"
              :placeholder="$t('addCommentMsg')"
              v-model.trim="$v.newComment.body.$model"
              @blur="$v.newComment.body.$touch()"
              :class="{ is_invalid: $v.newComment.body.$error }"
            ></textarea>
            <div v-if="$v.newComment.body.$error" class="error">
              <span v-if="!$v.newComment.body.required" class="form-text red">{{
                $t("required")
              }}</span>
            </div>
          </div>

          <button
            class="btn btn-primary col-4"
            :disabled="$v.newComment.body.$invalid"
          >
            {{ $t("addMsg") }}
          </button>
        </form>
      </div>
    </div>

    <div class="row">
      <div class="col-12" v-if="!this.isEmpty">
        <div v-for="comment in comments" :key="comment.id">
          <div class="col-10">
            <h3 class="red">{{ comment.author.name }}</h3>
            <p>{{ comment.createdAt }}</p>
            <!-- <p>{{ $d(comment.createdAt, "number") }}</p> -->
            <p>{{ comment.body }}</p>
          </div>
          <div class="col-2">
            <button
              v-if="comment.authorId == $store.getters.decodedToken.id"
              class="btn btn-link"
              @click="toDeleteComment(comment.id)"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
      <div v-else class="col-12">
        <h3>Комментариев нет :(</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
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
  computed: {
    isEmpty() {
      if (this.comments == undefined) {
        return true;
      } else {
        if (this.comments.length == 0) {
          return true;
        } else return false;
      }
    }
  },
  props: ["DetailedPost"],
  data() {
    return {
      newComment: {
        body: "",
        authorId: this.$store.getters.decodedToken.id,
        author: {
          name: this.$store.getters.decodedToken.name
        },
        postId: +this.$route.params.id
      }
    };
  },
  validations: {
    newComment: {
      body: {
        required
      }
    }
  },
  methods: {
    toAddComment() {
      let bodyComment = this.newComment.body;
      let authorIdComment = this.$store.getters.decodedToken.id;
      let postIdComment = +this.$route.params.id;
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
              variables: { postId: +this.$route.params.id }
            });
            data.comments.push(this.newComment);
            cache.writeQuery({
              query: COMMENTS_QUERY,
              variables: {
                postId: +this.$route.params.id
              },
              data
            });
            console.log(createComment);
          }
        })
        .then(data => {
          this.newComment = {
            body: "",
            authorId: this.$store.getters.decodedToken.id,
            author: {
              name: this.$store.getters.decodedToken.name
            },
            postId: +this.$route.params.id
          };
          console.log(data);
        })
        .catch(error => {
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

<style lang="scss" scoped>
@import "@/styles/_classes.scss";
@import "@/styles/_colors.scss";
@import "@/styles/_dimensions.scss";
@import "@/styles/_grid.scss";
textarea {
  resize: none;
  height: 5rem;
}
</style>
