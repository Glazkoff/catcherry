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
            <svg
              v-if="!isLikedByUser"
              width="18"
              height="18"
              viewBox="0 1 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.9999 1.8291C8.0919 0.994182 6.90341 0.530801 5.6699 0.530762C5.01702 0.531441 4.37071 0.661228 3.76818 0.912652C3.16565 1.16408 2.61879 1.53217 2.15907 1.99576C0.198236 3.96493 0.199069 7.04493 2.16074 9.00576L8.27074 15.1158C8.4124 15.3649 8.68574 15.5258 8.9999 15.5258C9.1289 15.5245 9.25581 15.493 9.37043 15.4338C9.48505 15.3746 9.5842 15.2894 9.6599 15.1849L15.8391 9.00576C17.8007 7.0441 17.8007 3.96493 15.8374 1.99243C15.3779 1.52969 14.8315 1.16234 14.2295 0.911498C13.6276 0.660653 12.982 0.531261 12.3299 0.530762C11.0964 0.530963 9.90799 0.994322 8.9999 1.8291ZM14.6591 3.17076C15.9616 4.47993 15.9624 6.52493 14.6607 7.82743L8.9999 13.4883L3.33907 7.82743C2.0374 6.52493 2.03824 4.47993 3.3374 3.1741C3.97074 2.5441 4.79907 2.19743 5.6699 2.19743C6.54074 2.19743 7.36574 2.5441 7.99407 3.17243L8.41074 3.5891C8.48806 3.66655 8.5799 3.728 8.68099 3.76992C8.78209 3.81185 8.89046 3.83343 8.9999 3.83343C9.10935 3.83343 9.21772 3.81185 9.31881 3.76992C9.41991 3.728 9.51175 3.66655 9.58907 3.5891L10.0057 3.17243C11.2657 1.91493 13.4007 1.91826 14.6591 3.17076Z"
                fill="white"
              />
            </svg>

            <svg
              v-else
              width="18"
              height="18"
              viewBox="1 2 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.8375 3.9925C16.378 3.52976 15.8316 3.16241 15.2296 2.91157C14.6277 2.66072 13.9821 2.53133 13.33 2.53083C12.0965 2.53103 10.9081 2.99439 9.99999 3.82917C9.09199 2.99425 7.9035 2.53087 6.66999 2.53083C6.01711 2.53151 5.37081 2.6613 4.76827 2.91272C4.16574 3.16415 3.61888 3.53225 3.15916 3.99583C1.19833 5.965 1.19916 9.045 3.16083 11.0058L9.99999 17.845L16.8392 11.0058C18.8008 9.045 18.8017 5.965 16.8375 3.9925V3.9925Z"
                fill="white"
              />
            </svg>
          </div>
          <p class="numOfIcon">{{ post.likesOfPost.length }}</p>
        </div>

        <div class="iconAndNumber">
          <div class="icon" v-on:click="onLink(post.id)">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6665 0.666504H2.33317C1.414 0.666504 0.666504 1.414 0.666504 2.33317V17.3332L5.11067 13.9998H15.6665C16.5857 13.9998 17.3332 13.2523 17.3332 12.3332V2.33317C17.3332 1.414 16.5857 0.666504 15.6665 0.666504ZM15.6665 12.3332H4.55567L2.33317 13.9998V2.33317H15.6665V12.3332Z"
                fill="white"
              />
            </svg>
          </div>
          <p class="numOfIcon">3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
