<template>
  <div>
    <h2>OCR Result</h2>
    <p v-if="text">{{ text }}</p>
    <p v-else>Caricamento in corso...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Tesseract from "tesseract.js";

const text = ref("");

onMounted(async () => {
  const result = await Tesseract.recognize(
    "./book-cover.jpg",
    "ita", // Lingua italiana
    {
      logger: (m) => console.log(m),
    }
  );

  text.value = result.data.text;
});
</script>
