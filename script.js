// Configurações
const MAX_RECENT_SEARCHES = 5; // Número máximo de pesquisas recentes para salvar

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
  body.classList.remove('sol-bg', 'nublado-bg', 'chuva-bg', 'tempestade-bg', 'neblina-bg', 'neve-bg');
  
  // Condicional para adicionar a classe correta baseada no clima
  if (clima.includes('ceu limpo') || clima.includes('ensolarado')) {
    body.classList.add('sol-bg');
    criarParticulas('sol');
  } else if (clima.includes('nublado') || clima.includes('muitas nuvens')) {
    body.classList.add('nublado-bg');
    criarParticulas('nublado');
  } else if (clima.includes('nuvens') || clima.includes('poucas nuvens') || clima.includes('dispersas')) {
    body.classList.add('nublado-bg');
    criarParticulas('nublado');
  } else if (clima.includes('chuva leve') || clima.includes('garoa') || clima.includes('chuvisco')) {
    body.classList.add('chuva-bg');
    criarParticulas('chuva');
  } else if (clima.includes('neblina') || clima.includes('fumaça') || clima.includes('névoa')) {
    body.classList.add('neblina-bg');
    criarParticulas('neblina');
  } else if (clima.includes('tempestade') || clima.includes('trovoada')) {
    body.classList.add('tempestade-bg');
    criarParticulas('tempestade');
    // Adicionar efeito de relâmpago com delay aleatório
    document.body.style.setProperty('--random-delay', Math.random() * 3);
  } else if (clima.includes('neve')) {
    body.classList.add('neve-bg');
    criarParticulas('neve');
  } else {
    // Default para clima não definido especificamente
    body.classList.add('sol-bg');
    criarParticulas('sol');
  }
}

