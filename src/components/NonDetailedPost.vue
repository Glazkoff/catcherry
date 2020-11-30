<template>
  <div class="container">
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
      <div class="iconContainer">
        <div class="iconAndNumber">
          <div class="icon" v-on:click="onLike(post.id)">
            <EmptyLike v-if="!isLikedByUser"></EmptyLike>
            <FilledLike v-else></FilledLike>
          </div>
          <p class="numOfIcon">{{ post.likesOfPost.length }}</p>
        </div>

        <div class="iconAndNumber">
          <div class="icon" v-on:click="onLink(post.id)">
            <Comment></Comment>
          </div>
          <p class="numOfIcon">3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyLike from "@/assets/empty_like.svg";
import FilledLike from "@/assets/filled_like.svg";
import Comment from "@/assets/comment.svg";
export default {
  name: "NonDetailedPost",
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

.container {
  background: $violet;
  border-radius: 0.625rem;
  width: 44rem;
  height: 19rem;
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
}

.infoDate {
  color: $gray_3;
}

.infoBody {
  width: 100%;
  color: $gray_3;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  max-height: 4.25rem;
}

.iconContainer {
  display: flex;
  position: absolute;
  bottom: 36px;
}

.iconAndNumber {
  display: flex;
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
  cursor: pointer;
  margin-left: 0;
  margin-right: 0.3rem;
}
</style>
