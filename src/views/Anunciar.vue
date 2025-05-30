<template>
  <div class="anunciar-container">
    <h1>📢 Anuncie sua Peça</h1>
    <p class="subtitle">Preencha os dados abaixo e conecte sua peça a quem realmente precisa.</p>
    
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner"></div>
      <p>Publicando seu anúncio...</p>
    </div>

    <form @submit.prevent="anunciarProduto" class="anuncio-form">
      <div class="form-group">
        <label for="nome">Nome da Peça*</label>
        <input v-model="produto.nome" id="nome" type="text" placeholder="Ex: Motor 1.6 Flex" required 
               maxlength="60" />
        <span class="char-counter">{{ produto.nome.length }}/60</span>
      </div>

      <div class="form-group">
        <label for="categoria">Categoria*</label>
        <select v-model="produto.categoria" id="categoria" required>
          <option value="" disabled selected>Selecione uma categoria</option>
          <option>Motor</option>
          <option>Suspensão</option>
          <option>Freios</option>
          <option>Cambio</option>
          <option>Elétrica</option>
          <option>Carroceria</option>
          <option>Rodas e Pneus</option>
        </select>
      </div>

      <div class="form-group">
        <label for="modelo">Modelo Compatível*</label>
        <input v-model="produto.modelo" id="modelo" type="text" 
               placeholder="Ex: Gol 1.6 2010-2015" required />
      </div>

      <div class="form-group">
        <label for="imagem">Foto da Peça (opcional, máximo 2MB)</label>
        <input type="file" @change="selecionarImagem" id="imagem" accept="image/*" />
        <div v-if="imagemPreview" class="img-preview">
          <img :src="imagemPreview" alt="Preview da imagem" />
          <button type="button" @click="removerImagem" class="remove-image-btn">× Remover</button>
        </div>
        <p v-if="imagemError" class="error-message">{{ imagemError }}</p>
      </div>

      <div class="form-group-inline">
        <div class="form-group">
          <label for="preco">Preço (R$)*</label>
          <input v-model.number="produto.preco" id="preco" type="number" 
                 min="0" step="0.01" placeholder="Ex: 150.00" required />
        </div>

        <div class="form-group">
          <label for="estado">Estado da Peça*</label>
          <select v-model="produto.estado" id="estado" required>
            <option value="" disabled selected>Selecione</option>
            <option>Nova</option>
            <option>Usada</option>
            <option>Recondicionada</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="descricao">Descrição*</label>
        <textarea v-model="produto.descricao" id="descricao" rows="4" 
                  placeholder="Detalhes adicionais sobre a peça..." required
                  maxlength="500"></textarea>
        <span class="char-counter">{{ produto.descricao.length }}/500</span>
      </div>

      <div class="form-group-inline">
        <div class="form-group">
          <label for="cep">CEP (opcional)</label>
          <input v-model="produto.cep" id="cep" type="text" 
                 placeholder="Ex: 00000-000" v-mask="'#####-###'" />
        </div>
        
        <div class="form-group">
          <label for="telefone">Telefone para Contato*</label>
          <input v-model="produto.telefone" id="telefone" type="tel" 
                 placeholder="Ex: (11) 99999-9999" required v-mask="'(##) #####-####'" />
        </div>
      </div>

      <button type="submit" :disabled="loading">
        <span v-if="!loading">📤 Publicar Anúncio</span>
        <span v-else>Processando...</span>
      </button>

      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const router = useRouter();

const produto = ref({
  nome: '',
  categoria: '',
  preco: 0,
  estado: '',
  descricao: '',
  imagemUrl: '',
});

const loading = ref(false);
const imagemPreview = ref(null);
const imagemBase64 = ref(null);
const imagemError = ref(null);
const errorMessage = ref(null);

const selecionarImagem = (event) => {
  const file = event.target.files[0];
  imagemError.value = null;
  
  if (!file) return;

  //Validações (tipo e tamanho)
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxSize = 1 * 1024 * 1024; // 1MB (reduzido para Base64)

  if (!validTypes.includes(file.type)) {
    imagemError.value = 'Formato inválido. Use JPEG, PNG ou WEBP.';
    return;
  }

  if (file.size > maxSize) {
    imagemError.value = 'Imagem muito grande. Máximo 1MB.';
    return;
  }

  //Converter para Base64
  const reader = new FileReader();
  reader.onload = (e) => {
    imagemBase64.value = e.target.result;
    imagemPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const anunciarProduto = async () => {
  if (!auth.currentUser) {
    errorMessage.value = 'Você precisa estar logado para anunciar!';
    return router.push('/login');
  }

  loading.value = true;

  try {
    const produtoRef = collection(db, 'produtos');
    await addDoc(produtoRef, {
      ...produto.value,
      imagemBase64: imagemBase64.value || null,
      usuarioId: auth.currentUser.uid,
      dataCriacao: new Date()
    });

    alert('Anúncio publicado com sucesso!');
    router.push('/categoria');
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    errorMessage.value = 'Erro ao publicar anúncio. Tente novamente.';
  } finally {
    loading.value = false;
  }
};
//Função para mostrar toast de sucesso (implementar ou usar uma lib como vue-toastification)
const showSuccessToast = (message) => {
  alert(message);
};
</script>

<style scoped>
.anunciar-container {
  max-width: 700px;
  margin: 100px auto 50px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  font-family: 'Rajdhani', sans-serif;
  position: relative;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 12px;
}

.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #ff6600;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 10px;
  color: #1a1a1a;
}

.subtitle {
  text-align: center;
  font-size: 1rem;
  margin-bottom: 30px;
  color: #666;
}

.anuncio-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
}

.form-group {
  display: flex;
  flex-direction: column;
  position: relative;
}

.form-group-inline {
  display: flex;
  gap: 20px;
}

.form-group-inline .form-group {
  flex: 1;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  color: #333;
}

input[type="text"],
input[type="number"],
input[type="file"],
input[type="tel"],
select,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: border-color 0.2s;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #ff6600;
  outline: none;
}

button {
  padding: 12px;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #e05500;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.img-preview {
  margin-top: 10px;
  position: relative;
}

.img-preview img {
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  display: block;
}

.remove-image-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.2s;
}

.remove-image-btn:hover {
  background-color: rgba(255, 0, 0, 0.9);
}

.char-counter {
  font-size: 0.8rem;
  color: #666;
  text-align: right;
  margin-top: 4px;
}

.error-message {
  color: #d32f2f;
  background-color: #fde8e8;
  padding: 10px;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 0.9rem;
}
</style>