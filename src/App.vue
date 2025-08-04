<template>
  <text-converter></text-converter>
</template>

<script>
import TextConverter from "./components/TextConverter.vue";

export default {
  name: "App",
  components: {
    TextConverter,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
