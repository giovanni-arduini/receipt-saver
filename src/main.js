import { createApp } from "vue";
import App from "./App.vue";
import TextConverter from "./components/TextConverter.vue";
import TextAnalyzer from "./components/TextAnalyzer.vue";
import OcrAndAnalysis from "./components/OcrAndAnalysis.vue";
import SideTab from "./components/SideTab.vue";

const app = createApp(App);

app.component("OcrAndAnalysis", OcrAndAnalysis);
app.component("TextConverter", TextConverter);
app.component("TextAnalyzer", TextAnalyzer);
app.component("SideTab", SideTab);

app.mount("#app");
