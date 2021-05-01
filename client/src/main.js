import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// createApp, root component App, use Vue Router
createApp(App)
  .use(router)
  .mount("#app");
