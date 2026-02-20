document.addEventListener("DOMContentLoaded", function() {
  const sceneEl = document.querySelector('a-scene');
  const arSystem = sceneEl.systems["mindar-image-system"];
  
  const startScreen = document.querySelector('#start-screen');
  const btnStart = document.querySelector('#btn-start');
  
  const target = document.querySelector('#convite-target');
  const video = document.querySelector('#holograma');
  
  const uiContainer = document.querySelector('#ui-container');
  const rsvpButtons = document.querySelector('#rsvp-buttons');
  const formLogistica = document.querySelector('#form-logistica');
  
  const btnConfirmar = document.querySelector('#btn-confirmar');
  const btnRejeitar = document.querySelector('#btn-rejeitar');
  const btnEnviar = document.querySelector('#btn-enviar');

  // 1. CLIQUE PARA INICIAR (Resolve o ecrã preto)
  btnStart.addEventListener("click", () => {
    // Esconde o ecrã de início
    startScreen.style.display = "none";
    
    // Tenta dar play e pause logo de seguida para "aquecer" o vídeo
    video.play();
    video.pause();
    
    // Inicia a câmara AR
    arSystem.start(); 
  });

  // 2. Quando o convite aparece
  target.addEventListener("targetFound", () => {
    console.log("Encontrado!");
    video.currentTime = 0; // Volta ao início
    video.play();
    uiContainer.classList.remove("hidden");
  });

  // 3. Quando o convite desaparece
  target.addEventListener("targetLost", () => {
    console.log("Perdido!");
    video.pause();
    // uiContainer.classList.add("hidden"); // Comenta esta linha se quiseres que os botões fiquem
  });

  // 4. Navegação dos Botões
  btnConfirmar.addEventListener("click", () => {
    rsvpButtons.classList.add("hidden");
    formLogistica.classList.remove("hidden");
  });

  btnRejeitar.addEventListener("click", () => {
    rsvpButtons.innerHTML = "<h3>Obrigado por avisares!</h3>";
  });

  // 5. Enviar (Sem Google Sheets, apenas visual)
  btnEnviar.addEventListener("click", () => {
    const nome = document.querySelector('#nome').value;
    
    if(nome === "") {
      alert("Escreve o teu nome, por favor.");
      return;
    }

    // Simula o envio
    btnEnviar.innerText = "A enviar...";
    setTimeout(() => {
      formLogistica.innerHTML = `
        <h3 style='color: #d4af37;'>✨ Confirmado! ✨</h3>
        <p>Obrigado, ${nome}.<br>Ficamos à tua espera!</p>
      `;
    }, 1000);
  });
});
