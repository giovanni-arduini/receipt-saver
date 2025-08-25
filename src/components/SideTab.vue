<template>
  <div class="row-start-1 col-start-1 row-end-6 col-end-2 px-10">
    <folder-creation-modal
      v-if="showFolderModal"
      @add-folder="saveNewFolder"
      @close-modal="closeModal"
    ></folder-creation-modal>
    <div class="mt-10">
      <div
        id="quick-add"
        class="mb-5 cursor-pointer bg-white p-2 rounded-lg hover:bg-blue-100 shadow-lg"
      >
        <button @click="toggleNewFolderModal">Nuova cartella</button>
      </div>

      <!-- ordinamento cartelle -->
      <div id="folder-list-container ">
        <form action="" class="mb-8">
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
      <div class="mb-8">
        <div v-if="folderList.length < 1"></div>
        <h1 v-else class="mb-4">Le mie cartelle</h1>
        <ul>
          <li v-for="folder in folderList" :key="folder.id">
            <div
              class="flex justify-between cursor-pointer hover:bg-gray-200 px-2 rounded-md w-full"
            >
              <div @click="showFolderContent(folder.id)">
                {{ folder.name }}
              </div>
              <button @click="handleDeleteFolder(folder.id)">
                <font-awesome-icon icon="trash-can" class="text-gray-500" />
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- etichette e sezioni -->
      <div class="flex flex-col w-full">
        <button
          class="hover:bg-gray-200 px-2 text-left rounded-md mb-2"
          @click="showFolderContent(`current`)"
        >
          Anno corrente
        </button>
        <button
          class="hover:bg-gray-200 px-2 text-left rounded-md mb-2"
          @click="showFolderContent(`special`)"
        >
          Speciali
        </button>
        <button
          class="hover:bg-gray-200 px-2 text-left rounded-md mb-2"
          @click="showFolderContent(null)"
        >
          Mostra tutte
        </button>
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

<style focused></style>
