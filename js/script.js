// Variáveis globais para o leitor de QR e o estado de leitura
let html5QrCode;
let isScanning = false;

// Função executada quando um QR code é lido com sucesso
function onScanSuccess(decodedText, decodedResult) {
  // Expressão regular para validar um ID de 5 dígitos numéricos
  const regex = /^\d{5}$/;
  const idDetectado = decodedText.trim();

  if (regex.test(idDetectado)) {
    // Se o QR lido contém um ID válido, redireciona para o questionário
    const questionarioUrl = "https://meuquestionario.typeform.com/to/xyz123?ID=" + idDetectado;
    window.location.href = questionarioUrl;
  } else {
    console.error("QR Code lido não contém um ID válido de 5 dígitos:", decodedText);
  }
}

// Inicia o leitor de QR ao clicar no botão "Iniciar Leitura"
document.getElementById("start").addEventListener("click", function() {
  if (!isScanning) {
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
      { facingMode: "environment" }, // Tenta usar a câmera traseira
      {
        fps: 10,                        // Taxa de quadros de 10 fps
        qrbox: { width: 250, height: 250 }
      },
      onScanSuccess
    ).then(() => {
      isScanning = true;
      console.log("Leitura iniciada.");
    }).catch(err => {
      console.error("Erro ao iniciar a leitura:", err);
    });
  }
});

// Para a leitura ao clicar no botão "Parar Leitura"
document.getElementById("stop").addEventListener("click", function() {
  if (isScanning && html5QrCode) {
    html5QrCode.stop().then(() => {
      isScanning = false;
      console.log("Leitura parada.");
    }).catch(err => {
      console.error("Erro ao parar a leitura:", err);
    });
  }
});
