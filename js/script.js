// Função de callback para sucesso na leitura do QR Code
async function onScanSuccess(decodedText /* string */, decodedResult) {
  let dados;

  // 1. Tenta converter o texto lido em JSON
  try {
    dados = JSON.parse(decodedText.trim());
  } catch (e) {
    console.error("QR Code não contém um JSON válido:", decodedText);
    return;                   // encerra se não for JSON
  }

  // 2. Validação mínima do objeto
  const esquemaValido =
    typeof dados.id   === "number" &&
    typeof dados.cid  === "number" &&
    typeof dados.s    === "string" && dados.s.trim() !== "" &&
    typeof dados.name === "string" && dados.name.trim() !== "";

  if (!esquemaValido) {
    console.error("JSON no QR está incompleto ou tem tipos incorretos:", dados);
    return;
  }

  // 3. Monta a URL do Tally com todos os parâmetros como Hidden Fields
  const params = new URLSearchParams({
    id:   dados.id,
    cid:  dados.cid,
    s:    dados.s,
    a:    dados.a,
    name: dados.name
  });

  const questionarioUrl = `https://tally.so/r/nPPWo5?${params.toString()}`;
  window.location.href = questionarioUrl;
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
  