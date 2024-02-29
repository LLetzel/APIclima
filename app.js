const express = require ('express');
const axios = require ('axios');
const path = require ('path');
const cors = require ('cors');
const config = require('./config.json');
const apikey = config.apikey;

const app = express();
app.listen(3000);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


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
    'clear sky': 'ceú limpo',
    'few clouds': 'Poucas nuvens',
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

    const city = req.params.cidade;
   

    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);

            if(response.status === 200){

                const clima = traducaoClima[response.data.weather[0].description] || response.data.weather[0].description;

                const weatherData = {
                    Temperatura: response.data.main.temp,
                    Umidade: response.data.main.humidity,
                    VelocidadeDoVento: response.data.wind.speed,
                    Clima: clima
                };

                res.send(weatherData)   
        } else {
                res.status(response.status).send({erro: 'Erro ao obter dados meteorológicos'})
        }

    } catch (error) {
        res.status(500).send({erro:'Erro ao obter dados metereológicos', error });
    }
})