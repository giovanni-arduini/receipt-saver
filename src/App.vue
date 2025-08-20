<template>
  <div class="grid grid-cols-5 grid-rows-5 gap-0 min-h-screen">
    <SideTab :folder-list="folderList" @add-folder="handleAddFolder" />
    <OcrAndAnalysis @add-file="handleAddFile" />
    <MainList :files="filesList" />
    <SummaryGraph :files="filteredFiles" />
  </div>
</template>

<script setup>
// import { reactive } from "vue";
import { useFiles } from "./useFiles";
import SideTab from "@/components/SideTab.vue";
import OcrAndAnalysis from "@/components/OcrAndAnalysis.vue";
import MainList from "@/components/MainList.vue";
import SummaryGraph from "@/components/SummaryGraph.vue";

// Recuperiamo lista completa e filtrata dal composable
const { filesList, filteredFiles, addFile, folderList } = useFiles();

// Le cartelle restano in locale
// const folderList = reactive([
//   { name: "2024", id: 1, date: "2025-02-08", category: "Fatture" },
//   { name: "Febbraio", id: 2, date: "2025-03-08", category: "Fatture" },
//   { name: "Marzo", id: 3, date: "2025-06-08", category: "Fatture" },
// ]);

function handleAddFolder(name, date, category) {
  const newFolder = {
    name,
    id: folderList.length + 1,
    category,
    date,
  };
  folderList.push(newFolder);
}

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
