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

Restituisci **solo** un oggetto JSON valido con questa struttura (usa valori reali, senza spiegazioni):

{
  "dataDocumento": "string",
  "tipoDocumento": "string",
  "nomeMedicoOAzienda": "string",
  "codiceRicetta": "string (opzionale)",
  "numeroFattura": "string",
  "costoTotale": numero
}

Testo:
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
