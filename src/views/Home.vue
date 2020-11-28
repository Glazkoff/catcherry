<template>
  <div class="home">
    <p>
      <i18n path="startMsg">
        <span place="title">{{ $t("projectTitle") }}</span>
      </i18n>
    </p>
    <TestGraphql></TestGraphql>
  </div>
</template>

<script>
import TestGraphql from "@/components/TestGraphql.vue";
export default {
  name: "Home",
  components: {
    TestGraphql
  }
};
</script>
