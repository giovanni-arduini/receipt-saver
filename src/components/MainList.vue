<template>
  <div>
    <table>
      <tr>
        <th>Nome</th>
        <th>Data</th>
        <th>Categoria</th>
        <th>Pagati</th>
      </tr>
      <tr v-for="file in files" :key="file.id">
        <td>{{ file.name }}</td>
        <td>{{ file.date }}</td>
        <td>{{ file.category }}</td>
        <td>{{ file.payed }}</td>
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

<style scoped>
/* schifo assoluto */
div {
  position: fixed;
  right: 0;
}
</style>
