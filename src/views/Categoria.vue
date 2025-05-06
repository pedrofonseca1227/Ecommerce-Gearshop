<template>
  <div class="categorias-container">
    <h1>🔍 Produtos à Venda</h1>
    <div class="filtros">
      <select v-model="filtroCategoria">
        <option value="">Todas as Categorias</option>
        <option>Motor</option>
        <option>Suspensão</option>
        <option>Cambio</option>
        <option>Freios</option>
        <option>Elétrica</option>
        <option>Carroceria</option>
        <option>Rodas e Pneus</option>
      </select>
    </div>

    <div class="produtos">
      <div v-for="produto in produtosFiltrados" :key="produto.id" class="produto-card">
        <img :src="produto.imagem_url" alt="Imagem do produto" class="produto-imagem" />
        <h3>{{ produto.nome }}</h3>
        <p>{{ produto.categoria }}</p>
        <p>R$ {{ produto.preco }}</p>
        <p>{{ produto.estado }}</p>
        <p>{{ produto.descricao }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useRoute } from 'vue-router';

const route = useRoute();
const produtos = ref([]);
const produtosFiltrados = ref([]);
const filtroCategoria = ref('');

const carregarProdutos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'produtos'));
    produtos.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    aplicarFiltro(); // Aplica filtro assim que carrega os produtos
  } catch (error) {
    console.error('Erro ao carregar produtos:', error.message);
  }
};

const aplicarFiltro = () => {
  const termo = (route.query.busca || '').toLowerCase().trim();

  if (!termo && !filtroCategoria.value) {
    produtosFiltrados.value = produtos.value;
    return;
  }

  let filtrados = produtos.value;

  if (filtroCategoria.value) {
    filtrados = filtrados.filter(p =>
      p.categoria?.toLowerCase() === filtroCategoria.value.toLowerCase()
    );
  }

  if (termo) {
    // 1. Filtra produtos que contenham o termo completo
    let encontrados = filtrados.filter(p =>
      p.titulo?.toLowerCase().includes(termo) ||
      p.descricao?.toLowerCase().includes(termo)
    );

    // 2. Se não encontrou nada, tenta por palavras-chave
    if (encontrados.length === 0) {
      const palavras = termo.split(' ');
      encontrados = filtrados.filter(p => {
        return palavras.some(palavra =>
          p.titulo?.toLowerCase().includes(palavra) ||
          p.descricao?.toLowerCase().includes(palavra)
        );
      });
    }

    filtrados = encontrados;
  }

  produtosFiltrados.value = filtrados;
};

onMounted(carregarProdutos);

// Reaplica o filtro toda vez que o usuário faz nova busca
watch(() => route.query.busca, aplicarFiltro);
watch(filtroCategoria, aplicarFiltro);
</script>


<style scoped>
/* Garantir que a rolagem da página e o layout não tenham problemas */
* {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Evitar rolagem horizontal */
  scroll-behavior: smooth; /* Suaviza a rolagem */
  height: 100%; /* Garantir que a altura ocupe 100% */
}

/* Container das categorias */
.categorias-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Rajdhani', sans-serif;
  padding-top: 80px;
  padding-bottom: 100px; /* Espaço adicional para o footer */
  flex-grow: 1; /* Permitir que o conteúdo ocupe o restante da tela */
}

/* Título */
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
}

/* Filtros */
.filtros {
  margin-bottom: 20px;
  text-align: center;
}

.filtros select {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

/* Layout dos produtos */
.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* Estilo dos cards de produto */
.produto-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.produto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.produto-imagem {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* Título e descrição no card */
h3 {
  font-size: 1.5rem;
  margin-top: 10px;
}

p {
  margin: 5px 0;
  color: #666;
}

/* Media queries para dispositivos menores */
@media (max-width: 768px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .produtos {
    grid-template-columns: 1fr;
  }
}

/* Estilo do footer para manter ele no final da tela */
footer {
  position: relative;
  margin-top: auto; /* Garante que o footer vai para o final */
}

</style>
