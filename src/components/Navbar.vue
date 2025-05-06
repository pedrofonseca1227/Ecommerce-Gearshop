<template>
  <nav class="navbar" :class="{ 'navbar-hidden': isHidden }">
    <div class="navbar-container">
      <button class="hamburger" @click="toggleMenu">
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
        <span :class="{ open: menuOpen }"></span>
      </button>
      
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/categoria">Categorias</router-link></li>
        <li><router-link to="/anunciar">Anunciar</router-link></li>
        <li><router-link to="/sobre">Sobre Nós</router-link></li>
        <li><router-link to="/contato">Contato</router-link></li>
      </ul>
      
      <div class="search-container">
        <form class="search-bar" @submit.prevent="pesquisar">
          <input
            type="text"
            v-model="termoBusca"
            placeholder="Buscar peças..."
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      <ul class="auth-links">
        <li><button class="cep-btn" @click="abrirCepModal">Localizar CEP</button></li>
        <li class="separator">|</li>

        <!-- Se o usuário estiver logado -->
        <li v-if="user">
          <router-link to="/perfil">
            <i class="fa fa-user-circle account-icon"></i> <!-- Ícone de conta -->
          </router-link>
          <button @click="logout" class="logout-btn">Sair</button> <!-- Botão de logout -->
        </li>

        <li v-else>
          <router-link to="/login">Entrar</router-link>
          <router-link to="/cadastro">Cadastre-se</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router';
import { auth } from '@/firebase'  // Certifique-se de que a importação do Firebase está correta
import { db } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore'

// Variáveis reativas
const user = ref(null); // Agora é 'null' inicialmente
const termoBusca = ref('');

// Função para escutar alterações no estado de autenticação
const unsubscribe = auth.onAuthStateChanged((loggedUser) => {
  user.value = loggedUser;  // Atualiza o usuário quando houver login/logout
});

onUnmounted(() => {
  unsubscribe();  // Limpa o listener quando o componente for desmontado
});

const router = useRouter(); 
const pesquisar = () => {
  if (termoBusca.value.trim()) {
    router.push({ name: 'categoria', query: { busca: termoBusca.value.trim() } });
    termoBusca.value = '';  // Limpa o campo após a pesquisa
  }
};

// Função de logout
const logout = async () => {
  try {
    await auth.signOut(); // Realiza o logout
    user.value = null;     // Atualiza o estado do usuário
  } catch (error) {
    console.error('Erro ao sair:', error);
  }
};
</script>
  
<style scoped>
/* navbar */
.navbar {
  background-color: #1a1a1a;
  padding: 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
}

.nav-links,
.auth-links {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
  margin-left: auto;
  margin-right: 100px;
  align-items: center;
}

.nav-links li,
.auth-links li {
  display: flex;
  align-items: center;
}

.nav-links li a,
.auth-links li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

.nav-links li a:hover,
.auth-links li a:hover {
  color: #ff6600;
}

.account-icon {
  font-size: 24px; /* Ajuste o tamanho conforme necessário */
  color: white;    /* Garante que o ícone seja branco */
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding-left: 10px;
}

.logout-btn:hover {
  text-decoration: underline;
}

.auth-actions {
  display: flex;
  gap: 10px;
}

.auth-actions a {
  padding-right: 0;
}

.auth-links .separator {
  color: #ff6600;
  font-size: 20px;
  font-weight: bold;
  margin: 0 10px;
  user-select: none;
}

.navbar-hidden {
  transform: translateY(-100%);
  transition: transform 0.5s ease-in-out;
}

/* CEP Modal */

.cep-btn {
  background: none;
  border: none;
  color: white;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 10px;
  transition: color 0.3s;
}

.cep-btn:hover {
  color: #ff6600;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal h2 {
  margin-bottom: 20px;
}

.modal input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  flex: 1;
  margin: 0 5px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.modal-actions button:first-child {
  background: #ccc;
}

.modal-actions button:last-child {
  background: #ff6600;
  color: white;
}

/* barra de pesquisa */
.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #1a1a1a; /* Fundo preto */
  border-radius: 25px;
  padding: 5px 15px;
  border: 1px solid #444; /* Borda mais sutil */
}

.search-bar input {
  background: transparent;
  border: none;
  outline: none;
  color: white; /* Texto branco */
  padding: 8px 12px;
  width: 200px;
  font-size: 14px;
  font-family: 'Rajdhani', sans-serif;
}

.search-bar button {
  background-color: #ff6600; /* Cor laranja */
  border: none;
  color: white;
  padding: 8px 14px;
  margin-left: 10px;
  border-radius: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.search-bar button:hover {
  background-color: #e55b00; /* Cor laranja mais escuro */
}

.search-bar input::placeholder {
  color: #aaa; /* Cor do placeholder */
}

.search-bar:focus-within {
  box-shadow: 0 0 0 2px #ff6600; /* Destaque quando em foco */
}

.search-bar button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #ff6600; /* Destaque no botão */
}
</style>
