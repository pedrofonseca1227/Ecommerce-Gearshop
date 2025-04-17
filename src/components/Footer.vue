<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>GearShop</h3>
          <p>Acelerando sonhos, conectando peças.</p>
        </div>
  
        <div class="footer-section">
          <h4>Links Rápidos</h4>
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/categoria">Categorias</router-link></li>
            <li><router-link to="/contato">Contato</router-link></li>
            <li><router-link to="/sobre">Sobre Nós</router-link></li>
          </ul>
        </div>
  
        <div class="footer-section">
          <h4>Contato</h4>
          <p>Email: suporte@gearshop.com</p>
          <p>Telefone: (14) 99999-9999</p>
        </div>
      </div>
  
      <div class="footer-bottom">
        <p>&copy; 2025 GearShop. Todos os direitos reservados.</p>
      </div>
    </footer>
  </template>
  
  <style scoped>
  .footer {
    background-color: #1a1a1a;
    color: white;
    padding: 40px 20px 20px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex: 1;
    min-width: 200px;
  }
  
  .footer-section h3,
  .footer-section h4 {
    color: #ff6600;
    margin-bottom: 10px;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 8px;
  }
  
  .footer-section ul li a {
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section ul li a:hover {
    color: #ff6600;
  }
  
  .footer-bottom {
    text-align: center;
    margin-top: 30px;
    font-size: 0.9rem;
    border-top: 1px solid #333;
    padding-top: 15px;
  }
  </style>