// URL do Google Apps Script (Tens de substituir pelo teu link depois de publicares o script)
const GOOGLE_APP_URL = "COLA_AQUI_O_TEU_LINK_DO_GOOGLE_SCRIPT";

document.addEventListener("DOMContentLoaded", function() {
  const target = document.querySelector('#convite-target');
  const video = document.querySelector('#holograma');
  const uiContainer = document.querySelector('#ui-container');
  
  const btnConfirmar = document.querySelector('#btn-confirmar');
  const formLogistica = document.querySelector('#form-logistica');
  const btnEnviar = document.querySelector('#btn-enviar');

  // Quando o convite físico é detetado na câmara
  target.addEventListener("targetFound", event => {
    video.play(); // Inicia o vídeo
    uiContainer.classList.remove("hidden"); // Mostra os botões de RSVP
  });

  // Quando o convite sai da câmara
  target.addEventListener("targetLost", event => {
    video.pause();
    uiContainer.classList.add("hidden");
  });

  // Ação: Clicou em Confirmar
  btnConfirmar.addEventListener("click", () => {
    document.querySelector('#rsvp-buttons').classList.add("hidden");
    formLogistica.classList.remove("hidden");
  });

  // Ação: Enviar Formulário
  btnEnviar.addEventListener("click", () => {
    const nome = document.querySelector('#nome').value;
    const prato = document.querySelector('#prato').value;
    const alergias = document.querySelector('#alergias').value;

    btnEnviar.innerText = "A enviar...";

    // Enviar dados para o Google Sheets (Backend)
    fetch(GOOGLE_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nome,
        presenca: "Confirmada",
        prato: prato,
        alergias: alergias
      })
    }).then(() => {
      formLogistica.innerHTML = "<h3>Obrigado! A tua presença foi confirmada.</h3>";
    }).catch(error => {
      alert("Erro ao enviar. Tenta novamente.");
      btnEnviar.innerText = "Enviar Confirmação";
    });
  });
});
