<template>
  <BasicModal
    :open="showUpdateModal"
    :title="'Modifica file'"
    :fields="fileFields"
    :initialValues="file"
    :submitLabel="'Aggiorna'"
    @submit="handleUpdateFile"
    @close="showUpdateModal = false"
  />
  <div class="row-start-3 col-start-2 row-end-6 col-end-6 bg-green-200">
    <h1>{{ file.name }}</h1>
    <h2>{{ file.category }}</h2>
    <p>{{}}</p>
    <button @click="hideDetail">Back</button>
    <button @click="showUpdateModal = true">Modifica</button>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import BasicModal from "./BasicModal.vue";
import { useFiles } from "@/useFiles";

const props = defineProps({
  file: Object,
  hideDetail: Function,
});

const { updateFile } = useFiles();
const showUpdateModal = ref(false);

const fileFields = computed(() =>
  Object.keys(props.file || {})
    .filter(
      (key) => !["id", "folderId", "createdAt", "_id", "__v"].includes(key)
    )
    .map((key) => {
      let type = "text";
      if (key === "date") type = "date";
      if (key === "category") type = "select";
      return {
        name: key,
        label: splitCamelCase(key),
        type,
        options: key === "category" ? ["Fatture", "Ricette"] : undefined,
        placeholder: key,
      };
    })
);

function handleUpdateFile(updatedData) {
  const changedFields = {};
  for (const key in updatedData) {
    if (updatedData[key] !== props.file[key]) {
      changedFields[key] = updatedData[key];
    }
  }

  updateFile(props.file.id, updatedData);

  console.log("File aggiornato:", updatedData);
  showUpdateModal.value = false;
}

function splitCamelCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // separa camelCase
    .toLowerCase() // tutto minuscolo
    .replace(/^./, (s) => s.toUpperCase()); // solo prima maiuscola
}
</script>
