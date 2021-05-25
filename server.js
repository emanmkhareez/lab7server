'use strict'


const express=require('express')//library from js 
const weatherData=require('./assets/weather.json')
const server= express();//store all method && properties from express libraray
//require('dotenv').config(); // npm i dotenv
 //const cors = require('cors');



//const PORT = process.env.PORT;

const PORT=3009 // change  that to In order not to conflict with app react

//server.use(cors()); //  make my server opened for anyone
// will start listening to the requst 


console.log(weatherData);
// http://localhost:3009/weather?cityName=Seattle&lon=-122.33207&lat=47.60621
server.get('/weather', (req, res) => {
    console.log(req.query)
   
    let city= req.query.cityName
   let lon=req.query.lon
   let lat=req.query.lat

    let  city_names= weatherData.find(item => {
       
        if (item.city_name==city && item.lon==lon && item.lat==lat  )

        console.log(item.city_name);

            return item.city_name
    })
    res.send(city_names )
})


// / // http://localhost:3009/weather
//  server.get('/weather',(req,res)=>{
//      console.log(weather);
//      let pokeNames = weatherData.data.map(item=>{
//     return item.city_name;
//     })
//    res.send(pokeNames)
//  })


// // http://localhost:3001/
// server.get('/',(req,res)=>{
//     res.send('hallo  rout')

// })
// // http://localhost:3001/test

// //this respons to  requsrt http://localhost:3001/test
// server.get('/test',(req,res)=>{
//     res.send('test file')

// })
// //when recived req not found
// server.get('*',(req,res)=>{
//     res.status(404).send('not found');
// })
server.listen(PORT,()=>{    
    console.log(`listen on the port ${PORT}`);
})

