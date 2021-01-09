<template>
  <div class="home">
    <p>{{ $t("startMsg") }} | {{ $t("projectTitle") }}</p>
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
