<template>
  <div
    class="flex items-start justify-center text-center row-start-3 col-start-2 row-end-6 col-end-6 bg-green-200"
  >
    <table
      class="m-3 w-4/5 table-auto border-separate border-spacing-2 border-gray-400 dark:border-gray-500"
    >
      <tr class="bg-gray-200">
        <th>Nome</th>
        <th>Data</th>
        <th>Categoria</th>
        <th>Pagati</th>
      </tr>
      <tr
        class="bg-white odd:bg-gray-100"
        v-for="file in files"
        :key="file.id"
        v-on:click="toReceiptDetails"
      >
        <td>
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
      </tr>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
defineProps({
  files: {
    type: Array,
    required: false,
  },
});
</script>

<style scoped></style>
