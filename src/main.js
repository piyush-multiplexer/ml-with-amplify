import { createApp } from "vue";
import App from "./App.vue";
import AmplifyVue from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(AmplifyVue);
app.mount("#app");
