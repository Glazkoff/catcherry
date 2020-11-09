<template>
  <div class="container">
    <img src="../assets/placeholder.png" alt="placeholder" />
    <router-link :to="{ name: 'Posts', params: { id: post.id } }">{{
      post.header
    }}</router-link>
    <p>{{ post.date }}</p>
    <p>
      {{ post.body }}
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
    return {};
  },
  methods: {
    onLike(id) {
      this.$emit("like", { id: id });
    },
    onComment(id) {
      this.$emit("comment", { id: id });
    },
    onShare(id) {
      this.$emit("share", { id: id });
    }
  }
};
</script>

<style scoped>
.container {
  /* border: 1px solid #b1b1b1; */
  border-radius: 8px;
  margin: 5%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
}
.header {
}
.container img {
  box-shadow: 0;
  margin-right: 5%;
  float: left;
  max-width: 30%;
  height: auto;
  display: block;
}

h2 {
  color: purple;
}

p.postBody {
  height: 5em;
  overflow: hidden;
  padding: 5px;
  text-overflow: ellipsis;
}

span {
  padding: 5px;
}

button {
  margin: 0 1% 0 0;
}
</style>
