const express = require ('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');
const config = require('./config.json')
const APIkey = config.APIkey;

const app = express()
app.listen(3000);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const traducaoClima = {
    "few clouds": "poucas nuvens",
    "scattered clouds": "Nuvens dispersas",
}

app.get('/climatempo/:cidade', async(req, res) => {
    const city = req.params.cidade;
    try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`)
        
        if(response.status === 200){
            const clima = traducaoClima[response.data.weather[0].description] || response.data.weather[0].description;

            const weatherData = {
                Temperatura: responde.data.main.temp,
                Umidade: responde.data.main.humidity,
                VelocidadeDoVento: response.data.main.speed,
                Clima: clima
            };

            res.send(weatherData);
    } else {
        res.status(response.status).send({erro:"Erro ao obter dados meteorológicos"})
    }
    //     return res.send({temperatura: response.data.main.temp})
    } catch (error) {
        res.status(500).send({erro:'Erro ao encontrar dados meteriológicos', error }) //error.message
});