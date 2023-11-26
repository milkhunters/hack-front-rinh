import { createApp } from "vue";
import { createPinia } from "pinia";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import App from "./App.vue";
import createApi from "./api";
import createRoutes from "./router";
import { API_KEY } from "@/common/hooks/use-api";
import "./styles/bulma.scss";

const app = createApp(App);
const api = createApi("http");
const queryClient = new QueryClient();

app.use(createPinia());
app.use(VueQueryPlugin);
app.provide(API_KEY, api);

app.use(createRoutes({ api, queryClient }));

app.mount("#app");
