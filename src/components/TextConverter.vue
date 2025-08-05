<template>
  <div>
    <h2>OCR Result</h2>
    <p v-if="text">{{ text }}</p>
    <p v-else-if="loading">Caricamento in corso...</p>
    <p v-else>Carica un file per iniziare</p>
  </div>

  <div>
    <label for="uploaded"> Upload a JPG, PDF or PNG file: </label>
    <input
      id="uploaded"
      type="file"
      accept="image/png, image/jpeg"
      @change="handleFileUpload"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Tesseract from "tesseract.js";

const text = ref("");
const loading = ref(false);

const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async () => {
    loading.value = true;
    text.value = "";

    try {
      const result = await Tesseract.recognize(reader.result, "ita", {
        logger: (message) => console.log("[OCR progress]", message),
      });

      text.value = result.data.text;
    } catch (error) {
      console.error("Errore durante l'OCR:", error);
      text.value = "Errore durante l'OCR.";
    } finally {
      loading.value = false;
    }
  };

  reader.readAsDataURL(file);
};
</script>
