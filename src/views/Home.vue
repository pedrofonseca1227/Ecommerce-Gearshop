<template>
  <div class="home-page">
    <section class="galeria-carrossel">
      <div class="carrossel">
        <div class="carrossel-track" :style="{ transform: `translateX(-${indiceAtual * 100}%)` }">
          <img v-for="(img, index) in banners" :key="index" :src="img" alt="Imagem da galeria" />
        </div>
      </div>
    </section>
    <section class="welcome-section">
      <div class="home-banner">
        <img src="@/assets/img/Logo.png" alt="Logo GearShop" class="home-logo" />
      </div>
      <h1>Bem-vindo à GearShop</h1>
      <h3>Acelerando sonhos sobre quatro rodas</h3>
    </section>
    <section class="info-strip">
      <div class="info-box">
        <i class="bi bi-geo-alt-fill icon"></i>
        <p><strong>Encontre uma peça que pode estar do lado da sua casa</strong></p>
      </div>
      <div class="info-box">
        <i class="bi bi-tools icon"></i>
        <p><strong>Ache aquela peça que você precisa para seu carro e acabe com a dor de cabeça</strong></p>
      </div>
      <div class="info-box">
        <i class="bi bi-credit-card-2-front-fill icon"></i>
        <p><strong>Temos várias formas de pagamento pra você</strong></p>
      </div>
    </section>

    <!-- Peças em destaque -->
    <section class="destaques">
      <h2>Peças em destaque</h2>
      <div class="cards-container">
        <div class="card" v-for="produto in produtosBaratos" :key="produto.id"
        @click="verDetalhes(produto.id)">
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
          <h3>{{ produto.nome }}</h3>
          <p class="descricao">{{ produto.descricao }}</p>
          <span class="preco">R$ {{ Number(produto.preco).toFixed(2) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { app } from '@/firebase';

import banner2 from '@/assets/img/banner2.jpg';
import banner3 from '@/assets/img/banner3.jpg';
import banner4 from '@/assets/img/banner4.jpg';
import banner5 from '@/assets/img/banner5.jpg';

const banners = [banner2, banner3, banner4, banner5];
const indiceAtual = ref(0);
const router = useRouter();
let intervalo = null;

// Carrossel automático
onMounted(() => {
  intervalo = setInterval(() => {
    indiceAtual.value = (indiceAtual.value + 1) % banners.length;
  }, 3000);
});

onUnmounted(() => {
  clearInterval(intervalo);
});

// Firestore: buscar 3 produtos mais baratos
const db = getFirestore(app);
const produtosBaratos = ref([]);

const buscarProdutosMaisBaratos = async () => {
  try {
    const produtosRef = collection(db, 'produtos');
    const q = query(produtosRef, orderBy('preco', 'asc'), limit(3));
    const querySnapshot = await getDocs(q);
    produtosBaratos.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      nome: doc.data().nome || 'Sem nome',
      preco: doc.data().preco || 0,
      descricao: doc.data().descricao || 'Sem descrição',
      imagemBase64: doc.data().imagemBase64 || null
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
  }
};

onMounted(() => {
  buscarProdutosMaisBaratos();
});
const verDetalhes = (produtoId) => {
  router.push(`/produto/${produtoId}`);
};
</script>

<style scoped>
.home-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f4f4;
  color: #1a1a1a;
  padding-top: 10px; /* Evita que o conteúdo fique atrás da navbar */
}

/* Carroussel */

.galeria-carrossel {
width: 100vw;
margin-top: 40px;
padding: 0;
background-color: #000;
overflow: hidden;
}

.carrossel {
width: 100%;
overflow: hidden;
height: 300px; /* você pode ajustar a altura */
position: relative;
}

.carrossel-track {
display: flex;
transition: transform 1s ease-in-out;
width: 100%;
}

.carrossel img {
width: 100%;
height: 100%;
object-fit: cover;
border: none;
flex-shrink: 0;
}

/* Boas-vindas */
.home-logo {
  display: block;
  margin: auto;
  max-width: 300px;
}

.home-banner {
  text-align: center;
  padding: 0px 100px; /* ajustando o espaço ao redor da logo */
}
.welcome-section {
  text-align: center;
  padding: 30px 20px;
  background-color: #000000;
}

.welcome-section h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: #fff;
}

.welcome-section h3 {
  font-size: 1.5rem;
  color: #ff6600;
}

/* Faixa com ícones */
.info-strip {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1a1a1a;
  padding: 40px 20px;
  color: white;
  border-top: 4px solid orange;
  border-bottom: 4px solid orange;
  flex-wrap: wrap;
}

.info-box {
  text-align: center;
  width: 300px;
  margin: 20px;
}

.icon {
  font-size: 40px;
  color: orange;
  margin-bottom: 15px;
}

/* DEstaques */

.destaques {
padding: 50px 20px;
background-color: #fff;
text-align: center;
}

.destaques h2 {
font-size: 2rem;
color: #ff6600;
margin-bottom: 30px;
}

.cards-container {
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 30px;
}

.card {
background-color: #f4f4f4;
border-radius: 12px;
box-shadow: 0 4px 8px rgba(0,0,0,0.1);
padding: 20px;
max-width: 250px;
transition: transform 0.3s;
}

.card:hover {
transform: scale(1.05);
}

.card img {
width: 100%;
height: 150px;
object-fit: contain;
margin-bottom: 15px;
}

.card h3 {
font-size: 1.1rem;
color: #333;
margin-bottom: 5px;
}

.card p {
font-size: 0.9rem;
color: #777;
margin-bottom: 10px;
}

.card .preco {
font-weight: bold;
color: #ff6600;
font-size: 1.1rem;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
}

.card {
  background-color: #f4f4f4;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  width: 250px;
  transition: transform 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.imagem-container {
  height: 150px;
  width: 100%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border-radius: 8px;
  overflow: hidden;
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

.descricao {
  font-size: 0.9rem;
  color: #777;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.preco {
  font-weight: bold;
  color: #ff6600;
  font-size: 1.1rem;
  display: block;
}

</style>
