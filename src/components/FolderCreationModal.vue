<template>
  <dialog
    ref="dialogRef"
    open
    class="z-1 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center"
  >
    <form
      method="dialog"
      @submit.prevent="createNewFolder"
      class="bg-white flex flex-col p-10 rounded-md"
    >
      <button type="button" @click="closeModal">X</button>
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
const newFolderName = ref("");
const newFolderDate = ref(new Date());
console.log(newFolderDate);
const newFolderCategory = ref("Fatture");
const dialogRef = ref(null);

const emit = defineEmits(["add-folder", "close-modal"]);

function createNewFolder() {
  if (newFolderName.value.trim() === "") {
    alert("Inserire un nome ");
    return;
  }
  emit(
    "add-folder",
    newFolderName.value,
    newFolderDate.value,
    newFolderCategory.value
  );
  newFolderName.value = "";
  emit("close-modal");
}

function closeModal() {
  emit("close-modal");
}
</script>
