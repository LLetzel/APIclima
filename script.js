// Função para alternar a exibição de elementos
function toggleDisplay(element, displayStyle) {
  if (element) {
    element.style.display = displayStyle;
  }
}

// Função para aplicar backgrounds com base no clima
function aplicarBackground(clima) {
  const body = document.querySelector('body');
  
  // Remove todas as classes de background antigas
  body.classList.remove('sol-bg', 'nublado-bg', 'chuva-bg', 'tempestade-bg', 'neblina-bg');
  
  // Condicional para adicionar a classe correta baseada no clima
  if (clima.includes('ceu limpo')) {
    body.classList.add('sol-bg');
  } else if (clima.includes('nublado') || clima.includes('muitas nuvens')) {
    body.classList.add('nublado-bg');
  } else if (clima.includes('nuvens') || clima.includes('poucas nuvens') || clima.includes('dispersas')) {
    body.classList.add('nublado-bg');
  } else if (clima.includes('chuva leve') || clima.includes('garoa') || clima.includes('chuvisco')) {
    body.classList.add('chuva-bg');
  } else if (clima.includes('neblina') || clima.includes('fumaça') || clima.includes('névoa')) {
    body.classList.add('neblina-bg');
  } else if (clima.includes('tempestade') || clima.includes('trovoada')) {
    body.classList.add('tempestade-bg');
  } else {
    // Default para clima não definido especificamente
    body.classList.add('sol-bg');
  }
}

// Função para criar partículas decorativas
function criarParticulas() {
  const container = document.createElement('div');
  container.className = 'weather-particles';
  document.body.appendChild(container);
  
  // Aumentamos a quantidade e tamanho das partículas para torná-las mais visíveis
  const particlesCount = Math.min(50, window.innerWidth / 8);
  
  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement('span');
    particle.className = 'weather-particle';
    
    // Configurações randômicas para as partículas - aumentamos tamanho e opacidade
    const size = Math.random() * 10 + 3; // Partículas maiores
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 2;
    const duration = Math.random() * 5 + 3; // Duração mais longa
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = Math.random() * 0.5 + 0.5; // Mais opacas
    particle.style.animation = `floating ${duration}s linear infinite ${delay}s`;
    
    container.appendChild(particle);
  }
}

// Função para animar transições entre telas
function transitionScreens(fromElement, toElement) {
  if (fromElement) {
    fromElement.classList.add('hiding');
    fromElement.style.display = 'none';
  }
  
  setTimeout(() => {
    if (toElement) {
      toggleDisplay(toElement, 'flex');
      toElement.classList.add('showing');
    }
  }, 300);
}

// Função para formatar primeira letra maiúscula
function primeiraLetraMaiuscula(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Adicionar indicador de carregamento
function adicionarLoading() {
  // Verifica se já existe um loading
  let loading = document.querySelector('.loading');
  
  if (!loading) {
    loading = document.createElement('div');
    loading.className = 'loading';
    
    const loader = document.createElement('div');
    loader.className = 'loader';
    
    loading.appendChild(loader);
    document.querySelector('.forminteiro').appendChild(loading);
  }
  
  loading.style.display = 'flex';
}

function removerLoading() {
  const loading = document.querySelector('.loading');
  if (loading) {
    loading.style.display = 'none';
  }
}

// Função para atualizar ícones com base no clima
function atualizarIcones(clima) {
  // Mapeamento de condições climáticas para ícones Font Awesome Weather
  const iconesClima = {
    'ceu limpo': 'wi wi-day-sunny',
    'poucas nuvens': 'wi wi-day-cloudy',
    'nuvens dispersas': 'wi wi-cloud',
    'nuvens separadas': 'wi wi-cloudy',
    'muitas nuvens': 'wi wi-cloudy',
    'chuva leve': 'wi wi-day-rain',
    'chuvisco': 'wi wi-day-sprinkle',
    'chuva': 'wi wi-rain',
    'garoa': 'wi wi-sprinkle',
    'neblina': 'wi wi-fog',
    'névoa': 'wi wi-fog',
    'tempestade': 'wi wi-thunderstorm',
    'trovoada': 'wi wi-lightning',
    'neve': 'wi wi-snow',
    'banho de chuva': 'wi wi-showers',
    'default': 'wi wi-cloud'
  };

  // Escolher o ícone certo para o clima atual
  let iconeClima = 'wi wi-day-cloudy'; // Ícone padrão
  
  // Encontrar o ícone mais adequado
  for (const [condicao, icone] of Object.entries(iconesClima)) {
    if (clima.includes(condicao)) {
      iconeClima = icone;
      break;
    }
  }
  
  // Atualizar o ícone na interface
  const descricaoIconElement = document.getElementById('descricaoIcon');
  if (descricaoIconElement) {
    descricaoIconElement.className = iconeClima;
  }
}

// Quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Criar elementos de partículas para decoração
  criarParticulas();
  
  // Configurar evento de formulário
  const formClima = document.getElementById('formclima');
  const resultadoClima = document.getElementById('climaResult');
  const backButton = document.getElementById('back-button');
  const segundaTela = document.querySelector('.segundaTela');
  const descricao1 = document.getElementById('descricao1');
  
  // Garantir que os elementos iniciem com a exibição correta
  toggleDisplay(resultadoClima, 'none');
  toggleDisplay(backButton, 'none');
  toggleDisplay(segundaTela, 'none');
  toggleDisplay(descricao1, 'none');
  
  formClima.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Mostrar indicador de carregamento
    adicionarLoading();
    
    // Obter cidade digitada
    const city = document.getElementById('cityInput').value.trim();
    
    if (!city) {
      alert('Por favor, digite o nome de uma cidade');
      removerLoading();
      return;
    }
    
    // Fazer requisição à API
    fetch(`http://localhost:3000/climatempo/${encodeURIComponent(city)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Cidade não encontrada');
        }
        return response.json();
      })
      .then(data => {
        if (data.Temperatura) {
          // Preencher dados do clima
          document.getElementById('city').textContent = primeiraLetraMaiuscula(city);
          document.getElementById('temperatura').textContent = `${data.Temperatura}°C`;
          document.getElementById('umidade').textContent = `${data.Umidade}%`;
          document.getElementById('vento').textContent = `${data.VelocidadeDoVento}m/s`;
          document.getElementById('descricao').textContent = `${data.Clima}`;
          
          // Atualizar ícones baseados no clima
          atualizarIcones(data.Clima);
          
          // Esconder formulário
          formClima.style.display = 'none';
          
          // Mostrar elementos de resultado
          toggleDisplay(resultadoClima, 'flex');
          toggleDisplay(descricao1, 'flex');
          toggleDisplay(backButton, 'flex');
          toggleDisplay(segundaTela, 'flex');
          
          // Aplicar background com base no clima
          aplicarBackground(data.Clima);
        } else {
          alert('Erro ao obter dados meteorológicos');
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro ao buscar dados climáticos. Verifique o nome da cidade e tente novamente.');
      })
      .finally(() => {
        removerLoading(); // Remover indicador de carregamento independentemente do resultado
      });
  });
  
  // Configurar botão de voltar
  if (backButton) {
    backButton.addEventListener('click', function(event) {
      event.preventDefault();
      
      // Ocultar resultados
      toggleDisplay(resultadoClima, 'none');
      toggleDisplay(descricao1, 'none');
      toggleDisplay(backButton, 'none');
      toggleDisplay(segundaTela, 'none');
      
      // Mostrar formulário de busca
      toggleDisplay(formClima, 'block');
      
      // Resetar o formulário
      formClima.reset();
      
      // Resetar background
      document.body.className = '';
    });
  }
});