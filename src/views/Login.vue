<template>
  <div class="login-container">
    <h2>Entrar na GearShop</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <p class="link">
        Esqueceu a senha? <a href="#">Clique aqui</a><br />
        Ainda não tem uma conta? <router-link to="/cadastro">Cadastre-se</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '@/supabase.js'; // Corrigido

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    console.error('Erro ao fazer login:', error.message);
    alert('Erro ao fazer login!');
  } else {
    console.log('Usuário logado:', data);
    alert('Login realizado com sucesso!');
    router.push('/'); // Redireciona para a home
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 120px auto;
  padding: 30px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: 'Rajdhani', sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #000;
}

input {
  width: 92.5%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
}

button {
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

.link {
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
</style>
