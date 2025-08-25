import { createApp } from "vue";
import App from "./App.vue";
import TextConverter from "./components/TextConverter.vue";
import TextAnalyzer from "./components/TextAnalyzer.vue";
import OcrAndAnalysis from "./components/OcrAndAnalysis.vue";
import SideTab from "./components/SideTab.vue";
import MainList from "./components/MainList.vue";
import FileDetail from "./components/FileDetail.vue";
import SummaryGraph from "./components/SummaryGraph.vue";
import VueApexCharts from "vue3-apexcharts";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/tailwind.css";
import ModificationsModal from "./components/ModificationsModal.vue";

import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashCan);

const app = createApp(App);

app.use(VueApexCharts);
app.component("OcrAndAnalysis", OcrAndAnalysis);
app.component("TextConverter", TextConverter);
app.component("TextAnalyzer", TextAnalyzer);
app.component("SideTab", SideTab);
app.component("MainList", MainList);
app.component("SummaryGraph", SummaryGraph);
app.component("FileDetail", FileDetail);
app.component("ModificationsModal", ModificationsModal);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.mount("#app");
