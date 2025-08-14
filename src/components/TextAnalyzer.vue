<template>
  <div v-if="props.text">
    <h3>Analisi del testo</h3>
    <pre>{{ analyzedData }}</pre>

    <h4>Oggetto estratto</h4>
    <pre>{{ analyzedObject }}</pre>

    <button v-if="analyzedObject" @click="confirmAddFile">Aggiungi file</button>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";
import { useFiles } from "../useFiles";

const { addNewFile } = useFiles();

const props = defineProps({ text: String });
const analyzedData = ref("Analisi in corso...");
const analyzedObject = ref(null);

function confirmAddFile() {
  if (analyzedObject.value) {
    addNewFile(analyzedObject.value);
    alert("File aggiunto!");
  }
}

// Funzione di parsing
function extractJsonFromResponse(responseText) {
  const jsonStart = responseText.indexOf("{");
  const jsonEnd = responseText.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1) {
    try {
      return JSON.parse(responseText.substring(jsonStart, jsonEnd + 1));
    } catch (error) {
      console.warn("Errore parsing JSON:", error);
    }
  }
  return null;
}

function normalizeParsedObject(obj) {
  if (!obj) return null;
  return {
    ...obj,
    id: Number(obj.id),
    payed: parseFloat(obj.payed.replace(",", ".")),
    special: obj.special === true || obj.special === "true" ? true : false,
    folderId: Number(obj.folderId),
  };
}

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
          prompt: `Estrai dal testo fornito le seguenti informazioni, solo se presenti. 
Restituisci un oggetto JSON **valido** con **esattamente questa struttura**, usando valori reali dove possibile oppure stringhe vuote/nulli/zero dove non disponibili:

{
  "name": "Nome del prodotto/servizio/medicinale o voce principale del documento",
  "bougthFrom": "Nome del medico, azienda o farmacia",
  "date": "Data del documento sempre in formato YYYY-MM-DD oppure stringa vuota",
  "category": "Una delle seguenti opzioni esatte: Ricetta | Scontrino | Fattura | Altro",
  "number": "Solo numeri del documento/ricetta/fattura come stringa. Non includere parole o prefissi",
  "payed": "Prezzo totale espresso in numero, oppure stringa vuota",
  "special": boolean false di default
}

**Regole aggiuntive**:
1. La data deve essere sempre in formato YYYY-MM-DD. Se non è presente o non chiara, usare stringa vuota.
2. La categoria deve essere **esattamente** una delle quattro opzioni: Ricetta, Scontrino, Fattura, Altro. Se è un Documento commerciale, usare l'opzione Scontrino.
3. Il campo "number" deve contenere **solo cifre**, senza parole o prefissi come "Documento numero".
4. Non aggiungere nulla oltre all'oggetto JSON. Nessuna spiegazione o testo extra.

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
          const parsed = extractJsonFromResponse(responseText);
          analyzedObject.value = normalizeParsedObject(parsed);
          console.log(analyzedObject.value);
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
