<template>
  <div class="side-tab">
    <div id="quick-add">
      <button @click="addFolder">Crea cartella</button>
    </div>
    <div v-if="showFolderModal">
      <form @submit.prevent="saveNewFolder">
        <input v-model="newFolderName" type="text" />
        <button>invia</button>
      </form>
    </div>
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
    <div>
      <ul>
        <li v-for="folder in folderList" :key="folder.id">{{ folder.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

const showFolderModal = ref(false);
const newFolderName = ref("");

defineProps({
  folderList: {
    type: Array,
    required: true,
  },
});

defineEmits(["add-folder"]);

function addFolder() {
  showFolderModal.value = !showFolderModal.value;
  console.log(showFolderModal);
}

function saveNewFolder() {
  console.log("ciao mamma");
}
</script>

<style scoped>
.side-tab {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  min-width: 15%;
  background-color: rgb(249, 241, 241);
}
</style>
