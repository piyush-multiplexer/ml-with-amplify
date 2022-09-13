import { createApp } from "vue";
import App from "./App.vue";
import './assets/style.css'
import AmplifyVue from "@aws-amplify/ui-vue";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(AmplifyVue);
app.mount("#app");
