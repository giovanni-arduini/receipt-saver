<template>
  <div class="side-tab">
    <div id="quick-add">
      <button>Crea cartella</button>
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
import { defineProps } from "vue";

defineProps({
  folderList: {
    type: Array,
    required: true,
  },
});
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
