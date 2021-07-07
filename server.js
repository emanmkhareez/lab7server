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




// lab 8

//Routs
server.get('/weather', handlerWeather)
server.get('/movies', handlrMovies);






let array = []
// create class for weather 
class Forecast {
    constructor(item) {
        this.description = item.weather.description
        this.date = item.datetime


        array.push(this);
    }

}
// let Moviesarray=[]
//movies class
class Movie {
    constructor(item) {
        this.title = item.title;
        this.overview = item.overview;
        this.average_votes = item.vote_average;

        this.total_votes = item.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
        this.popularity = item.popularity;
        this.released_on = item.release_date;
        //    Moviesarray.push(this)
    }
}

//https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=512d93f8440040748d9bef7f17425f32&lon=35.94503&lat=31.95522

// http:localhost:3008/weather?cityName=Amman&lon=35.94503&lat=31.95522
async function handlerWeather(req, res) {
    console.log(req.query)
    let searchQuery = req.query.cityName
    let lon=req.query.lon
    let lat=req.query.lat

    let selectData = {}
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}&days=5&lon=${lon}&lat=${lat}`
    axios
        .get(weatherUrl)
        .then(wheatherinfo => {

            selectData = wheatherinfo.data.data.map((item) => {
                return new Forecast(item)
            })
            console.log(selectData);
            res.send(selectData)
        })

}





// https://api.themoviedb.org/3/search/movie?api_key=bec06652a4cb9591d54fceb6bc996e54&query=Action

let moviesResult = []

//function Handlers

async function handlrMovies(req, res) {
    let city_name = req.query.city
    let urlMovies = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`

    axios
        .get(urlMovies)
        .then(moviesArr => {
            moviesResult = moviesArr.data.results.map(item => {
                return new Movie(item)
            })


            res.send(moviesResult)
        })

        .catch(error => {
            res.send(`No weather data for this City ${error}`);
        })


}


// handel any error

server.get('*', (req, res) => {
    res.status(500).send('the city not found')
})





