<template>
  <div class="categorias-container">
    <h1>🔍 Produtos à Venda</h1>
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

    <div class="produtos">
      <div v-for="produto in produtosFiltrados" :key="produto.id" class="produto-card">
        <button class="add-cart-btn" @click="adicionarAoCarrinho(produto)">🛒</button>
        
        <div class="imagem-container">
          <img 
            v-if="produto.imagemBase64" 
            :src="produto.imagemBase64" 
            :alt="produto.nome"
            class="produto-imagem"
          />
          <div v-else class="sem-imagem">
            <span>📷 Sem imagem</span>
          </div>
        </div>
        
        <div class="produto-info">
          <h3>{{ produto.nome }}</h3>
          <p class="categoria">{{ produto.categoria }}</p>
          <p class="preco">R$ {{ produto.preco.toFixed(2) }}</p>
          <p class="estado">{{ produto.estado }}</p>
          <p class="descricao">{{ produto.descricao }}</p>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="mostrarPopup" class="popup-overlay">
      <div class="popup-content">
        <p>Produto adicionado ao carrinho!</p>
        <div class="modal-botoes">
          <button @click="continuarComprando" class="btn-continuar">
            Continuar comprando
          </button>
          <button @click="irParaCarrinho" class="btn-carrinho">
            Ir para o Carrinho
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const produtos = ref([])
    const filtroCategoria = ref('')
    const produtosFiltrados = ref([])
    const mostrarPopup = ref(false)
    const route = useRoute()
    const router = useRouter()

    const carregarProdutos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'produtos'))
        produtos.value = querySnapshot.docs.map(doc => ({
          id: doc.id,
          nome: doc.data().nome || 'Sem nome',
          categoria: doc.data().categoria || 'Sem categoria',
          preco: doc.data().preco || 0,
          estado: doc.data().estado || 'Não especificado',
          descricao: doc.data().descricao || '',
          imagemBase64: doc.data().imagemBase64 || null
        }))
        aplicarFiltro()
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message)
        alert('Erro ao carregar produtos')
      }
    }

    const aplicarFiltro = () => {
      const termo = (route.query.busca || '').toLowerCase().trim()
      let filtrados = produtos.value

      if (filtroCategoria.value) {
        filtrados = filtrados.filter(p =>
          p.categoria.toLowerCase() === filtroCategoria.value.toLowerCase()
        )
      }
    
      if (termo) {
        filtrados = filtrados.filter(p =>
          p.nome.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo)
        )
      }
    
      produtosFiltrados.value = filtrados
    }

    const adicionarAoCarrinho = (produto) => {
      const produtoParaCarrinho = { ...produto }
      delete produtoParaCarrinho.imagemBase64 
      
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
      carrinho.push(produtoParaCarrinho)
      localStorage.setItem('carrinho', JSON.stringify(carrinho))
      mostrarPopup.value = true
    }

    const continuarComprando = () => {
      mostrarPopup.value = false
    }

    const irParaCarrinho = () => {
      mostrarPopup.value = false
      router.push('/carrinho')
    }

    onMounted(carregarProdutos)
    watch(() => route.query.busca, aplicarFiltro)
    watch(filtroCategoria, aplicarFiltro)

    return {
      produtosFiltrados,
      filtroCategoria,
      adicionarAoCarrinho,
      mostrarPopup,
      continuarComprando,
      irParaCarrinho
    }
  }
}
</script>

<style scoped>
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

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #1a1a1a;
  font-size: 2.2rem;
}

.filtros {
  margin-bottom: 30px;
  text-align: center;
}

.filtro-select {
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
  background-color: #f9f9f9;
  cursor: pointer;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
}

.produto-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

/* Responsividade */
@media (max-width: 900px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .produtos {
    grid-template-columns: 1fr;
  }
}

.produto-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.imagem-container {
  height: 200px;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.produto-imagem {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.sem-imagem {
  color: #999;
  font-size: 1rem;
}

.produto-info {
  padding: 15px;
}

.produto-info h3 {
  margin: 0 0 10px;
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
}

.descricao {
  color: #444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.add-cart-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ff6600;
  border: none;
  color: white;
  font-size: 1.2rem;
  padding: 6px 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  transition: background-color 0.3s;
}

.add-cart-btn:hover {
  background-color: #e55b00;
}

.popup-overlay {
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

.popup-content {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.popup-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.modal-botoes {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.btn-continuar, .btn-carrinho {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-continuar {
  background-color: #f0f0f0;
  color: #333;
}

.btn-continuar:hover {
  background-color: #ddd;
}

.btn-carrinho {
  background-color: #ff6600;
  color: white;
}

.btn-carrinho:hover {
  background-color: #e55b00;
}

@media (max-width: 768px) {
  .produtos {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .modal-botoes {
    flex-direction: column;
  }
}
</style>