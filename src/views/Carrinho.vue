<template>
  <div class="checkout-container">
    <!-- Lista de Produtos -->
    <div class="produtos">
      <h2>🛒 Itens no Carrinho</h2>
      <div v-if="carrinho.length === 0" class="vazio">Seu carrinho está vazio.</div>
      <div v-else class="produtos-lista">
        <div v-for="(produto, index) in carrinho" :key="index" class="produto-card">
          <img v-if="produto.imagemBase64" :src="produto.imagemBase64" alt="Produto" />
          <div class="info">
            <h4>{{ produto.nome }}</h4>
            <p>R$ {{ formatarPreco(produto.preco) }}</p>
            <button @click="removerItem(index)">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagamento -->
    <div class="pagamento">
      <h2>💳 Pagamento</h2>

      <!-- Seletor de método -->
      <div class="metodo-pagamento">
        <label>
          <input type="radio" value="cartao" v-model="metodoSelecionado" /> Cartão
        </label>
        <label>
          <input type="radio" value="pix" v-model="metodoSelecionado" /> PIX
        </label>
      </div>

      <!-- Formulário de Cartão -->
      <form v-if="metodoSelecionado === 'cartao'" @submit.prevent="finalizarCompra">
        <input type="text" placeholder="Nome no cartão" required />
        <input type="text" placeholder="Número do cartão" maxlength="19" required />
        <div class="linha">
          <input type="text" placeholder="Validade (MM/AA)" required />
          <input type="text" placeholder="CVV" maxlength="3" required />
        </div>
        <p class="total">Total: <strong>R$ {{ totalCarrinho }}</strong></p>
        <button type="submit">Finalizar Compra</button>
      </form>

      <!-- Pagamento via PIX -->
      <div v-if="metodoSelecionado === 'pix'" class="pix-container">
        <img src="../assets/img/frame.png" alt="QR Code PIX" class="qr-code" />
        <p>Escaneie o QR Code com seu app de banco para finalizar o pagamento.</p>
        <p class="total">Total: <strong>R$ {{ totalCarrinho }}</strong></p>
        <button @click="finalizarCompra">Confirmar Pagamento PIX</button>
      </div>
    </div>

    <!-- Popup de Sucesso -->
    <div v-if="mostrarPopup" class="popup-overlay">
      <div class="popup">
        <h2>✅ Compra realizada com sucesso!</h2>
        <p>Obrigado por comprar na <strong>GearShop</strong>!</p>
        <button @click="fecharPopup">Fechar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Carrinho',
  data() {
    return {
      carrinho: [],
      mostrarPopup: false,
      metodoSelecionado: 'cartao'
    }
  },
  mounted() {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      this.carrinho = JSON.parse(carrinhoSalvo);
    }
  },
  computed: {
    totalCarrinho() {
      return this.carrinho
        .reduce((total, item) => {
          let preco = parseFloat(
            String(item.preco).replace('R$', '').replace(',', '.')
          );
          return total + (isNaN(preco) ? 0 : preco);
        }, 0)
        .toFixed(2)
        .replace('.', ',');
    }
  },
  methods: {
    formatarPreco(valor) {
      return Number(
        String(valor).replace('R$', '').replace(',', '.')
      ).toFixed(2).replace('.', ',');
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    },
    finalizarCompra() {
      this.mostrarPopup = true;
      this.carrinho = [];
      localStorage.removeItem('carrinho');
    },
    fecharPopup() {
      this.mostrarPopup = false;
    }
  }
}
</script>

<style scoped>
.checkout-container {
  display: flex;
  align-items: flex-start; /* ← Deixa cada coluna com sua própria altura */
  gap: 40px;
  padding: 40px;
  max-width: 1200px;
  margin: auto;
  font-family: 'Rajdhani', sans-serif;
}

.produtos, .pagamento {
  flex: 1;
  background-color: #fff;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  /* Removido o min-height para evitar conflito visual */
}

.produtos-lista {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.produto-card {
  display: flex;
  align-items: center;
  background: #f9f9f9;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  min-height: 100px; /* Garante altura mínima estável */
}

.produto-card img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 20px;
}

.produto-card .info {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  padding-right: 10px; /* Adiciona um espaço para evitar aperto */
}

.produto-card h4,
.produto-card p {
  white-space: nowrap; 
  overflow: hidden;         
  text-overflow: ellipsis;   
  max-width: 180px;         
}

.produto-card button {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #ff4d4d;
}

.pagamento form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.pagamento input,
.pagamento select {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.pagamento .linha {
  display: flex;
  gap: 10px;
}

.total {
  margin-top: 10px;
  font-size: 1.2rem;
}

.pagamento button {
  margin-top: 10px;
  padding: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: black;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.pagamento button:hover {
  background-color: #333;
}

.popup-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.popup {
  background: white;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.pix-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.pix-container img {
  width: 200px;
  height: 200px;
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #f5f5f5;
}
</style>
