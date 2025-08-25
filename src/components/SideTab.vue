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
          <li v-for="folder in folderList" :key="folder.id">
            <div class="flex justify-between">
              <div @click="showFolderContent(folder.id)">
                {{ folder.name }}
              </div>
              <button @click="handleDeleteFolder(folder.id)">Elimina</button>
            </div>
          </li>
        </ul>
      </div>

      <!-- etichette e sezioni -->
      <div class="flex flex-col items-start">
        <button @click="showFolderContent(`current`)">Anno corrente</button>
        <button @click="showFolderContent(`special`)">Speciali</button>
        <button @click="showFolderContent(null)">Mostra tutte</button>
        <!-- <button @click="showDeleted">Cestino</button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import FolderCreationModal from "./FolderCreationModal.vue";

import { useFolders } from "@/useFolders";
import { useFiles } from "@/useFiles";

const { setFilter, state } = useFiles();
const { folderList, deleteFolder } = useFolders();

function showFolderContent(folderIdOrTag) {
  state.showDetail = false;
  console.log(state.showDetail);
  setFilter(folderIdOrTag);
}

const showFolderModal = ref(false);

function handleDeleteFolder(id) {
  deleteFolder(id);
}

function toggleNewFolderModal() {
  showFolderModal.value = !showFolderModal.value;
}

function closeModal() {
  showFolderModal.value = false;
}
</script>
