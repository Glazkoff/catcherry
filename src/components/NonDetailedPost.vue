<template>
  <div class="wrap">
    <div class="imageContainer" @click="onLink(post.id)">
      <img src="../assets/placeholder.png" v-bind:alt="post.body.header" />
    </div>
    <div class="infoContainer">
      <router-link
        tag="h2"
        :to="{ name: 'Posts', params: { id: post.id } }"
        class="heading"
        >{{ post.body.header }}</router-link
      >
      <small class="infoBody">
        {{ post.body.text }}
      </small>

      <small class="infoDate">
        {{ $d(post.createdAt, "number") }}
      </small>

      <div class="spaceForLikes"></div>

      <div class="iconContainer">
        <div class="iconAndNumber" v-on:click="onLike(post.id)">
          <div class="icon">
            <EmptyLike v-if="!isLikedByUser"></EmptyLike>
            <FilledLike v-else></FilledLike>
          </div>
          <p class="numOfIcon">{{ post.likesOfPost.length }}</p>
        </div>

        <div class="iconAndNumber" v-on:click="onLink(post.id)">
          <div class="icon">
            <Comment></Comment>
          </div>
          <p class="numOfIcon">3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyLike from "@/assets/empty_like.svg?inline";
import FilledLike from "@/assets/filled_like.svg?inline";
import Comment from "@/assets/comment.svg?inline";
export default {
  name: "NonDetailedPost",
  components: { EmptyLike, FilledLike, Comment },
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
  props: ["post"],
  data() {
    return {};
  },
  methods: {
    onLike(id) {
      this.$emit("like", { id: id, isLikedByUser: this.isLikedByUser });
    },
    onLink(id) {
      this.$router.push({ name: "Posts", params: { id: id } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";
@import "@/styles/_classes.scss";

.wrap {
  background: $violet;
  border-radius: 0.625rem;
  width: 100%;
  min-width: 35rem;
  min-height: 19rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 4fr 5fr;
}

.imageContainer img {
  width: 100%;
  border-top-left-radius: 0.625rem;
  border-bottom-left-radius: 0.625rem;
  height: 19rem;
  cursor: pointer;
}

.infoContainer {
  padding-top: 3rem;
  padding-right: 3rem;
  padding-bottom: 2.25rem;
  padding-left: 2.25rem;
  position: relative;
}

.heading {
  cursor: pointer;
  color: $white;
  margin-top: 0;
  margin-bottom: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.infoDate {
  color: $gray;
  display: inline-block;
  margin-bottom: 1rem;
}

.infoBody {
  width: 100%;
  margin-bottom: 1rem;
  color: $gray;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  max-height: 4.25rem;
}

.spaceForLikes {
  height: 20px;
}
.iconContainer {
  display: flex;
  position: absolute;
  bottom: 2.25rem;
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
