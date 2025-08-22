<template>
  <div class="row-start-3 col-start-2 row-end-6 col-end-6 bg-green-200">
    <h1>{{ file.name }}</h1>
    <h2>{{ file.category }}</h2>
    <p>{{}}</p>
    <button @click="hideDetail">Back</button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  file: Object,
  hideDetail: Function,
});
</script>
