const axios = require('axios')


module.exports=handlerWeather;

//https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=512d93f8440040748d9bef7f17425f32&lon=35.94503&lat=31.95522

// http:localhost:3008/weather?cityName=Amman&lon=35.94503&lat=31.95522


async function handlerWeather(req, res) {
    console.log(req.query)
    let searchQuery = req.query.cityName
    let lon=req.query.lon
    let lat=req.query.lat

    let selectData = {}
    let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}&days=1&lon=${lon}&lat=${lat}`
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


let array = []
// create class for weather 
class Forecast {
    constructor(item) {
        this.description = item.weather.description
        this.date = item.datetime


        array.push(this);
    }

}