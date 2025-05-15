<template>
  <div class="meus-produtos-container">
    <h1>📋 Meus Produtos</h1>
    
    <div class="filtros">
      <select v-model="filtroCategoria" class="filtro-select">
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

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando seus produtos...</p>
    </div>

    <div v-else-if="produtosFiltrados.length === 0" class="sem-produtos">
      <div class="icon-placeholder">📭</div>
      <h2>Você ainda não tem produtos cadastrados</h2>
      <router-link to="/anunciar" class="btn-primario">
        Criar primeiro anúncio
      </router-link>
    </div>

    <div v-else class="produtos-grid">
      <div v-for="produto in produtosFiltrados" :key="produto.id" class="produto-card">
        <div class="produto-imagem-container">
          <img 
            v-if="produto.imagemBase64" 
            :src="produto.imagemBase64" 
            :alt="produto.nome"
            class="produto-imagem"
          />
          <div v-else class="sem-imagem">
            <span>📷</span>
          </div>
        </div>
        
        <div class="produto-info">
          <h3>{{ produto.nome }}</h3>
          <p class="categoria">{{ produto.categoria }}</p>
          <p class="preco">R$ {{ produto.preco.toFixed(2) }}</p>
          <p class="estado">{{ produto.estado }}</p>
          
          <div class="acoes">
            <button @click="confirmarExclusao(produto.id)" class="btn-excluir">
              🗑️ Excluir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>Confirmar exclusão</h3>
        <p>Tem certeza que deseja excluir este produto?</p>
        <div class="modal-botoes">
          <button @click="showModal = false" class="btn-cancelar">
            Cancelar
          </button>
          <button @click="excluirProduto" class="btn-confirmar">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const router = useRouter();
const produtos = ref([]);
const loading = ref(true);
const filtroCategoria = ref('');
const showModal = ref(false);
const produtoParaExcluir = ref(null);

// Carregar produtos do usuário
const carregarProdutos = async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      router.push('/login');
      return;
    }

    const q = query(
      collection(db, 'produtos'),
      where('usuarioId', '==', userId)
    );
    
    const querySnapshot = await getDocs(q);
    produtos.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  } finally {
    loading.value = false;
  }
};

// Filtrar produtos por categoria
const produtosFiltrados = computed(() => {
  if (!filtroCategoria.value) return produtos.value;
  return produtos.value.filter(
    p => p.categoria?.toLowerCase() === filtroCategoria.value.toLowerCase()
  );
});

// Editar produto
const editarProduto = (id) => {
  router.push(`/editar-produto/${id}`);
};

// Confirmar exclusão
const confirmarExclusao = (id) => {
  produtoParaExcluir.value = id;
  showModal.value = true;
};

// Excluir produto
const excluirProduto = async () => {
  try {
    await deleteDoc(doc(db, 'produtos', produtoParaExcluir.value));
    produtos.value = produtos.value.filter(p => p.id !== produtoParaExcluir.value);
    showModal.value = false;
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
  }
};

onMounted(() => {
  carregarProdutos();
});
</script>

<style scoped>
.meus-produtos-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: 'Rajdhani', sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  font-size: 2.2rem;
}

.filtros {
  margin-bottom: 2rem;
  text-align: center;
}

.filtro-select {
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background-color: #f9f9f9;
  transition: all 0.3s;
}

.filtro-select:focus {
  outline: none;
  border-color: #ff6600;
  box-shadow: 0 0 0 2px rgba(255, 102, 0, 0.2);
}

.loading {
  text-align: center;
  padding: 2rem;
}

.spinner {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #ff6600;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.sem-produtos {
  text-align: center;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  margin: 2rem 0;
}

.icon-placeholder {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #ff6600;
}

.btn-primario {
  display: inline-block;
  background-color: #ff6600;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  margin-top: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-primario:hover {
  background-color: #e55b00;
}

.produtos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.produto-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.produto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.produto-imagem-container {
  height: 200px;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.produto-imagem {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sem-imagem {
  font-size: 3rem;
  color: #ccc;
}

.produto-info {
  padding: 1.5rem;
}

.produto-info h3 {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  color: #333;
}

.categoria {
  display: inline-block;
  background-color: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin: 0.5rem 0;
  color: #666;
}

.preco {
  font-size: 1.5rem;
  font-weight: bold;
  color: #ff6600;
  margin: 0.5rem 0;
}

.estado {
  color: #666;
  font-size: 0.9rem;
  margin: 0.5rem 0;
}

.acoes {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-editar, .btn-excluir {
  flex: 1;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-editar {
  background-color: #2196F3;
  color: white;
}

.btn-editar:hover {
  background-color: #0b7dda;
}

.btn-excluir {
  background-color: #f44336;
  color: white;
}

.btn-excluir:hover {
  background-color: #d32f2f;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  width: 90%;
  text-align: center;
}

.modal h3 {
  margin-top: 0;
  color: #333;
}

.modal p {
  color: #666;
}

.modal-botoes {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

.btn-cancelar, .btn-confirmar {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-cancelar {
  background-color: #f0f0f0;
  color: #333;
}

.btn-cancelar:hover {
  background-color: #ddd;
}

.btn-confirmar {
  background-color: #f44336;
  color: white;
}

.btn-confirmar:hover {
  background-color: #d32f2f;
}

/* Responsividade */
@media (max-width: 768px) {
  .produtos-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .meus-produtos-container {
    padding: 1rem;
  }
  
  .acoes {
    flex-direction: column;
  }
}
</style>