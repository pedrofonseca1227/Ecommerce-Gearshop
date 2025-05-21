<template>
  <div class="cadastro-container">
    <h2>Crie sua Conta</h2>
    <form @submit.prevent="cadastrar">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <input v-model="username" type="username" placeholder="Nome de usuario" required />

      <button type="submit">Cadastrar</button>
      <p class="link">
        Já tem uma conta? <router-link to="/login">Entre aqui</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '@/firebase.js';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const email = ref('');
const password = ref('');
const username = ref('');
const router = useRouter();
const db = getFirestore();

const cadastrar = async () => {
  try {
    // 1. Cria o usuário no Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // 2. Atualiza o displayName no Authentication
    await updateProfile(user, {
      displayName: username.value
    });

    // 3. Salva informações adicionais no Firestore
    await setDoc(doc(db, 'usuarios', user.uid), {
      username: username.value,
      email: email.value,
      criadoEm: new Date()
    });

    // 4. Envia e-mail de verificação
    await sendEmailVerification(user);

    alert('Cadastro realizado com sucesso! Verifique seu e-mail.');
    router.push('/login');
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    alert('Erro ao cadastrar: ' + error.message);
  }
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
  