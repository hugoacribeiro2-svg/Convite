// O teu link do Google Sheets já está aqui configurado:
const GOOGLE_APP_URL = "https://script.google.com/macros/s/AKfycby67mgHHtlA0V-fER_IZEARWqYPI5Owd-SWVvWSQ59AiT4cFIahUErWITIFB7GfISkP-Q/exec";

document.addEventListener("DOMContentLoaded", function() {
  const target = document.querySelector('#convite-target');
  const video = document.querySelector('#holograma');
  const uiContainer = document.querySelector('#ui-container');
  
  const rsvpButtons = document.querySelector('#rsvp-buttons'); // Adicionei esta definição que faltava
  const btnConfirmar = document.querySelector('#btn-confirmar');
  const btnRejeitar = document.querySelector('#btn-rejeitar');
  const formLogistica = document.querySelector('#form-logistica');
  const btnEnviar = document.querySelector('#btn-enviar');

  // 1. Quando o convite é ENCONTRADO
  target.addEventListener("targetFound", event => {
    console.log("Convite detetado!");
    video.play();
    uiContainer.classList.remove("hidden"); // Mostra a interface
  });

  // 2. Quando o convite é PERDIDO
  target.addEventListener("targetLost", event => {
    console.log("Convite perdido...");
    video.pause();
    // Opcional: Se quiseres que os botões sumam quando tiras a câmara, descomenta a linha abaixo:
    // uiContainer.classList.add("hidden");
  });

  // 3. Clicou em "Vou com certeza"
  btnConfirmar.addEventListener("click", () => {
    rsvpButtons.classList.add("hidden"); // Esconde os primeiros botões
    formLogistica.classList.remove("hidden"); // Mostra o formulário
  });

  // 4. Clicou em "Não poderei ir"
  btnRejeitar.addEventListener("click", () => {
    rsvpButtons.innerHTML = "<h3>Sentiremos a tua falta! Obrigado por avisares.</h3>";
    // Aqui podias enviar também para o Google Sheets a dizer "Não vai" se quisesses
  });

  // 5. Enviar o Formulário
  btnEnviar.addEventListener("click", () => {
    const nome = document.querySelector('#nome').value;
    const prato = document.querySelector('#prato').value;
    const alergias = document.querySelector('#alergias').value;

    if(nome === "") {
      alert("Por favor, escreve o teu nome.");
      return;
    }

    btnEnviar.innerText = "A enviar...";
    btnEnviar.disabled = true;

    fetch(GOOGLE_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome,
        presenca: "Confirmada",
        prato: prato,
        alergias: alergias,
        data: new Date().toLocaleString()
      })
    }).then(() => {
      formLogistica.innerHTML = "<h3 style='color: green;'>Obrigado! A tua presença foi confirmada. 🎉</h3>";
    }).catch(error => {
      console.error(error);
      alert("Erro ao enviar. Tenta novamente.");
      btnEnviar.innerText = "Enviar Confirmação";
      btnEnviar.disabled = false;
    });
  });
});
