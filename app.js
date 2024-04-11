// Importando módulos
const express = require('express'); // Cria servidores web
const axios = require('axios'); // Faz requisições HTTP
const path = require('path'); // Trabalha com caminhos de arquivos
const cors = require('cors'); // Permite acesso à API de diferentes origens
const config = require('./config.json'); // Contém a chave da API do OpenWeatherMap

// API key do OpenWeatherMap
const apikey = config.apikey;

// Configurando servidor Express
const app = express();
app.listen(3000); // Porta 3000

// Habilitando CORS
app.use(cors());

// Permitindo recebimento de JSON
app.use(express.json());

// Servindo arquivos estáticos da pasta `public`
app.use(express.static(path.join(__dirname, 'public')));

// Dicionário de tradução de clima
const traducaoClima= {
    'thunderstorm with light rain': 'trovoada com chuva fraca',
    'thunderstorm with rain': 'trovoada com chuva',
    'thunderstorm with heavy rain': 'trovoada com chuva forte',
    'light thunderstorm': 'trovoada leve',
    'thunderstorm': 'trovoada',
    'heavy thunderstorm': 'forte tempestade',
    'ragged thunderstorm': 'tempestade irregular',
    'thunderstorm with light drizzle': 'trovoada com leve garoa',
    'thunderstorm with drizzle': 'trovoada com garoa',
    'thunderstorm with heavy drizzle': 'trovoada com forte garoa',
    'light intensity drizzle': 'chuvisco de baixa intensidade',
    'drizzle': 'chuvisco',
    'heavy intensity drizzle': 'chuvisco de forte intensidade',
    'light intensity drizzle rain': 'chuvisco de baixa intensidade com chuva',
    'drizzle rain': 'chuvisco exponencial',
    'heavy intensity drizzle rain': 'chuva forte com garoa',
    'shower rain and drizzle': 'chuva e garoa',
    'shower drizzle': 'chuvisco forte',
    'light rain': 'chuva leve',
    'clear sky': 'ceu limpo',
    'few clouds': 'poucas nuvens',
    'scattered clouds': 'nuvens dispersas',
    'broken clouds': 'nuvens separadas',
    'overcast clouds': 'muitas nuvens',  
    'moderate rain': 'chuva moderada',
    'heavy intensity rain': 'chuva de forte intensidade',
    'very heavy rain': 'chuva muito forte',
    'extreme rain': 'chuva extrema',
    'freezing rain': 'chuva congelante',
    'light intensity shower rain': 'banho de chuva de fraca intensidade',
    'shower rain': 'banho de chuva',
    'heavy intensity shower rain': 'banho de chuva de intensidade pesada',
    'ragged shower rain': 'banho de chuva irregular',
    'light snow': 'leve neve',
    'snow': 'neve',
    'heavy snow': 'neve pesada',
    'sleet': 'granizo',
    'light shower sleet': 'neve com granizo leve',
    'shower sleet': 'neve com granizo',
    'light rain and snow': 'chuva fraca e neve',
    'rain and snow': 'chuva e chuva',
    'light shower snow': 'chuva leve de neve',
    'shower snow': 'chuva de neve',
    'heavy shower snow': 'forte chuva de neve',
    'mist': 'névoa',
    'smoke': 'fumaça',
    'haze': 'neblina',
    'sand/dust whirls': 'redemoinhos de areia/poeira',
    'fog': 'névoa',
    'sand': 'areia',
    'dust': 'poeira',
    'volcanic ash': 'cinza vulcanica',
    'squalls': 'ventania',
    'tornado': 'tornado'
}

app.get('/climatempo/:cidade', async (req, res) => {

    // Obtém o nome da cidade da URL
    const city = req.params.cidade;
  
    // Requisição para a API do OpenWeatherMap
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
  
      // Se a requisição for bem-sucedida
      if (response.status === 200) {
  
        // Obtém a descrição do clima em inglês
        const climaEmIngles = response.data.weather[0].description;
  
        // Traduz a descrição do clima para português
        const clima = traducaoClima[climaEmIngles] || climaEmIngles;
  
        // Cria um objeto com os dados meteorológicos
        const weatherData = {
          Temperatura: response.data.main.temp,
          Umidade: response.data.main.humidity,
          VelocidadeDoVento: response.data.wind.speed,
          Clima: clima
        };
  
        // Envia os dados meteorológicos como resposta
        res.send(weatherData);
  
      } else {
  
        // Envia um erro com o código de status
        res.status(response.status).send({ erro: 'Erro ao obter dados meteorológicos' });
  
      }
    } catch (error) {
  
      // Envia um erro genérico
      res.status(500).send({ erro: 'Erro ao obter dados meteorológicos', error });
  
    }
  });