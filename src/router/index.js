import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Categoria from '../views/Categoria.vue';
import Contato from '../views/Contato.vue';
import Sobre from '../views/Sobre.vue';
import Login from '../views/Login.vue';
import Cadastro from '../views/Cadastro.vue';
import Anunciar from '../views/Anunciar.vue';
import { supabase } from '@/supabase.js';

const routes = [
  { path: '/', component: Home },
  { path: '/categoria', component: Categoria },
  { path: '/contato', component: Contato },
  { path: '/sobre', component: Sobre },
  { path: '/login', component: Login },
  { path: '/cadastro', component: Cadastro },
  { path: '/anunciar', component: Anunciar, meta: { requiresAuth: true } }, // 🚧 protegida
];

const router = createRouter({
  history: createWebHistory(), 
  routes,
});

// 🔐 Guardião de rotas
router.beforeEach(async (to, from, next) => {
  const { data } = await supabase.auth.getSession();
  const isAuthenticated = !!data.session;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
