// Função de callback para sucesso na leitura do QR Code
function onScanSuccess(decodedText, decodedResult) {
    // Expressão regular para validar um ID de 5 dígitos numéricos
    const regex = /^\d{5}$/;
    const idDetectado = decodedText.trim();  // 5 dígitos vindos do QR

    if (regex.test(idDetectado)) {
      // Se o QR lido contém um ID válido de 5 dígitos, redireciona para o questionário
      const questionarioUrl = "https://tally.so/r/nPPWo5?ID=" + encodeURIComponent(idDetectado);
      window.location.href = questionarioUrl;
    } else {
      console.error("QR Code lido não contém um ID válido de 5 dígitos:", decodedText);
    }
  }
  
  // Função para caso haja falha de leitura em algum frame
  function onScanFailure(error) {
    console.warn(`Erro temporário na leitura do QR: ${error}`);
  }
  
  //Largura do QR muda dependendo da largura da tela
  let largTela  = window.innerWidth
  let qrSize
  if (largTela > 542){
    qrSize = 500
  } else{
    qrSize = 300
  }
  document.getElementById("reader").style.width = qrSize + "px"

  // Inicia automaticamente o leitor de QR Code quando a página terminar de carregar
  window.addEventListener("DOMContentLoaded", () => {
    const html5QrCode = new Html5Qrcode("reader");
    
    // Configurações do leitor
    const configLeitor = {
      fps: 10,                // Frames por segundo
      qrbox: { width: qrSize, height: qrSize }, // Tamanho do quadrado de detecção
    };
    const cameraConfig = { facingMode: "environment" }; // Tenta usar câmera traseira
  
    // Inicia a leitura automaticamente
    html5QrCode.start(
      cameraConfig, 
      configLeitor,
      onScanSuccess,
      onScanFailure
    ).then(() => {
      console.log("Leitura de QR Code iniciada automaticamente.");
    }).catch((err) => {
      console.error("Erro ao iniciar o leitor de QR Code:", err);
    });
  });
  