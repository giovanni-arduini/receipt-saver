<template>
  <div v-if="props.text">
    <h3>Analisi del testo</h3>
    <pre>{{ analyzedData }}</pre>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";

const props = defineProps({
  text: String,
});

const analyzedData = ref("Analisi in corso...");

watch(
  () => props.text,
  async (newText) => {
    console.log("Nuovo testo ricevuto:", newText);

    if (!newText) return;

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral",
          prompt: `Estrai da questo testo questi 5 dati, solo se presenti:
- Data del documento
- Tipo del documento
- Nome del medico o dell'azienda
- SOLO se  è una ricetta medica, codice della ricetta: sono i campi inclusi tra due asterischi
- Se è una fattura o uno scontrino fiscale: numero della fattura 
- Se è una fattura o uno scontrino fiscale: costo totale 

Testo:
${newText}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Risposta fetch:", data);

      analyzedData.value = data.response.trim();
    } catch (error) {
      console.error("Errore nella richiesta a Ollama:", error);
      analyzedData.value = "Errore durante l'analisi con Ollama.";
    }
  },
  { immediate: true }
);
</script>
