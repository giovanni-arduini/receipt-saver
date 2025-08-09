<template>
  <div class="row-start-1 col-start-2 row-end-3 col-end-6 bg-blue-200">
    <TextConverter @text-extracted="handleTextExtracted" />
    <TextAnalyzer :text="extractedText" />

    <!-- <p v-if="text">
      <strong>Testo estratto in genitore: </strong>{{ extractedText }}
    </p> -->
  </div>
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
