<template>
  <div>
    <apexchart
      width="350"
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
  <div>
    <div>
      <h2>Spese totali</h2>
      <p>{{ expensesSum }} €</p>
    </div>
    <div>
      <h3>Detraibile</h3>
      <p>{{ deductible }} €</p>
    </div>
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

const expensesSum = props.files.reduce((acc, file) => {
  acc = acc + file.payed;
  return acc;
}, 0);

function percentageOfNumber(percent, number) {
  return (percent / 100) * number;
}

const deductible =
  expensesSum - 129.11 > 0
    ? percentageOfNumber(19, expensesSum - 129.11).toFixed(2)
    : "Non è stata ancora superata la franchigia";

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
