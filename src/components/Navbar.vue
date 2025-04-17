<template>
    <nav class="navbar">
      <div class="logo">
        <router-link to="/">GearShop</router-link>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/sobre">Categorias</router-link></li>
        <li><router-link to="/contato">Contato</router-link></li>
        <li><router-link to="/categorias">Sobre Nós</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e1e1e;
    color: white;
    padding: 15px 30px;
  }
  
  .logo a {
    color: #ff9900;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
    gap: 20px;
  }
  
  .nav-links a {
    color: white;
    text-decoration: none;
    font-size: 16px;
  }
  
  .nav-links a:hover {
    color: #ff9900;
  }
  </style>
  