// Função para criar partículas decorativas com base no tipo de clima
function criarParticulas(tipoClima) {
  // Limpar partículas anteriores
  const oldContainer = document.querySelector('.weather-particles');
  if (oldContainer) {
    oldContainer.remove();
  }
  
  const container = document.createElement('div');
  container.className = 'weather-particles';
  document.body.appendChild(container);
  
  // Configurar partículas de acordo com o tipo de clima
  let particlesCount, particleConfig;
  
  switch(tipoClima) {
    case 'sol':
      particlesCount = 12;
      particleConfig = {
        size: () => Math.random() * 15 + 10,
        opacity: () => Math.random() * 0.3 + 0.2,
        posX: () => Math.random() * 100,
        posY: () => Math.random() * 30 + 70,
        delay: () => Math.random() * 5
      };
      break;
    case 'nublado':
      particlesCount = 8;
      particleConfig = {
        size: () => Math.random() * 80 + 40,
        opacity: () => Math.random() * 0.2 + 0.1,
        posX: () => Math.random() * 120 - 20,
        posY: () => Math.random() * 40,
        delay: () => Math.random() * 8
      };
      break;
    case 'chuva':
      particlesCount = 60;
      particleConfig = {
        size: () => Math.random() * 2 + 1,
        height: () => Math.random() * 10 + 10,
        opacity: () => Math.random() * 0.4 + 0.6,
        posX: () => Math.random() * 100,
        posY: () => Math.random() * 20 - 20,
        delay: () => Math.random() * 2
      };
      break;
    case 'tempestade':
      particlesCount = 80;
      particleConfig = {
        size: () => Math.random() * 2 + 1,
        height: () => Math.random() * 15 + 15,
        opacity: () => Math.random() * 0.4 + 0.6,
        posX: () => Math.random() * 100,
        posY: () => Math.random() * 20 - 20,
        delay: () => Math.random() * 1.5
      };
      break;
    case 'neblina':
      particlesCount = 15;
      particleConfig = {
        size: () => Math.random() * 100 + 50,
        opacity: () => Math.random() * 0.1 + 0.05,
        posX: () => Math.random() * 120 - 20,
        posY: () => Math.random() * 60 + 20,
        delay: () => Math.random() * 10
      };
      break;
    case 'neve':
      particlesCount = 40;
      particleConfig = {
        size: () => Math.random() * 5 + 2,
        opacity: () => Math.random() * 0.6 + 0.4,
        posX: () => Math.random() * 100,
        posY: () => Math.random() * 20 - 20,
        delay: () => Math.random() * 5
      };
      break;
    default:
      particlesCount = 20;
      particleConfig = {
        size: () => Math.random() * 10 + 3,
        opacity: () => Math.random() * 0.5 + 0.2,
        posX: () => Math.random() * 100,
        posY: () => Math.random() * 100,
        delay: () => Math.random() * 3
      };
  }
  
  // Ajustar quantidade de partículas baseado no tamanho da tela
  particlesCount = Math.min(particlesCount, window.innerWidth / 10);
  
  // Criar partículas
  for (let i = 0; i < particlesCount; i++) {
    const particle = document.createElement('span');
    particle.className = 'weather-particle';
    
    // Configurações específicas para cada tipo de clima
    const size = particleConfig.size();
    const height = particleConfig.height ? particleConfig.height() : size;
    const opacity = particleConfig.opacity();
    const posX = particleConfig.posX();
    const posY = particleConfig.posY();
    const delay = particleConfig.delay();
    
    // Estilos da partícula
    particle.style.width = `${size}px`;
    particle.style.height = `${height || size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = opacity;
    
    // Definir animação apropriada para cada tipo de clima
    if (tipoClima === 'sol') {
      particle.style.animation = `sunParticles ${8 + Math.random() * 4}s linear infinite ${delay}s`;
    } else if (tipoClima === 'nublado') {
      particle.style.animation = `cloudParticles ${15 + Math.random() * 10}s linear infinite ${delay}s`;
    } else if (tipoClima === 'chuva') {
      particle.style.animation = `rainParticles ${1 + Math.random()}s linear infinite ${delay}s`;
    } else if (tipoClima === 'tempestade') {
      particle.style.animation = `stormParticles ${0.8 + Math.random() * 0.6}s linear infinite ${delay}s`;
    } else if (tipoClima === 'neblina') {
      particle.style.animation = `fogParticles ${20 + Math.random() * 15}s linear infinite ${delay}s`;
    } else if (tipoClima === 'neve') {
      particle.style.animation = `snowParticles ${8 + Math.random() * 6}s linear infinite ${delay}s`;
    }
    
    container.appendChild(particle);
  }
}

// Funções para gerenciar pesquisas recentes no localStorage
function salvarPesquisaRecente(cidade) {
  // Obter pesquisas existentes ou inicializar array vazio
  let pesquisasRecentes = obterPesquisasRecentes();
  
  // Remover duplicatas (se a cidade já existir na lista)
  pesquisasRecentes = pesquisasRecentes.filter(item => item.toLowerCase() !== cidade.toLowerCase());
  
  // Adicionar a nova cidade no início da lista
  pesquisasRecentes.unshift(cidade);
  
  // Limitar ao número máximo definido
  if (pesquisasRecentes.length > MAX_RECENT_SEARCHES) {
    pesquisasRecentes = pesquisasRecentes.slice(0, MAX_RECENT_SEARCHES);
  }
  
  // Salvar no localStorage
  localStorage.setItem('weatherNowRecentSearches', JSON.stringify(pesquisasRecentes));
  
  // Atualizar a interface
  mostrarPesquisasRecentes();
}

function obterPesquisasRecentes() {
  const pesquisas = localStorage.getItem('weatherNowRecentSearches');
  return pesquisas ? JSON.parse(pesquisas) : [];
}

function mostrarPesquisasRecentes() {
  const pesquisasRecentes = obterPesquisasRecentes();
  const container = document.getElementById('recentSearchesList');
  const recentSearchesElement = document.getElementById('recentSearches');
  
  // Limpar container
  container.innerHTML = '';
  
  // Esconder o elemento se não houver pesquisas recentes
  if (pesquisasRecentes.length === 0) {
    recentSearchesElement.style.display = 'none';
    return;
  }
  
  // Mostrar o elemento se houver pesquisas
  recentSearchesElement.style.display = 'block';
  
  // Adicionar cada item de pesquisa recente
  pesquisasRecentes.forEach(cidade => {
    const item = document.createElement('div');
    item.className = 'recent-search-item';
    item.innerHTML = `<i class="fas fa-history"></i>${cidade}`;
    
    // Adicionar evento de clique para buscar essa cidade
    item.addEventListener('click', () => {
      document.getElementById('cityInput').value = cidade;
      // Simular envio do formulário
      document.getElementById('formclima').dispatchEvent(new Event('submit'));
    });
    
    container.appendChild(item);
  });
}

// Função para animar transições entre telas
function transitionScreens(fromElement, toElement) {
  if (fromElement) {
    fromElement.classList.add('hiding');
    setTimeout(() => {
      fromElement.style.display = 'none';
      fromElement.classList.remove('hiding');
    }, 300);
  }
  
  setTimeout(() => {
    if (toElement) {
      toggleDisplay(toElement, 'flex');
      toElement.classList.add('showing');
      setTimeout(() => {
        toElement.classList.remove('showing');
      }, 500);
    }
  }, 300);
}

// Função para formatar primeira letra maiúscula
function primeiraLetraMaiuscula(str) {
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
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
  // Mapeamento de condições climáticas para ícones Weather Icons
  const iconesClima = {
    'ceu limpo': 'wi wi-day-sunny',
    'ensolarado': 'wi wi-day-sunny',
    'poucas nuvens': 'wi wi-day-cloudy',
    'nuvens dispersas': 'wi wi-cloud',
    'nuvens separadas': 'wi wi-cloudy',
    'muitas nuvens': 'wi wi-cloudy',
    'nublado': 'wi wi-cloudy',
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
  let iconeClima = iconesClima['default']; // Ícone padrão
  
  // Encontrar o ícone mais adequado
  for (const [condicao, icone] of Object.entries(iconesClima)) {
    if (clima.toLowerCase().includes(condicao)) {
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

// Implementação de sugestões de busca
function configurarSugestoesBusca() {
  const inputCidade = document.getElementById('cityInput');
  const suggestionsContainer = document.getElementById('suggestions');
  
  // Lista de cidades populares para sugestões
  const cidadesPopulares = [
    'São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 
    'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre',
    'Belém', 'Goiânia', 'Guarulhos', 'Campinas', 'Nova Iorque',
    'Tóquio', 'Londres', 'Paris', 'Pequim', 'Dubai', 'Sydney', 'Toronto',
    'Berlim', 'Roma', 'Madri', 'Lisboa', 'Amsterdam', 'Moscou'
  ];
  
  inputCidade.addEventListener('input', function() {
    const valor = this.value.trim().toLowerCase();
    suggestionsContainer.innerHTML = '';
    
    if (valor.length < 2) {
      suggestionsContainer.classList.remove('active');
      return;
    }
    
    // Filtrar as cidades que correspondem à entrada
    const sugestoes = cidadesPopulares.filter(cidade => 
      cidade.toLowerCase().includes(valor)
    ).slice(0, 5); // Limitar a 5 sugestões
    
    if (sugestoes.length === 0) {
      suggestionsContainer.classList.remove('active');
      return;
    }
    
    // Adicionar as sugestões filtradas
    sugestoes.forEach(cidade => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.textContent = cidade;
      
      item.addEventListener('click', () => {
        inputCidade.value = cidade;
        suggestionsContainer.classList.remove('active');
        // Focar no botão de busca após selecionar uma cidade
        document.querySelector('button[type="submit"]').focus();
      });
      
      suggestionsContainer.appendChild(item);
    });
    
    suggestionsContainer.classList.add('active');
  });
  
  // Fechar sugestões ao clicar fora
  document.addEventListener('click', function(e) {
    if (!inputCidade.contains(e.target) && !suggestionsContainer.contains(e.target)) {
      suggestionsContainer.classList.remove('active');
    }
  });
  
  // Navegação pelo teclado nas sugestões
  inputCidade.addEventListener('keydown', function(e) {
    const items = suggestionsContainer.querySelectorAll('.suggestion-item');
    
    if (!items.length) return;
    
    const activeItem = suggestionsContainer.querySelector('.suggestion-item:hover');
    let index = Array.from(items).indexOf(activeItem);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      index = (index + 1) % items.length;
      items[index].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      index = (index - 1 + items.length) % items.length;
      items[index].focus();
    } else if (e.key === 'Enter' && activeItem) {
      e.preventDefault();
      activeItem.click();
    } else if (e.key === 'Escape') {
      suggestionsContainer.classList.remove('active');
    }
  });
}

// Quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Configurar sugestões de busca
  configurarSugestoesBusca();
  
  // Mostrar pesquisas recentes salvas
  mostrarPesquisasRecentes();
  
  // Criar elementos de partículas para decoração
  criarParticulas('sol');
  
  // Configurar evento de formulário
  const formClima = document.getElementById('formclima');
  const resultadoClima = document.getElementById('climaResult');
  const backButton = document.getElementById('back-button');
  const segundaTela = document.querySelector('.segundaTela');
  const descricao1 = document.getElementById('descricao1');
  
  // Garantir que os elementos iniciem com a exibição correta
  toggleDisplay(resultadoClima, 'none');
  toggleDisplay(backButton, 'flex'); // Mudamos para flex, mas inicialmente escondido
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
    
    // API endpoint - assumindo que você está usando um servidor localhost
    // Você deve ajustar isso para sua API real
    const apiUrl = `http://localhost:3000/climatempo/${encodeURIComponent(city)}`;
    
    // Fazer requisição à API
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Cidade não encontrada');
        }
        return response.json();
      })
      .then(data => {
        if (data.Temperatura) {
          // Salvar na pesquisa recente
          salvarPesquisaRecente(primeiraLetraMaiuscula(city));
          
          // Preencher dados do clima
          document.getElementById('city').textContent = primeiraLetraMaiuscula(city);
          document.getElementById('temperatura').textContent = `${data.Temperatura}°C`;
          document.getElementById('umidade').textContent = `${data.Umidade}%`;
          document.getElementById('vento').textContent = `${data.VelocidadeDoVento}m/s`;
          document.getElementById('descricao').textContent = `${data.Clima}`;
          
          // Atualizar ícones baseados no clima
          atualizarIcones(data.Clima);
          
          // Usar transição animada entre telas
          transitionScreens(formClima, segundaTela);
          
          // Mostrar elementos de resultado com pequeno delay para animação
          setTimeout(() => {
            toggleDisplay(resultadoClima, 'flex');
            toggleDisplay(descricao1, 'flex');
            toggleDisplay(backButton, 'flex');
          }, 300);
          
          // Aplicar background com base no clima
          aplicarBackground(data.Clima);
          
        } else {
          alert('Erro ao obter dados meteorológicos');
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        
        // Vamos simular um resultado para fins de demonstração (remova em produção)
        if (error.message === 'Cidade não encontrada' || error.message.includes('Failed to fetch')) {
          console.log('Simulando dados meteorológicos para demonstração...');
          
          // Dados simulados para demonstração
          const climas = ['ceu limpo', 'poucas nuvens', 'nublado', 'chuva leve', 'tempestade', 'neblina', 'neve'];
          const climaSimulado = climas[Math.floor(Math.random() * climas.length)];
          
          // Salvar na pesquisa recente
          salvarPesquisaRecente(primeiraLetraMaiuscula(city));
          
          // Preencher dados simulados
          document.getElementById('city').textContent = primeiraLetraMaiuscula(city);
          document.getElementById('temperatura').textContent = `${Math.floor(Math.random() * 35) + 5}°C`;
          document.getElementById('umidade').textContent = `${Math.floor(Math.random() * 70) + 30}%`;
          document.getElementById('vento').textContent = `${(Math.random() * 8 + 1).toFixed(1)}m/s`;
          document.getElementById('descricao').textContent = climaSimulado;
          
          // Atualizar ícones baseados no clima
          atualizarIcones(climaSimulado);
          
          // Usar transição animada entre telas
          transitionScreens(formClima, segundaTela);
          
          // Mostrar elementos de resultado com pequeno delay para animação
          setTimeout(() => {
            toggleDisplay(resultadoClima, 'flex');
            toggleDisplay(descricao1, 'flex');
            toggleDisplay(backButton, 'flex');
          }, 300);
          
          // Aplicar background com base no clima
          aplicarBackground(climaSimulado);
        } else {
          alert('Erro ao buscar dados climáticos. Verifique o nome da cidade e tente novamente.');
        }
      })
      .finally(() => {
        removerLoading(); // Remover indicador de carregamento independentemente do resultado
      });
  });
  
  // Configurar botão de voltar
if (backButton) {
  backButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Usar transição animada para voltar à tela inicial
    transitionScreens(segundaTela, formClima);
    
    // Ocultar resultados após a transição
    setTimeout(() => {
      toggleDisplay(resultadoClima, 'none');
      toggleDisplay(descricao1, 'none');
      toggleDisplay(backButton, 'flex');
      
      // Garantir que o formulário seja exibido corretamente
      formClima.style.display = 'block';
    }, 300);
    
    // Atualizar pesquisas recentes ao voltar
    mostrarPesquisasRecentes();
  });
}
  
  // Verificar tamanho da tela e ajustar interface se necessário
  function checkScreenSize() {
    const isSmallScreen = window.innerWidth < 480;
    const containerElem = document.querySelector('.forminteiro');
    
    if (isSmallScreen) {
      containerElem.style.width = '100%';
      containerElem.style.maxWidth = '100%';
      containerElem.style.borderRadius = '1rem';
      containerElem.style.margin = '0';
    } else {
      containerElem.style.width = '';
      containerElem.style.maxWidth = '';
      containerElem.style.borderRadius = '';
      containerElem.style.margin = '';
    }
  }
  
  // Executar ao carregar e ao redimensionar
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});