<template>
  <div v-if="produto" class="pagina-produto">
    <div class="imagem-topo">
      <img 
        v-if="produto.imagemBase64" 
        :src="produto.imagemBase64" 
        :alt="produto.nome"
        class="imagem-principal"
      />
      <div v-else class="sem-imagem">
        <span>📷 Sem imagem</span>
      </div>
    </div>

    <div class="detalhes-produto">
      <h1 class="titulo-produto">{{ produto.nome }}</h1>
      <p class="preco-produto">R$ {{ produto.preco.toFixed(2) }}</p>
      <p class="categoria-produto">{{ produto.categoria }}</p>
      <p class="estado-produto">Estado: {{ produto.estado }}</p>

      <div class="descricao-produto">
        <h3>Descrição</h3>
        <p>{{ produto.descricao }}</p>
      </div>

      <div class="vendedor-info-bloco">
        <h3>Vendedor</h3>
        <div class="vendedor-info">
          <i class="bi bi-person-circle"></i>
          <div>
            <p class="vendedor-nome">{{ vendedorUsername }}</p>
            <p v-if="produto.telefone" class="vendedor-contato">
              <i class="bi bi-telephone"></i> {{ produto.telefone }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="mostrarPopup" class="popup-overlay">
        <div class="popup-content">
          <p>✅ Produto adicionado ao carrinho!</p>
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

      <button @click="adicionarAoCarrinho" class="btn-comprar">
        🛒 Adicionar ao Carrinho
      </button>
    </div>
  </div>

  <div v-else class="carregando">
    <p>Carregando produto...</p>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '@/firebase';

const route = useRoute();
const router = useRouter();
const produto = ref(null);
const vendedorUsername = ref('');
const db = getFirestore(app);
const auth = getAuth();
const mostrarPopup = ref(false);


const carregarProdutoEVendedor = async () => {
  try {
    const produtoRef = doc(db, 'produtos', route.params.id);
    const produtoSnap = await getDoc(produtoRef);
    
    if (!produtoSnap.exists()) {
      router.push('/');
      return;
    }

    produto.value = { 
      id: produtoSnap.id, 
      ...produtoSnap.data() 
    };

    if (produto.value.usuarioId) {

      try {
        const userDoc = await getDoc(doc(db, 'usuarios', produto.value.usuarioId));
        if (userDoc.exists()) {
          vendedorUsername.value = userDoc.data().username || 'Usuário';
        }
      } catch (error) {
        console.error('Erro ao carregar vendedor:', error);
      }

      const userDoc = await getDoc(doc(db, 'usuarios', produto.value.usuarioId));
      if (userDoc.exists()) {
        vendedorUsername.value = userDoc.data().username || 'Usuário';
      }

    }

  } catch (error) {
    console.error('Erro ao carregar produto:', error);
    router.push('/');
  }
};

const adicionarAoCarrinho = () => {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const produtoParaCarrinho = {
    id: produto.value.id,
    nome: produto.value.nome,
    preco: produto.value.preco,
    imagemBase64: produto.value.imagemBase64
  };
  carrinho.push(produtoParaCarrinho);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  mostrarPopup.value = true;
};

const continuarComprando = () => {
  mostrarPopup.value = false;
    router.push('/categoria');

};

const irParaCarrinho = () => {
  mostrarPopup.value = false;
  router.push('/carrinho');
};

onMounted(() => {
  carregarProdutoEVendedor();
});

</script>

<style scoped>
.pagina-produto {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
}

.imagem-topo {
  width: 100%;
  height: 400px;
  margin-top: 90px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.imagem-principal {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border: #efe4e49b 1px solid;
  border-radius: 10px;
}

.detalhes-produto {
  padding: 20px;
  border: #efe4e49b 1px solid;
  border-radius: 10px;
}

.titulo-produto {
  font-size: 2rem;
  margin-bottom: 10px;
}

.preco-produto {
  font-size: 1.8rem;
  color: #ff6600;
  font-weight: bold;
  margin-bottom: 10px;
}

.categoria-produto {
  background-color: #f0f0f0;
  display: inline-block;
  padding: 6px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.estado-produto {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.descricao-produto {
  margin-top: 20px;
  margin-bottom: 20px;
}

.vendedor-info-bloco {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.vendedor-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.vendedor-info i {
  font-size: 2rem;
  color: #ff6600;
}

.vendedor-nome {
  font-weight: bold;
}

.vendedor-contato {
  color: #666;
  font-size: 0.9rem;
}

.btn-comprar {
  width: 100%;
  background-color: #ff6600;
  color: white;
  border: none;
  padding: 15px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-comprar:hover {
  background-color: #e55b00;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
}

.popup-content {
  background: #fff;
  padding: 30px;
  border-radius: 16px;
  border: 2px solid #ff6600; /* borda laranja */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  animation: slideUp 0.3s ease-out;
  text-align: center;
  max-width: 400px;
  width: 90%;
}

.popup-content p {
  margin-bottom: 20px;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.modal-botoes {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-continuar,
.btn-carrinho {
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.btn-continuar {
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
}

.btn-continuar:hover {
  background-color: #e0e0e0;
}

.btn-carrinho {
  background-color: #ff6600;
  color: #fff;
  border: 1px solid #e65c00;
}

.btn-carrinho:hover {
  background-color: #e65c00;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.carregando {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .imagem-topo {
    height: 250px;
  }

  .titulo-produto {
    font-size: 1.5rem;
  }

  .preco-produto {
    font-size: 1.5rem;
  }

  .btn-comprar {
    font-size: 1rem;
  }
}

</style>
