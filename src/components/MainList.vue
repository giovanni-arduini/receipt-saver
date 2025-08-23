<template>
  <div
    v-if="showDetail"
    class="row-start-3 col-start-2 row-end-6 col-end-6 bg-green-200"
  >
    <ModificationsModal :fields="fileDetails" />
    <FileDetail :file="fileDetails" :hide-detail="hideDetail" />

    <!-- <h1>{{ fileDetails.name }}</h1>
    <p>{{ fileDetails.id }}</p>
    <button @click="hideDetail">Back</button> -->
  </div>

  <div v-else class="row-start-3 col-start-2 row-end-6 col-end-6 bg-green-200">
    <div>
      <h2 class="mt-4">{{ activeSectionName }}</h2>
    </div>
    <div
      class="flex items-start justify-center text-center row-start-3 col-start-2 row-end-6 col-end-6 bg-green-200"
    >
      <table
        v-if="filteredFiles.length > 0"
        class="m-3 w-4/5 table-auto border-separate border-spacing-2 border-gray-400 dark:border-gray-500"
      >
        <tr class="bg-gray-200">
          <th>Nome</th>
          <th>Data</th>
          <th>Categoria</th>
          <th>Pagati</th>
          <th>Cartella</th>
          <th></th>
        </tr>
        <tr
          class="bg-white odd:bg-gray-100"
          v-for="file in filteredFiles"
          :key="file.id"
        >
          <td @click="handleShowDetail(file.id)">
            {{ file.name }}
          </td>
          <td>
            {{ file.date }}
          </td>
          <td>
            {{ file.category }}
          </td>
          <td>
            {{ file.payed }}
          </td>
          <td>
            <button>Sposta</button>
          </td>
          <td>
            <button @click="toggleSpecial(file.id)" style="color: orange">
              {{ file.special ? "★" : "☆" }}
            </button>
          </td>
        </tr>
      </table>
      <div v-else>Nessun file presente nella cartella</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { useFiles } from "../useFiles";
import FileDetail from "./FileDetail.vue";
import ModificationsModal from "./ModificationsModal.vue";

const { filteredFiles, toggleSpecial, activeSectionName, showFile, state } =
  useFiles();
const showDetail = ref(state.showDetail);
const fileDetails = ref({});

async function handleShowDetail(id) {
  showDetail.value = true;
  const res = await showFile(id);
  fileDetails.value = res;
}

function hideDetail() {
  showDetail.value = false;
}

defineProps({
  files: {
    type: Array,
    required: false,
  },
});
</script>

<style scoped></style>
