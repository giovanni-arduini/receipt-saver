<template>
  <form @submit.prevent="createNewFolder">
    <input v-model="newFolderName" type="text" />
    <input v-model="newFolderDate" type="date" />
    <select v-model="newFolderCategory">
      <option value="Fatture">Fatture</option>
      <option value="Ricette">Ricette</option>
    </select>

    <button>Crea</button>
    <button>Chiudi</button>
  </form>
</template>

<script setup>
import { defineEmits, ref } from "vue";
const newFolderName = ref("");
const newFolderDate = ref(new Date());
console.log(newFolderDate);
const newFolderCategory = ref("Fatture");

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
}
</script>
