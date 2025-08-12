<template>
  <div class="row-start-1 col-start-1 row-end-6 col-end-2 bg-red-200">
    <folder-creation-modal
      v-if="showFolderModal"
      @add-folder="saveNewFolder"
      @close-modal="closeModal"
    ></folder-creation-modal>
    <div class="side-tab">
      <div id="quick-add">
        <button @click="toggleNewFolderModal">Crea cartella</button>
      </div>

      <!-- ordinamento cartelle -->
      <div id="folder-list-container">
        <form action="">
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
      <div>
        <ul>
          <li v-for="folder in folderList" :key="folder.id">
            {{ folder.name }}
          </li>
        </ul>
      </div>

      <!-- etichette e sezioni -->
      <div class="flex flex-col">
        <button>Homepage</button>
        <button>Recenti</button>
        <button>Speciali</button>
        <button>Cestino</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
import FolderCreationModal from "./FolderCreationModal.vue";

const showFolderModal = ref(false);

defineProps({
  folderList: {
    type: Array,
    required: true,
  },
});

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
