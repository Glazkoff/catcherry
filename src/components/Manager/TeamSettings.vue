<template>
  <div>
    <h1>Команда {{ name }}</h1>
    <div class="every">
      <NavBar class="navig" />
      <router-view class="cont" />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/Manager/NavBar";
export default {
  components: {
    NavBar
  },
  data() {
    return {
      name: this.$route.params.name
    };
  }
};
</script>

<style lang="scss" scoped>
.every {
  display: flex;
}

.navig {
  width: 25%;
}

.cont {
  width: 50%;
}
</style>
