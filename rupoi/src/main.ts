import {getAppInstance} from "@common/app/common-main.ts";
import App from "@rupoi/app/entrypoint";
import { router } from "@rupoi/app/router";
import {rupoiInstance} from "@rupoi/shared/api";

const app = getAppInstance(App, router, rupoiInstance)
app.mount('#app')
