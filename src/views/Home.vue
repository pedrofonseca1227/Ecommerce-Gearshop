<template>
    <div class="home-page">
  
      <!-- Banner -->
        <div class="banner-container">
            <img src="@/assets/img/banner1.jpg" alt="Banner" class="banner-image" />
        </div>
      
        <!-- Boas-vindas -->
        <section class="welcome-section">
            <div class="home-banner">
                <img src="@/assets/img/Logo.png" alt="Logo GearShop" class="home-logo" />
            </div>
            <h1>Bem-vindo à GearShop</h1>
            <h3>Acelerando sonhos sobre quatro rodas</h3>
        </section>
      
        <!-- Faixa de destaques -->
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
        <section class="destaques">
            <h2>Principais Peças Vendidas</h2>
            <div class="cards-container">
                <div class="card">
                    <img src="#" alt="Peça 1" />
                    <h3>Amortecedor Dianteiro</h3>
                    <p>Volkswagen Gol 2010</p>
                    <span class="preco">R$ 150,00</span>
                </div>
                <div class="card">
                    <img src="#" alt="Peça 2" />
                    <h3>Farol Esquerdo</h3>
                    <p>Fiat Palio 2015</p>
                  <span class="preco">R$ 230,00</span>
                </div>
                <div class="card">
                    <img src="#" alt="Peça 3" />
                    <h3>Roda de Liga Leve</h3>
                    <p>Chevrolet Onix</p>
                    <span class="preco">R$ 320,00</span>
                </div>
            </div>
        </section>
    </div>
  </template>
  
  <style scoped>
  .home-page {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f4f4;
    color: #1a1a1a;
    padding-top: 10px; /* Evita que o conteúdo fique atrás da navbar */
  }
  
  /* Banner */
  .banner-container {
    width: 100%;
    overflow: hidden;
  }
  
  .banner-image {
    width: 100%;
    max-height: 1150px;
    object-fit: cover;
    border-bottom: 4px solid orange;
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
    background-color: #ffffff;
  }
  
  .welcome-section h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    color: #1a1a1a;
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

  </style>
  