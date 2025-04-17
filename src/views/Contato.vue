<template>
  <div class="contato">
    <h1>Contato</h1>
    <p>Fale conosco para dúvidas, sugestões ou parcerias:</p>
    <form>
      <input type="text" placeholder="Seu nome" /><br />
      <input type="email" placeholder="Seu email" /><br />
      <textarea placeholder="Sua mensagem"></textarea><br />
      <button type="submit">Enviar</button>
    </form>
  </div>
</template>

<style scoped>
.contato {
  padding: 70px;
  max-width: 600px;
  margin: auto;
}
input, textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  background-color: #ff9900;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #e68600;
}
</style>
