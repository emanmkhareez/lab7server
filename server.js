'use strict'


const express=require('express')//library from js 
const weatherData=require('./assets/weather.json')
const server= express();//store all method && properties from express libraray
require('dotenv').config(); // npm i dotenv
 const cors = require('cors');






const PORT= process.env.PORT; // change  that to In order not to conflict with app react

server.use(cors()); //  make my server opened for anyone
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

            return  array
    })
    res.send(array)
    
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

//when recived req not found
server.get('*',(req,res)=>{
    res.status(404).send('not found');
})
// // when the sever not process the requst 
// server.get('*',(req,res)=>{
//     res.status(400).send("server cannot or will not process the request");


// })

// //the server encountered an unexpected condition that prevented it from fulfilling the request
// server.get('*',(req,res)=>{
//     res.status(500).send("the server encountered an unexpected condition that prevented it from fulfilling the request");


// })


let  array=[];
var today = new Date();
  var day = today.getDate();


server.listen(PORT,()=>{    
    console.log(`listen on the port ${PORT}`);
})

class  ForCast
{
    constructor(description,date){
    this.date=date
    this.description=description

    array.push(this);
};

   
  
    
}
let Amman=new ForCast("moonrise_ts: 1616530626   wind_cdir: SSW    pres: 1024.8334   " ,day)
let Paris=new ForCast (" moonrise_ts:  1616530626   wind_cdir: SSW    pres: 1024.8334   ",day)
let Seattle=new ForCast("  moonrise_ts:1618820363    wind_cdir: SSE pres: 1011.86 " ,day)

console.log(array);