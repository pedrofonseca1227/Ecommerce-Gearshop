<template>
    <div class="cadastro-container">
      <h2>Crie sua Conta</h2>
      <form @submit.prevent="cadastrar">
        <input type="text" placeholder="Nome completo" v-model="nome" required />
        <input type="email" placeholder="E-mail" v-model="email" required />
        <input type="password" placeholder="Senha" v-model="senha" required />
        <button type="submit">Cadastrar</button>
        <p class="link">
          Já tem uma conta? <router-link to="/login">Entre aqui</router-link>
        </p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const nome = ref('');
  const email = ref('');
  const senha = ref('');
  
  const cadastrar = () => {
    console.log('Cadastro:', { nome: nome.value, email: email.value, senha: senha.value });
    // Lógica futura para cadastro
  };
  </script>
  
  <style scoped>
  .cadastro-container {
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
  