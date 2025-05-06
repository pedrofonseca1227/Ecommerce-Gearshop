<template>
    <div class="perfil-container">
      <h1>Meu Perfil</h1>
  
      <div v-if="userData">
        <div class="info-section">
          <p><strong>Nome:</strong> {{ userData.nome }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Tipo de usuário:</strong> {{ userData.tipo }}</p>
        </div>
  
        <div class="edit-section">
          <h2>Informações adicionais</h2>
          <form @submit.prevent="salvarPerfil">
            <label>
              Endereço:
              <input type="text" v-model="userData.endereco" />
            </label>
  
            <label>
              Telefone:
              <input type="text" v-model="userData.telefone" />
            </label>
  
            <label v-if="userData.tipo === 'vendedor'">
              Descrição do Vendedor:
              <textarea v-model="userData.descricao"></textarea>
            </label>
  
            <button type="submit">Salvar Alterações</button>
          </form>
        </div>
      </div>
  
      <div v-else>
        <p>Carregando dados do perfil...</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { auth, db } from '@/firebase';
  import { doc, getDoc, updateDoc } from 'firebase/firestore';
  
  // Estado do usuário logado
  const user = ref(auth.currentUser);
  const userData = ref(null);
  
  const carregarPerfil = async () => {
    if (user.value) {
      const docRef = doc(db, 'usuarios', user.value.uid);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        userData.value = docSnap.data();
      } else {
        console.error('Usuário não encontrado no Firestore');
      }
    }
  };
  
  const salvarPerfil = async () => {
    if (user.value) {
      const docRef = doc(db, 'usuarios', user.value.uid);
      await updateDoc(docRef, {
        endereco: userData.value.endereco || '',
        telefone: userData.value.telefone || '',
        descricao: userData.value.tipo === 'vendedor' ? userData.value.descricao || '' : ''
      });
      alert('Perfil atualizado com sucesso!');
    }
  };
  
  onMounted(() => {
    carregarPerfil();
  });
  </script>
  
  <style scoped>
  .perfil-container {
    max-width: 700px;
    margin: auto;
    padding: 2rem;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  }
  
  .info-section {
    margin-bottom: 2rem;
  }
  
  .edit-section label {
    display: block;
    margin-bottom: 1rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
  }
  
  button {
    padding: 0.6rem 1.2rem;
    background-color: black;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 6px;
  }
  </style>
  