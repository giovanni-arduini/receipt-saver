<template>
  <div>
    <h2>Salva la tua fattura!</h2>
    <p v-if="text"><strong>Il testo nell'immagine è: </strong>{{ text }}</p>
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
import { ref, defineEmits } from "vue";
import Tesseract from "tesseract.js";

const text = ref("");
const loading = ref(false);
const emit = defineEmits(["text-extracted"]);

const handleFileUpload = async (e) => {
  console.log("File caricato, gestisco l'evento change");
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async () => {
    loading.value = true;
    text.value = "";

    try {
      const result = await Tesseract.recognize(reader.result, "ita", {});

      text.value = result.data.text;
      console.log("Sto per emettere l'evento con testo:", result.data.text);
      emit("text-extracted", result.data.text);
    } catch (error) {
      console.error("Errore", error);
      text.value = "Errore durante l'OCR.";
    } finally {
      loading.value = false;
    }
  };

  reader.readAsDataURL(file);
};
</script>
