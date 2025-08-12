<template>
  <div>
    <apexchart
      width="500"
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  files: {
    type: Array,
    required: false,
  },
});

const categoryCount = props.files.reduce((acc, file) => {
  acc[file.category] = (acc[file.category] || 0) + 1;
  return acc;
}, {});

const series = Object.values(categoryCount);

// Opzioni con le etichette
const chartOptions = {
  labels: Object.keys(categoryCount),
  legend: {
    position: "bottom",
  },
};

// // per grafico a linee
// const series = [
//   {
//     name: "Numero documenti",
//     data: Object.values(categoryCount), // solo numeri
//   },
// ];

// // Opzioni base per evitare l'errore "reading chart"
// const chartOptions = {
//   chart: {
//     id: "bar-chart",
//   },
//   xaxis: {
//     categories: Object.keys(categoryCount), // le categorie come etichette
//   },
// };
</script>
