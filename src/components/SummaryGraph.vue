<template>
  <div class="flex justify-center items-center">
    <div>
      <apexchart
        width="100%"
        type="donut"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
    <div>
      <div class="mb-4">
        <h2>Totale sezione:</h2>
        <p>{{ expensesSum }} €</p>
      </div>
      <div>
        <h3>Detraibile:</h3>
        <p>{{ deductible }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  files: {
    type: Array,
    required: false,
  },
});

const expensesSum = computed(() =>
  props.files.reduce((acc, file) => {
    acc = acc + file.payed;
    return acc;
  }, 0)
);

function percentageOfNumber(percent, number) {
  return (percent / 100) * number;
}

const deductible = computed(() =>
  expensesSum.value - 129.11 > 0
    ? `${percentageOfNumber(19, expensesSum.value - 129.11).toFixed(2)} €`
    : "Non è stata ancora superata la franchigia"
);

const categoryCount = computed(() =>
  props.files.reduce((acc, file) => {
    acc[file.category] = (acc[file.category] || 0) + 1;
    return acc;
  }, {})
);

const series = computed(() => Object.values(categoryCount.value));

const chartOptions = computed(() => ({
  labels: Object.keys(categoryCount.value),
  legend: {
    position: "bottom",
  },
}));

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
