import { createApp } from "vue";
import App from "./App.vue";
import TextConverter from "./components/TextConverter.vue";

const app = createApp(App);

app.component("text-converter", TextConverter);

app.mount("#app");
