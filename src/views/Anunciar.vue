<template>
  <div class="anunciar-container">
    <h1>📢 Anuncie sua Peça</h1>
    <p class="subtitle">Preencha os dados abaixo e conecte sua peça a quem realmente precisa.</p>
    <form @submit.prevent="anunciarProduto" class="anuncio-form">
      <div class="form-group">
        <label for="nome">Nome da Peça</label>
        <input v-model="produto.nome" id="nome" type="text" placeholder="Ex: Motor 1.6 Flex" required />
      </div>

      <div class="form-group">
        <label for="categoria">Categoria</label>
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
        <label for="imagem">Foto da Peça (opcional)</label>
        <input type="file" @change="selecionarImagem" id="imagem" accept="image/*" />
        <div v-if="imagemPreview" class="img-preview">
          <img :src="imagemPreview" alt="Preview da imagem" />
        </div>
      </div>

      <div class="form-group-inline">
        <div class="form-group">
          <label for="preco">Preço (R$)</label>
          <input v-model="produto.preco" id="preco" type="number" placeholder="Ex: 150" required />
        </div>

        <div class="form-group">
          <label for="estado">Estado da Peça</label>
          <select v-model="produto.estado" id="estado" required>
            <option value="" disabled selected>Selecione</option>
            <option>Nova</option>
            <option>Usada</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="descricao">Descrição</label>
        <textarea v-model="produto.descricao" id="descricao" rows="4" placeholder="Detalhes adicionais sobre a peça..."></textarea>
      </div>

      <button type="submit">📤 Publicar Anúncio</button>
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
const produto = ref({
  nome: '',
  categoria: '',
  preco: '',
  estado: '',
  descricao: '',
  imagemUrl: '' // opcional, ficará vazio
});

const imagemPreview = ref(null);
const router = useRouter();

const selecionarImagem = (event) => {
  const file = event.target.files[0];
  if (file) {
    imagemPreview.value = URL.createObjectURL(file);
    // Apenas preview local, nada será enviado
  }
};

const anunciarProduto = async () => {
  try {
    const produtoRef = collection(db, 'produtos');
    await addDoc(produtoRef, {
      ...produto.value,
      imagem_url: produto.value.imagemUrl || '' // envia string vazia caso não tenha imagem
    });

    alert('Produto publicado com sucesso!');
    // Redireciona para a página de categorias e força a navegação
    router.push('/categoria').catch(() => {});
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    alert('Erro ao cadastrar produto.');
  }
};
</script>

<style scoped>
/* mesmo CSS de antes, mantido para consistência visual */
.anunciar-container {
  max-width: 700px;
  margin: 100px auto 50px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  font-family: 'Rajdhani', sans-serif;
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
}
.form-group {
  display: flex;
  flex-direction: column;
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
button:hover {
  background-color: #e05500;
}
.img-preview img {
  max-width: 100%;
  margin-top: 10px;
  border-radius: 8px;
}
</style>
