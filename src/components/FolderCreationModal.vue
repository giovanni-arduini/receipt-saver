<template>
  <dialog
    ref="dialogRef"
    open
    class="z-1 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center absolute"
  >
    <form
      method="dialog"
      @submit.prevent="createNewFolder"
      class="bg-white flex flex-col p-10 rounded-md"
    >
      <button class="relative" type="button" @click="closeModal">X</button>
      <h2 class="mb-4">Crea una nuova cartella</h2>
      <div class="flex flex-col items-start mb-3">
        <label for="">Nome cartella</label>
        <input
          class="border rounded-md px-2"
          v-model="newFolderName"
          type="text"
          placeholder="Nome cartella"
        />
      </div>
      <div class="flex flex-col items-start mb-3">
        <label for="">Data di riferimento</label>
        <input v-model="newFolderDate" type="date" />
      </div>
      <div class="flex flex-col items-start mb-3">
        <label for="">Tipologia</label>
        <select v-model="newFolderCategory">
          <option value="Fatture">Fatture</option>
          <option value="Ricette">Ricette</option>
        </select>
      </div>

      <button class="" type="submit">Crea</button>
    </form>
  </dialog>
</template>

<script setup>
import { defineEmits, ref } from "vue";
import { useFiles } from "@/useFiles";
import axios from "axios";

const { loadFolders } = useFiles();

const newFolderName = ref("");
const newFolderDate = ref("");
const newFolderCategory = ref("Fatture");
const dialogRef = ref(null);

const emit = defineEmits(["add-folder", "close-modal"]);

async function createNewFolder() {
  if (newFolderName.value.trim() === "") {
    alert("Inserire un nome ");
    return;
  }
  try {
    await axios.post("http://localhost:5001/api/folders", {
      name: newFolderName.value,
      date: new Date(newFolderDate.value),
      category: newFolderCategory.value,
    });
    emit("close-modal");
    await loadFolders();

    // Puoi emettere i dati ricevuti dal backend (res.data) oppure solo chiudere il modal
    // emit("add-folder", res.data);
    // newFolderName.value = "";
  } catch (err) {
    alert("Errore creazione cartella");
    console.error(err);
  }
}

function closeModal() {
  emit("close-modal");
}
</script>
