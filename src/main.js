import { createApp } from "vue";
import App from "./App.vue";
import TextConverter from "./components/TextConverter.vue";
import TextAnalyzer from "./components/TextAnalyzer.vue";
import OcrAndAnalysis from "./components/OcrAndAnalysis.vue";
import SideTab from "./components/SideTab.vue";
import MainList from "./components/MainList.vue";
import SummaryGraph from "./components/SummaryGraph.vue";
import VueApexCharts from "vue3-apexcharts";

import "./assets/tailwind.css";

const app = createApp(App);

app.use(VueApexCharts);
app.component("OcrAndAnalysis", OcrAndAnalysis);
app.component("TextConverter", TextConverter);
app.component("TextAnalyzer", TextAnalyzer);
app.component("SideTab", SideTab);
app.component("MainList", MainList);
app.component("SummaryGraph", SummaryGraph);

app.mount("#app");
