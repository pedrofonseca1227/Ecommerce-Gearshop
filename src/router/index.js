import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Sobre from '../views/Sobre.vue';
import Contato from '../views/Contato.vue';
import Categorias from '../views/Categorias.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/sobre', component: Sobre },
  { path: '/contato', component: Contato },
  { path: '/categorias', component: Categorias }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
