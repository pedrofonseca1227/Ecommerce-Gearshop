import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Categoria from '../views/Categoria.vue';
import Contato from '../views/Contato.vue';
import Sobre from '../views/Sobre.vue';
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro.vue';
import Anunciar from '../views/Anunciar.vue';
import { auth } from '../firebase';
import Perfil from '../views/Perfil.vue'; // Corrigido: importação correta do auth

const routes = [
  { path: '/', component: Home },
  { path: '/categoria', name:'categoria', component: Categoria },
  { path: '/contato', component: Contato },
  { path: '/sobre', component: Sobre },
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },
  { path: '/anunciar', component: Anunciar, meta: { requiresAuth: true } }, // 🚧 protegida
  { path: '/perfil', component: Perfil },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 🔐 Guardião de rotas
router.beforeEach(async (to, from, next) => {
  const { currentUser } = auth; // Usando currentUser para verificar sessão
  const isAuthenticated = !!currentUser;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
