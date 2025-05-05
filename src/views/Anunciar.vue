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
        <select v-model="produto.categoria" id="categoria">
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
        <label for="imagem">Foto da Peça</label>
        <input type="file" @change="uploadImagem" id="imagem" accept="image/*" />
        <div v-if="imagemUrl" class="img-preview">
          <img :src="imagemUrl" alt="Imagem da peça" />
        </div>
      </div>

      <div class="form-group-inline">
        <div class="form-group">
          <label for="preco">Preço (R$)</label>
          <input v-model="produto.preco" id="preco" type="number" placeholder="Ex: 150" required />
        </div>

        <div class="form-group">
          <label for="estado">Estado da Peça</label>
          <select v-model="produto.estado" id="estado">
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
import { supabase } from '@/supabase.js';
import { useRouter } from 'vue-router';

const produto = ref({
  nome: '',
  categoria: '',
  preco: '',
  estado: '',
  descricao: '',
  imagemUrl: ''
});

const imagemUrl = ref(null);
const router = useRouter();

const uploadImagem = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `${fileName}`; // Corrigido: não precisa repetir 'produtos/'

  try {
    // Verifica se usuário está autenticado
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();
    if (userError || !user) {
      alert('Você precisa estar logado para publicar uma peça.');
      return;
    }

    const { data, error } = await supabase.storage
      .from('produtos') // Nome do bucket
      .upload(filePath, file);

    if (error) {
      console.error('Erro ao fazer upload da imagem:', error.message);
      alert('Erro ao fazer upload da imagem');
      return;
    }

    const {
      data: { publicUrl },
      error: urlError
    } = supabase.storage
      .from('produtos')
      .getPublicUrl(filePath);

    if (urlError) {
      console.error('Erro ao obter URL da imagem:', urlError.message);
      alert('Erro ao obter URL da imagem');
      return;
    }

    produto.value.imagemUrl = publicUrl;
    imagemUrl.value = publicUrl;

    console.log('Imagem carregada com sucesso:', publicUrl);
    alert('Imagem carregada com sucesso!');
  } catch (error) {
    console.error('Erro inesperado:', error);
    alert('Houve um erro ao tentar fazer upload da imagem');
  }
};

const anunciarProduto = async () => {
  const { nome, categoria, preco, estado, descricao, imagemUrl } = produto.value;

  if (!imagemUrl) {
    alert('Por favor, faça o upload de uma imagem da peça.');
    return;
  }

  try {
    const { data, error } = await supabase.from('produtos').insert([
      {
        nome,
        categoria,
        preco,
        estado,
        descricao,
        imagem_url: imagemUrl // Coluna correta no banco
      }
    ]);

    if (error) {
      console.error('Erro ao cadastrar produto:', error.message);
      alert('Erro ao cadastrar produto: ' + error.message);
    } else {
      console.log('Produto cadastrado com sucesso:', data);
      alert('Produto publicado com sucesso!');
      router.push('/categorias');
    }
  } catch (err) {
    console.error('Erro inesperado:', err);
    alert('Houve um erro ao cadastrar o produto.');
  }
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
  </style>
  