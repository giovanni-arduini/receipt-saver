<template>
  <TextConverter @text-extracted="handleTextExtracted" />
  <TextAnalyzer :text="extractedText" />

  <!-- <p v-if="text">
    <strong>Testo estratto in genitore: </strong>{{ extractedText }}
  </p> -->
</template>

<script setup>
import { ref, watch } from "vue";

const extractedText = ref("");

watch(extractedText, (val) => {
  console.log("extractedText cambiato a:", val);
});

function handleTextExtracted(text) {
  console.log("Evento ricevuto con testo:", text);
  extractedText.value = text;
}
</script>
