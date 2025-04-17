<template>
    <div class="home">
      <section class="hero">
        <h1>Bem-vindo à GearShop</h1>
        <p>Seu marketplace exclusivo para peças automotivas.</p>
        <router-link to="/categorias" class="btn">Ver Categorias</router-link>
      </section>
    </div>
  </template>
  
  <style scoped>
  .home {
    text-align: center;
    padding: 50px 20px;
    background-color: #f3f3f3;
    min-height: 70vh;
  }
  
  .hero h1 {
    font-size: 36px;
    color: #1e1e1e;
  }
  
  .hero p {
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  
  .btn {
    background-color: #ff9900;
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    transition: 0.3s;
  }
  
  .btn:hover {
    background-color: #e68600;
  }
  </style>
  