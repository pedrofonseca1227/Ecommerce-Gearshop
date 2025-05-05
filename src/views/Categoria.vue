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
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/supabase.js';

const filtroCategoria = ref('');
const produtos = ref([]);

const produtosFiltrados = computed(() => {
  if (filtroCategoria.value) {
    return produtos.value.filter(produto => produto.categoria === filtroCategoria.value);
  }
  return produtos.value;
});

onMounted(async () => {
  const { data, error } = await supabase.from('produtos').select('*');

  if (error) {
    console.error('Erro ao carregar produtos:', error.message);
  } else {
    produtos.value = data;
  }
});
</script>

<style scoped>
.categorias-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Rajdhani', sans-serif;
  padding-top: 80px; 
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
}

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

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

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

h3 {
  font-size: 1.5rem;
  margin-top: 10px;
}

p {
  margin: 5px 0;
  color: #666;
}

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
</style>
