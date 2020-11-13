<template>
  <div class="container">
    <div class="imageContainer">
      <img src="../assets/placeholder.png" v-bind:alt="post.body.header" />
    </div>
    <div class="infoContainer">
      <router-link
        tag="p"
        :to="{ name: 'Posts', params: { id: post.id } }"
        class="heading"
        >{{ post.body.header }}</router-link
      >
      <p class="infoDate">{{ post.createdAt }}</p>
      <p class="infoBody">
        {{ post.body.text }}
      </p>

      <div class="iconContainer">
        <div class="iconAndNumber">
          <div class="icon" v-on:click="onLike(post.id)">
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
                fill="#C4C4C4"
                d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
              ></path>
            </svg>
          </div>
          <span class="numOfIcon">21</span>
        </div>

        <div class="iconAndNumber">
          <div class="icon" v-on:click="onComment(post.id)">
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

        <div class="iconAndNumber">
          <div class="icon" v-on:click="onShare(post.id)">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="share"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="svg-inline--fa fa-share fa-w-16 fa-3x"
            >
              <path
                fill="#C4C4C4"
                d="M503.691 189.836L327.687 37.851C312.281 24.546 288 35.347 288 56.015v80.053C127.371 137.907 0 170.1 0 322.326c0 61.441 39.581 122.309 83.333 154.132 13.653 9.931 33.111-2.533 28.077-18.631C66.066 312.814 132.917 274.316 288 272.085V360c0 20.7 24.3 31.453 39.687 18.164l176.004-152c11.071-9.562 11.086-26.753 0-36.328z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NonDetailedPost",
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
  width: 56rem;
  height: 17rem;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
    0px 20px 32px rgba(96, 97, 112, 0.24);
  border-radius: 0.5rem;
  margin-bottom: 4rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 3fr;
}

.imageContainer img {
  width: auto;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  height: 17rem;
}

.infoContainer {
  padding: 2rem 3.5rem;
  position: relative;
}

.heading {
  cursor: pointer;
  margin-top: 0;
  margin-bottom: 0.7rem;
  font-weight: bold;
  font-size: 1.15rem;
  line-height: 1.4rem;
  color: #613490;
}

.infoDate,
.infoBody {
  font-size: 0.8rem;
  line-height: 1rem;
  color: #4c235b;
}

.infoBody {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  line-height: 1.2rem;
  max-height: 5rem;
}

.iconContainer {
  display: flex;
  position: absolute;
  bottom: 32px;
}

.iconAndNumber {
  display: flex;
  margin-right: 2rem;
  align-items: center;
}

.numOfIcon {
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #000000;
}

.icon {
  width: 1.8rem;
  height: 1.8rem;
  cursor: pointer;
  margin-right: 0.7rem;
}
</style>
