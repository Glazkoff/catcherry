<template>
<div>
  <h1>Команда {{team.name}}</h1>
  <NavBar />
</div>
</template>

<script>
import NavBar from "@/components/Manager/NavBar";
export default {
  props: ['team'],
  components: {
    NavBar
  }

}
</script>

<style lang="scss" scoped>
</style>
