<template>
    <div class="categorias">
      <h1>Categorias de Peças</h1>
  
      <!-- Barra de Pesquisa -->
      <div class="search-filter">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Buscar peça..." 
          />
        </div>
  
        <!-- Filtro de Categorias -->
        <select v-model="selectedCategory" class="category-select">
          <option value="">Todas as Categorias</option>
          <option value="motor">Motor</option>
          <option value="suspensao">Suspensão</option>
          <option value="freios">Freios</option>
          <option value="eletrica">Elétrica</option>
          <option value="carroceria">Carroceria</option>
          <option value="rodas">Rodas e Pneus</option>
        </select>
      </div>
  
      <!-- Lista de Cards -->
      <div class="cards-container">
        <div 
          v-for="(item, index) in filteredItems" 
          :key="index" 
          class="card"
        >
          <img :src="item.image" alt="Imagem da peça" class="card-image"/>
          <div class="card-info">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <span class="price">R$ {{ item.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const items = [
    { name: "Motor V8", description: "Potente para alta performance", price: 1000, category: "motor", image: "/assets/img/peça1.jpg" },
    { name: "Suspensão Esportiva", description: "Ideal para pista", price: 500, category: "suspensao", image: "/assets/img/peça2.jpg" },
    { name: "Pastilhas de Freio", description: "Segurança nas curvas", price: 200, category: "freios", image: "/assets/img/peça3.jpg" },
    { name: "Faróis LED", description: "Melhore a visibilidade", price: 150, category: "eletrica", image: "/assets/img/peça4.jpg" },
    { name: "Parachoque Traseiro", description: "Design agressivo", price: 800, category: "carroceria", image: "/assets/img/peça5.jpg" },
    { name: "Pneu Michelin", description: "Alta durabilidade", price: 350, category: "rodas", image: "/assets/img/peça6.jpg" }
  ];
  
  const searchQuery = ref('');
  const selectedCategory = ref('');
  
  const filteredItems = computed(() => {
    return items.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const matchCategory = selectedCategory.value ? item.category === selectedCategory.value : true;
      return matchSearch && matchCategory;
    });
  });
  </script>
  
  <style scoped>
  .categorias {
    padding: 50px 20px;
    background-color: #f4f4f4;
    color: white;
    text-align: center;
    font-family: 'Rajdhani', sans-serif;
  }
  
  h1 {
    font-size: 36px;
    color: #ff6600;
    margin-bottom: 30px;
  }
  
  /* Search and Filter */
  .search-filter {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  
  .search-bar {
    background: #f4f4f4;
    border: 1px solid #333;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    width: 300px;
  }
  
  .search-bar i {
    color: #888;
    margin-right: 10px;
  }
  
  .search-bar input {
    border: none;
    background: transparent;
    color: #333;
    width: 100%;
    font-size: 16px;
    outline: none;
  }
  
  .category-select {
    padding: 10px;
    border-radius: 8px;
    background-color: #f4f4f4;
    border: 1px solid #333;
    color: #333;
    font-size: 16px;
    cursor: pointer;
  }
  
  .category-select option {
    background-color: #1e1e1e;
    color: white;
  }
  
  /* Cards */
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    padding: 0 20px;
  }
  
  .card {
    background-color: #1e1e1e;
    border: 2px solid #ff6600;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 10px rgba(255, 102, 0, 0.2);
  }
  
  .card:hover {
    transform: scale(1.03);
  }
  
  .card-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  
  .card-info {
    padding: 15px;
    color: white;
  }
  
  .card-info h3 {
    margin: 0 0 10px;
    font-size: 20px;
    color: #ff6600;
  }
  
  .card-info p {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .price {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }
  </style>
  