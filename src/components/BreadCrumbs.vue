<template>
  <div class="breadcrumbs">
    <p>
      <span v-for="(crumb, index) in crumbs" :key="index">
        <router-link :to="crumb.to" class="">{{ crumb.text }}</router-link
        ><span v-if="index !== crumbs.length - 1"> > </span>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
  computed: {
    crumbs() {
      let pathArray = this.$route.path.split("/");
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        if (this.$route.matched[idx] !== undefined) {
          let breadcrumbObj = {
            path: path,
            to:
              breadcrumbArray[idx - 1] &&
              !(breadcrumbArray[idx - 1].path === "")
                ? "/" + breadcrumbArray[idx - 1].path + "/" + path
                : "/" + path,
            text: this.$route.matched[idx].meta.breadCrumb || path
          };
          if (this.$route.matched[idx].name == "Post") {
            breadcrumbObj.text = this.$t("router.post") + " #" + path;
          }
          if (breadcrumbObj.text !== "") {
            breadcrumbArray.push(breadcrumbObj);
          }
        }
        return breadcrumbArray;
      }, []);
      return breadcrumbs;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/_colors.scss";

a {
  color: $blue;
}
</style>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </template>
