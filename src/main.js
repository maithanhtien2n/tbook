import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import { createApp } from "vue";
import AppWrapper from "./AppWrapper.vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "/node_modules/primeflex/primeflex.css";

import router from "./services/router";

import "./assets/main.css";

import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Textarea from "primevue/textarea";
import Chip from "primevue/chip";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Message from "primevue/message";
import ScrollPanel from "primevue/scrollpanel";

const app = createApp(AppWrapper);

app.use(router);
app.use(createPinia());
app.use(PrimeVue);
app.use(ToastService);

app.component("Dialog", Dialog);
app.component("InputText", InputText);
app.component("Password", Password);
app.component("Button", Button);
app.component("Textarea", Textarea);
app.component("Chip", Chip);
app.component("Toast", Toast);
app.component("Message", Message);
app.component("ScrollPanel", ScrollPanel);

app.mount("#app");
