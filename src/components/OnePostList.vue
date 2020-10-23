<template>
  <div class="container">
    <img src="../assets/placeholder.png" alt="placeholder" />
    <h2>{{ post.header }}</h2>
    <p>{{ post.date }}</p>
    <p>
      {{ post.body}}
    </p>
    <button v-on:click="onLike(post.id)">Лайк</button>
    <button v-on:click="onComment(post.id)">Коммент</button>
    <button v-on:click="onShare(post.id)">Репост</button>
  </div>
</template>

<script>
export default {
  name: "OnePostList",
  props: ["post"],
  data() {
    return {
      };
  },
  methods: {
    onLike(id) {
      this.$emit("like", {id: id});
    },
    onComment(id) {
      this.$emit("comment", {id: id});
    },
    onShare(id) {
      this.$emit("share", {id: id});
    },
  },
};
</script>

<style scoped>
.container {
  border: 1px solid #b1b1b1;
  margin-bottom: 4rem;
  width: 58rem;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.container img {
  margin-right: 5%;
  float: left;
  max-width: 30%;
  height: auto;
  display: block;
}

button {
  margin: 0 1% 0 0;
}
</style>
