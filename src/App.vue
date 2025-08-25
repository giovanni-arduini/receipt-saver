<template>
  <div class="grid grid-cols-5 gap-0 min-h-screen bg-gray-100">
    <SideTab :folder-list="folderList" />
    <OcrAndAnalysis @add-file="handleAddFile" />
    <MainList :files="filesList" />
  </div>
</template>

<script setup>
import { useFiles } from "./useFiles";
import SideTab from "@/components/SideTab.vue";
import OcrAndAnalysis from "@/components/OcrAndAnalysis.vue";
import MainList from "@/components/MainList.vue";

const { filesList, addFile, folderList } = useFiles();

function handleAddFile(obj) {
  addFile(obj); // aggiorna anche backend
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
