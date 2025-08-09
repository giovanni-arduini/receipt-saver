<template>
  <dialog ref="dialogRef" open>
    <form method="dialog" @submit.prevent="createNewFolder">
      <input v-model="newFolderName" type="text" placeholder="Nome cartella" />
      <input v-model="newFolderDate" type="date" />
      <select v-model="newFolderCategory">
        <option value="Fatture">Fatture</option>
        <option value="Ricette">Ricette</option>
      </select>
      <button type="submit">Crea</button>
      <button type="button" @click="closeModal">Chiudi</button>
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
