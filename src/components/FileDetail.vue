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
    <h1>{{ fileDetail.name }}</h1>
    <h2>{{ fileDetail.category }}</h2>
    <p>{{}}</p>
    <button @click="hideDetail">Back</button>
    <button @click="showUpdateModal = true">Modifica</button>
  </div>
</template>

<script setup>
import { defineProps, computed, ref, reactive } from "vue";
import BasicModal from "./BasicModal.vue";
import { useFiles } from "@/useFiles";

const props = defineProps({
  file: Object,
  hideDetail: Function,
});

const fileDetail = reactive({
  ...props.file,
});

const { updateFile } = useFiles();
const showUpdateModal = ref(false);

const fileFields = computed(() =>
  Object.keys(props.file || {})
    .filter(
      (key) =>
        !["id", "folderId", "createdAt", "_id", "__v", "special"].includes(key)
    )
    .map((key) => {
      let type = "text";
      if (key === "date") type = "date";
      if (key === "category") type = "select";
      if (key === "special") type = "boolean";
      return {
        name: key,
        label: splitCamelCase(key),
        type,
        options: key === "category" ? ["Fattura", "Ricetta"] : undefined,
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

  Object.assign(fileDetail, updatedData);
  updateFile(props.file.id, updatedData);

  showUpdateModal.value = false;
}

function splitCamelCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/^./, (s) => s.toUpperCase());
}
</script>
