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


//https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=512d93f8440040748d9bef7f17425f32



let array = []
// create class for weather 
class Forecast {
    constructor(item) {
        this.description = item.weather.description
        this.date = item.datetime


        array.push(this);
    }

}
//movies class
class Movies {
    constructor(item){
       this.title=item.title;
       this.overview=item.overview;
       this.average_votes=item.average_votes;
       this.image_url=item.image_url;
       this.total_votes=item.total_votes;
       this.image_url=item.image_url;
       this.popularity=item.popularity;
       this.released_on=item.released_on;
    }
}

// http:localhost:3008/weather?cityName=Amman
server.get('/weather', (req, res) => {
    console.log(req.query)
    let searchQuery = req.query.cityName

    let selectData = {}
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`
    axios
        .get(weatherUrl)
        .then(wheatherinfo => {

            selectData = wheatherinfo.data.data.map((item) => {
               return new Forecast(item)})

             res.send(selectData) })

})


//movie Rots

// https://api.themoviedb.org/3/search/movie?api_key=bec06652a4cb9591d54fceb6bc996e54&query=Action

let  moviesResult=[]
// http:localhost:3008/movies?city=Amman
server.get('/movies',(req,res)=>{
    let city_name=req.query.city
    let urlMovies=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city_name}`

    axios
    .get(urlMovies)
    .then(moviesArr=>{moviesResult=moviesArr.data.results.map(item=>{
          return new Movies (item)   })
      
          
          res.send(moviesResult)  })

          .catch(error=>{
            res.send(`No weather data for this City ${error}`);
           })
})
       
        
    




// handel any error

server.get('*', (req, res) => {
    res.status(500).send('the city not found')
})





