'use strict'


const express = require('express')//npm i express

const DataWeather = require('./assets/weather.json')

const cors = require('cors');
const axios = require('axios')
//cros :origin recource sharing
//to give premission for who can sendme requst


// variable to store all method and proprites from express

let server = express()

server.use(cors());

require('dotenv').config(); // npm i dotenv

// to solve conflict between react app and express server 
const PORT = process.env.PORT
// to recive requst 

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})
//http:localhost:3008/test
server.get('/test', async (req, res) => {
    res.send('my server is work')
})


//import handle
const handlrMovies=require('./modules/movies.js')
const handlerWeather=require('./modules/weather')


// lab 8

//Routs
server.get('/weather', handlerWeather)
server.get('/movies', handlrMovies);



// handel any error

server.get('*', (req, res) => {
    res.status(500).send('the city not found')
})





