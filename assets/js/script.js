// Recupera os elementos do carrossel
const slides = document.querySelectorAll('.slide');
const carrossel = document.querySelector('#carrossel');
const botaoEsquerda = document.querySelector('#botao-esquerda');
const botaoDireita = document.querySelector('#botao-direita');
const radios = document.querySelectorAll('input[name="radio-btn"]');
const botaoComprar = document.querySelectorAll('.botao-comprar');

// Define a quantidade de slides e o slide atual
// O slide atual começa em 0 pois é o primeiro
let slideAtual = 0;
const quantidadeSlides = slides.length;

// Função para atualizar a imagem do carrossel
function atualizaCarrossel() {
  carrossel.style.transform = `translateX(-${slideAtual * slides[0].offsetWidth}px)`;
}

// Adiciona um ouvinte de evento ao botão da esquerda
botaoEsquerda.addEventListener('click', () => {
  slideAtual = (slideAtual - 1 + quantidadeSlides) % quantidadeSlides;
  atualizaCarrossel();
  atualizaRadio();
});

// Adiciona um ouvinte de evento ao botão da direita
botaoDireita.addEventListener('click', () => {
  slideAtual = (slideAtual + 1) % quantidadeSlides;
  atualizaCarrossel();
  atualizaRadio();
});

// Adiciona um ouvinte de evento aos radios para alterar o slide
radios.forEach((radio, index) => {
  radio.addEventListener('click', () => {
    slideAtual = index;
    atualizaCarrossel();
  });
});

// Atualiza o radio que está marcado quando é trocado o slide
function atualizaRadio() {
  radios.forEach((radio, index) => {
    radio.checked = index === slideAtual;
  });
}

// Função para atualizar as imagens do carrossel
let intervaloTrocaAutomatica = setInterval(function () {
  slideAtual = (slideAtual + 1) % quantidadeSlides;
  atualizaCarrossel();
  atualizaRadio();
}, 3000);

// Adiciona um ouvinte de evento aos botões de compra
botaoComprar.forEach(function (botao) {
  botao.addEventListener('click', function () {
    // Pega o texto do produto
    const produto = this.parentNode.parentNode.querySelector("p").innerText;

    // Pega o preço do produto
    const preco = this.parentNode.querySelector("h3").innerText;

    // Monta a mensagem para o WhatsApp
    const mensagem = `Olá! Gostaria de comprar o seguinte produto:%0A${produto}%0APreço: ${preco}`;

    // Substitua o número de telefone abaixo pelo seu número de WhatsApp
    const numeroWhatsApp = "+55(77)991956143";

    // Monta o link do WhatsApp com a mensagem
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensagem
    )}`;

    // Redireciona para o link do WhatsApp
    window.location.href = linkWhatsApp;
  });
});
