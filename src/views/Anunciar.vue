<template>
    <div class="anunciar-container">
      <h1>📢 Anuncie sua Peça</h1>
      <p class="subtitle">Preencha os dados abaixo e conecte sua peça a quem realmente precisa.</p>
      <form class="anuncio-form">
        <div class="form-group">
          <label for="nome">Nome da Peça</label>
          <input id="nome" type="text" placeholder="Ex: Motor 1.6 Flex" required />
        </div>
  
        <div class="form-group">
          <label for="categoria">Categoria</label>
          <select id="categoria">
            <option value="" disabled selected>Selecione uma categoria</option>
            <option>Motor</option>
            <option>Suspensão</option>
            <option>Freios</option>
            <option>Elétrica</option>
            <option>Carroceria</option>
            <option>Rodas e Pneus</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="imagem">Foto da Peça</label>
          <input id="imagem" type="file" />
        </div>
  
        <div class="form-group-inline">
          <div class="form-group">
            <label for="preco">Preço (R$)</label>
            <input id="preco" type="number" placeholder="Ex: 150" required />
          </div>
  
          <div class="form-group">
            <label for="estado">Estado da Peça</label>
            <select id="estado">
              <option value="" disabled selected>Selecione</option>
              <option>Nova</option>
              <option>Usada</option>
            </select>
          </div>
        </div>
  
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" rows="4" placeholder="Detalhes adicionais sobre a peça..."></textarea>
        </div>
  
        <button type="submit">📤 Publicar Anúncio</button>
      </form>
    </div>
  </template>
  
  <style scoped>
  .anunciar-container {
    max-width: 700px;
    margin: 100px auto 50px;
    padding: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    font-family: 'Rajdhani', sans-serif;
  }
  
  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 10px;
    color: #1a1a1a;
  }
  
  .subtitle {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 30px;
    color: #666;
  }
  
  .anuncio-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
  }
  
  .form-group-inline {
    display: flex;
    gap: 20px;
  }
  
  .form-group-inline .form-group {
    flex: 1;
  }
  
  label {
    margin-bottom: 6px;
    font-weight: 600;
    color: #333;
  }
  
  input[type="text"],
  input[type="number"],
  input[type="file"],
  select,
  textarea {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    background-color: #f9f9f9;
    transition: border-color 0.2s;
  }
  
  input:focus,
  select:focus,
  textarea:focus {
    border-color: #ff6600;
    outline: none;
  }
  
  button {
    padding: 12px;
    background-color: #ff6600;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #e05500;
  }
  </style>
  