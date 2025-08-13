<template>
  <div class="row-start-1 col-start-1 row-end-6 col-end-2 bg-red-200 px-20">
    <folder-creation-modal
      v-if="showFolderModal"
      @add-folder="saveNewFolder"
      @close-modal="closeModal"
    ></folder-creation-modal>
    <div class="mt-6">
      <div id="quick-add" class="mb-5">
        <button @click="toggleNewFolderModal">Crea cartella</button>
      </div>

      <!-- ordinamento cartelle -->
      <div id="folder-list-container ">
        <form action="" class="mb-4">
          <div>
            <label for="">Ordina per </label>
            <select name="" id="">
              <option value="date">data</option>
              <option value="type">tipologia</option>
              <option value="date">nome</option>
            </select>
          </div>
        </form>
      </div>

      <!-- lista delle cartelle -->
      <div class="mb-4">
        <ul>
          <li v-for="folder in state.folderList" :key="folder.id">
            <div class="flex justify-between">
              <div @click="showFilesInFolder(folder.id)">
                {{ folder.name }}
              </div>
              <button @click="handleDeleteFolder(folder.id)">Elimina</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- etichette e sezioni -->
      <div class="flex flex-col items-start">
        <button @click="showCurrentYear">Anno corrente</button>
        <button @click="showSpecial">Speciali</button>
        <button @click="showAll">Mostra tutte</button>
        <!-- <button @click="showDeleted">Cestino</button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import FolderCreationModal from "./FolderCreationModal.vue";

import { useFiles } from "@/useFiles";
const { setFilter, deleteFolder, state } = useFiles();

function showSpecial() {
  setFilter("special");
}

function showAll() {
  setFilter(null);
}

function showFilesInFolder(n) {
  setFilter(n);
}

function showCurrentYear() {
  setFilter("current");
}

const showFolderModal = ref(false);

defineProps({
  folderList: {
    type: Array,
    required: true,
  },
});

function handleDeleteFolder(id) {
  console.log("ciao mamma!");
  deleteFolder(id);
}

const emit = defineEmits(["add-folder"]);

function toggleNewFolderModal() {
  showFolderModal.value = !showFolderModal.value;
}

function saveNewFolder(name, date, category) {
  emit("add-folder", name, date, category);
  showFolderModal.value = false;
}

function closeModal() {
  showFolderModal.value = false;
}
</script>
