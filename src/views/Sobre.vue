<template>
    <div class="about-us">
      <div class="content">
        <h1>Sobre a GearShop</h1>
        <p>
          É com grande entusiasmo que apresentamos a GearShop, uma empresa que nasceu com a missão de conectar
          apaixonados por carros, mecânicos e motoristas, oferecendo uma experiência simples e eficiente na busca pela
          peça certa para cada veículo. Nosso objetivo é proporcionar uma jornada sem complicação, onde a busca pela
          peça ideal vai além de um simples conserto – ela é uma oportunidade de reviver memórias, manter uma paixão
          ou dar nova vida a um projeto especial.
        </p>
        <p>
          Acreditamos que cada veículo tem uma história única e que, ao encontrar a peça certa, podemos contribuir para a
          continuidade dessa trajetória. A GearShop se compromete a tornar esse processo mais fácil, acessível e seguro,
          para que nossos clientes possam focar no que realmente importa: seu amor pelos carros e o prazer de vê-los
          como sonhados.
        </p>
      </div>
    </div>
  </template>
  
  <style scoped>
  .about-us {
    background-color: #fafafa; 
    color: #333; 
    padding: 80px 20px; 
    font-family: 'Rajdhani', sans-serif;
  }
  
  .content {
    background-color: white;
    border-radius: 10px; 
    max-width: 900px;
    margin: 0 auto;
    padding: 40px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
  }
  
  h1 {
    text-align: center;
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 30px;
    font-weight: 700;
    letter-spacing: 1px; 
  }
  
  p {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 20px;
    text-align: justify; 
  }
  
  @media (max-width: 768px) {
    .content {
      padding: 30px;
    }
  
    h1 {
      font-size: 2rem;
    }
  
    p {
      font-size: 1rem;
    }
  }
  </style>
  