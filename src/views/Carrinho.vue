<template>
    <div class="carrinho-container">
      <h2>🛒 Meu Carrinho</h2>
  
      <div v-if="carrinho.length === 0" class="vazio">
        Seu carrinho está vazio.
      </div>
  
      <div v-else>
        <div class="itens-carrinho">
          <div v-for="(produto, index) in carrinho" :key="index" class="item">
            <img :src="produto.imagem" alt="Produto" class="imagem-produto" />
            <div class="info">
              <h3>{{ produto.nome }}</h3>
              <p>R$ {{ formatarPreco(produto.preco) }}</p>
              <button @click="removerItem(index)">🗑️ Remover</button>
            </div>
          </div>
        </div>
  
        <div class="resumo">
          <h3>Resumo do Pedido</h3>
          <p>Total: <strong>R$ {{ totalCarrinho }}</strong></p>
          <button class="finalizar" @click="finalizarCompra">🛍️ Finalizar Compra</button>
        </div>
      </div>
  
      <!-- POPUP DE CONFIRMAÇÃO -->
      <div v-if="mostrarPopup" class="popup-overlay">
        <div class="popup">
          <h2>✅ Compra realizada com sucesso!</h2>
          <p>Muito obrigado por escolher a <strong>GearShop</strong>!</p>
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
        mostrarPopup: false
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
        return this.carrinho.reduce((total, item) => {
          let preco = parseFloat(
            String(item.preco).replace('R$', '').replace(',', '.')
          );
          return total + (isNaN(preco) ? 0 : preco);
        }, 0).toFixed(2).replace('.', ',');
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
  body {
    background-color: #f5f5f5;
  }
  
  .carrinho-container {
    max-width: 1000px;
    margin: 40px auto;
    background-color: #ffffff;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    font-family: 'Rajdhani', sans-serif;
  }
  
  h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 30px;
  }
  
  .vazio {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
    margin-top: 50px;
  }
  
  .itens-carrinho {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .item {
    display: flex;
    align-items: center;
    background-color: #fafafa;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease;
  }
  
  .item:hover {
    transform: scale(1.01);
  }
  
  .imagem-produto {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    object-fit: cover;
  }
  
  .info {
    margin-left: 20px;
    flex: 1;
  }
  
  .info h3 {
    margin: 0;
    font-size: 1.4rem;
  }
  
  .info p {
    color: #666;
    margin: 8px 0;
    font-weight: bold;
  }
  
  .info button {
    background-color: #ff4d4d;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .info button:hover {
    background-color: #e60000;
  }
  
  .resumo {
    text-align: right;
    margin-top: 30px;
    border-top: 1px solid #ddd;
    padding-top: 20px;
  }
  
  .resumo h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .finalizar {
    background-color: black;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 1.1rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .finalizar:hover {
    background-color: #333;
  }
  
  /* POPUP */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .popup {
    background-color: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    max-width: 400px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
  
  .popup h2 {
    margin-bottom: 10px;
  }
  
  .popup button {
    margin-top: 20px;
    background-color: #000;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .popup button:hover {
    background-color: #333;
  }
  </style>
  