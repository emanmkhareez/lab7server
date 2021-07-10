'use strict'


const express =require('express')//npm i express

const DataWeather=require('./assets/weather.json')

const cors = require('cors');
const axios=require('axios')
//cros :origin recource sharing
//to give premission for who can sendme requst
 

// variable to store all method and proprites from express

let server=express()

server.use(cors());

require('dotenv').config(); // npm i dotenv

 // to solve conflict between react app and express server 
const PORT =process.env.PORT
// to recive requst 

server.listen(PORT,()=>{
    console.log(`listen on port ${PORT}`)
})
//http:localhost:3008/test
server.get('/test', async(req,res)=>{
    res.send('my server is work')
})





let array=[]
// create class 
class Forecast {
    constructor(description,date){
        this.description=description
        this.date=date

    
        array.push(this);
    }

}


// http:localhost:3008/weather?cityName=Seattle
server.get('/weather',(req,res)=>{
    console.log(req.query)
let searchQuery=req.query.cityName
let lon=req.query.lon
let lat=req.query.lat
let selectData=DataWeather.find((item)=>{
    if(item.city_name == searchQuery  )
    {

 
    return item

    }
})
    try{
for(let i=0;i<selectData.data.length;i++){
    new Forecast(selectData.data[i].weather.description,selectData.data[i].valid_date)


}



// console.log( array);
res.status(200).send( array)
    }
    catch{
        res.send('data not found ');

    }

})




// handel any error

server.get('*',(req,res)=>{
    res.status(500).send('the city not found')
})




