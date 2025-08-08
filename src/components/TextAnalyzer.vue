<template>
  <div v-if="props.text">
    <h3>Analisi del testo</h3>
    <pre>{{ analyzedData }}</pre>

    <h4>Oggetto estratto</h4>
    <pre>{{ analyzedObject }}</pre>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";

const props = defineProps({
  text: String,
});

const analyzedData = ref("Analisi in corso...");
const analyzedObject = ref({});

watch(
  () => props.text,
  async (newText) => {
    if (!newText) return;

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral",
          prompt: `Estrai dal testo fornito le seguenti informazioni, **solo se presenti**. Restituisci un oggetto JSON **valido** con **esattamente questa struttura**, usando **valori reali** dove possibile oppure stringhe vuote/nulli/zero dove non disponibili:

{
  "name": "Nome del prodotto/servizio/medicinale o voce principale del documento",
  "bougthFrom": "Nome del medico, azienda o farmacia",
  "id": numero intero univoco (può essere 0 se non disponibile),
  "date": "Data del documento in formato YYYY-MM-DD oppure stringa vuota",
  "category": "Ricetta | Scontrino | Fattura | Altro",
  "number": "Numero del documento, ricetta o fattura oppure stringa vuota",
  "payed": "Prezzo totale con simbolo € oppure stringa vuota"
}

Rispondi **solo** con l'oggetto JSON, senza spiegazioni, senza testo prima o dopo.

Testo da analizzare:
${newText}`,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.response.trim();

      analyzedData.value = responseText;

      // Estrazione oggetto JSON da stringa
      const jsonMatch = responseText.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          analyzedObject.value = parsed;
        } catch (jsonError) {
          console.warn("JSON trovato ma non valido:", jsonError);
          analyzedObject.value = { errore: "JSON trovato ma non valido" };
        }
      } else {
        analyzedObject.value = { errore: "Nessun JSON trovato nella risposta" };
      }
    } catch (error) {
      console.error("Errore nella richiesta a Ollama:", error);
      analyzedData.value = "Errore durante l'analisi con Ollama.";
    }
  },
  { immediate: true }
);
</script>
