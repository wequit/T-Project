import { createRouter, createWebHistory } from "vue-router";
import { rupoiGuard } from "./guard";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory('/rupoi'),
  routes,
  linkActiveClass: 'active'
});

router.beforeEach(rupoiGuard);

export { router };
