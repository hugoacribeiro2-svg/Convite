document.addEventListener("DOMContentLoaded", function() {
  const startScreen = document.querySelector('#start-screen');
  const btnStart = document.querySelector('#btn-start');
  const uiContainer = document.querySelector('#ui-container');
  
  const video = document.querySelector('#holograma');
  const target = document.querySelector('#convite-target');
  const sceneEl = document.querySelector('a-scene');

  // 1. Ao clicar no botão INICIAR
  btnStart.addEventListener("click", () => {
    startScreen.style.display = "none";
    
    // Forçar o vídeo a "acordar" (Play e Pause rápido)
    video.play();
    video.pause();
    
    // Iniciar o AR
    sceneEl.systems["mindar-image-system"].start();
  });

  // 2. Quando encontra o convite
  target.addEventListener("targetFound", () => {
    console.log("Convite encontrado! A tentar reproduzir vídeo...");
    
    // Tenta reproduzir
    var playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.then(_ => {
        console.log("Vídeo a reproduzir com sucesso!");
        uiContainer.classList.remove("hidden");
      })
      .catch(error => {
        console.log("Erro ao reproduzir: " + error);
        // Se der erro, tentamos reproduzir sem som (os telemóveis bloqueiam som automático)
        video.muted = true;
        video.play();
      });
    }
  });

  target.addEventListener("targetLost", () => {
    video.pause();
  });
});
