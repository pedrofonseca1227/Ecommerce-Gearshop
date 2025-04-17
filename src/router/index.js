import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Categoria from '../views/Categoria.vue';
import Contato from '../views/Contato.vue';
import Sobre from '../views/Sobre.vue';
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro.vue';
import Anunciar from '../views/Anunciar.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/categoria', component: Categoria },
  { path: '/contato', component: Contato },
  { path: '/sobre', component: Sobre },
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },
  {path: '/anunciar', component: Anunciar },
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

export default router;
