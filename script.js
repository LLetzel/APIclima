function neblina() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/neblina.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}
function sol() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/sun.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}

function chuvaleve() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/chuvaleve.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}

function banhodechuva() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/banhodechuva.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}

function nublado() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/nublado.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}

function nuvensseparadas() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/nuvensseparadas.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}

function neveleve() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/neve.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}

function tempestade() {
    var body = document.querySelector('body'); // Seleciona a tag body
    body.style.backgroundImage = 'url("./gif/tempestade.gif")'; // Define a imagem de fundo
    body.style.backgroundSize = "cover"; // Ajusta o tamanho da imagem para cobrir todo o fundo
    body.style.backgroundRepeat = "no-repeat"; // Evita que a imagem se repita
}

function primeiraLetraMaiuscula(str) { // Retorna a primeira letra da string em maiúscula e o restante da string
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById('formclima').addEventListener('submit', function (event) {

    // Previne o comportamento padrão do evento de submit
    event.preventDefault();
  
    // Obtém o valor da cidade digitada pelo usuário
    const city = document.getElementById('cityInput').value;
  
    // Faz uma requisição para a API de clima, passando a cidade como parâmetro
    fetch(`http://localhost:3000/climatempo/${city}`)
      .then(response => response.json()) // Converte a resposta para JSON
      .then(data => {
  
        // Obtém o elemento que irá mostrar o resultado da consulta
        const tempoResult = document.getElementById('climaResult');
  
        // Se a API retornar dados da cidade
        if (data.Temperatura) {
  
          // Exibe o nome da cidade com a primeira letra maiúscula
          document.getElementById('city').textContent = primeiraLetraMaiuscula(city);
  
          // Exibe a temperatura
          document.getElementById('temperatura').textContent = `${data.Temperatura}°C`;
  
          // Exibe a umidade
          document.getElementById('umidade').textContent = `${data.Umidade}%`;
  
          // Exibe a velocidade do vento
          document.getElementById('vento').textContent = `${data.VelocidadeDoVento}m/s`;
  
          // Exibe a descrição do clima
          document.getElementById('descricao').textContent = `${data.Clima}`;
  
          // Mostra o resultado da consulta
          document.getElementById('climaResult').style.display = 'flex';
          document.getElementById('descricao1').style.display = 'flex';
          document.getElementById('lupa').style.display = 'flex';
          document.getElementById('formclima').style.display = 'none';
  
          // Define os ícones para cada informação
          const temperaturaIcon = document.getElementById('temperaturaIcon');
          const umidadeIcon = document.getElementById('umidadeIcon');
          const ventoIcon = document.getElementById('ventoIcon');
          const descricaoIcon = document.getElementById('descricaoIcon');
  
          // Define a imagem de acordo com o clima
          if (data.Clima == 'ceu limpo') {
            sol();
          } else if (data.Clima == 'Nublado' || data.Clima == 'muitas nuvens') {
            nublado();
          } else if (data.Clima == 'nuvens separadas' || data.Clima == 'nuvens dispersas' || data.Clima == 'poucas nuvens' || data.Clima == 'Nuvens nubladas'){
            nuvensseparadas()
          } else if (data.Clima == 'leve chuva' || data.Clima == 'garoa leve' || data.Clima == 'chuvisco de baixa intensidade' || data.Clima == 'chuvisco' || data.Clima == 'chuva e garoa' || data.Clima == 'chuva leve') {
            chuvaleve();
          } else if (data.Clima == 'neblina' || data.Clima == 'fumaça' || data.Clima == 'névoa' || data.Clima == 'poeira' || data.Clima == 'areia' || data.Clima == 'ventania') {
            neblina();
          } else if (data.Clima == 'banho de chuva' || data.Clima == 'chuva media' || data.Clima == 'chuva moderada' || data.Clima == 'banho de chuva irregular' || data.Clima == 'chuvisco forte' || data.Clima == 'chuva forte com garoa' || data.Clima == 'chuvisco de alta intensidade') {
            banhodechuva();
                } else if (data.Clima == 'tempestade' || data.Clima == 'forte tempestade' || data.Clima == 'tempestade irregular' || data.Clima == 'trovoada com chuva fraca' || data.Clima == 'trovoada com chuva' || data.Clima == 'trovoada com chuva forte' || data.Clima == 'trovoada leve' || data.Clima == 'trovoada' || data.Clima == 'trovoada com leve garoa' || data.Clima == 'trovoada com garoa' || data.Clima == 'trovoada com forte garoa') {
                    tempestade();
                }

            } else {
                tempoResult.innerHTML = "Erro ao obter dados metereologicos";
            }
        })
        .catch((error) => console.error("Erro ao obter dados"));
});