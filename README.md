# bett-qr-platform

Este repositório contém o projeto desenvolvido para o evento Bett, cujo objetivo é automatizar o processo de check-in e coleta de respostas dos participantes através da leitura de QR Codes.

## Sobre o Projeto

O projeto é composto por:
- **Leitura de QR Code** dos participantes.
- **Redirecionamento automático** para um questionário no Typeform com o ID do participante.
- **Armazenamento automático** das respostas no Google Sheets.

## Fluxo do Sistema

1. O participante chega ao evento com um QR Code (impresso no crachá).
2. O sistema utiliza a câmera do dispositivo para ler o QR Code, extraindo um identificador único de 5 dígitos.
3. O participante é automaticamente redirecionado para o questionário no Typeform, já com o ID embutido na URL.
4. As respostas são coletadas pelo Typeform e automaticamente armazenadas em uma planilha do Google Sheets junto com o ID do participante.

## Tecnologias Utilizadas

- **Front-end**: HTML, CSS, JavaScript
- **Leitor de QR Code**: [html5-qrcode](https://github.com/mebjas/html5-qrcode)
- **Questionário**: [Typeform](https://www.typeform.com/)
- **Armazenamento das respostas**: Google Sheets
- **Hospedagem**: GitHub Pages

## Estrutura do Projeto

```
bett-qr-plataform/
│
├── index.html                # Página inicial com leitura do QR Code
├── js               
  ├── script.js                 # Lógica de leitura e redirecionamento
├── css
  ├── styles.css                # Estilos básicos da interface
├── assets               # imagens e outras mídias (caso necessário)
└── README.md                 # Documentação do projeto
```

