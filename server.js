'use strict'


const express =require('express')//npm i express

const DataWeather=require('./assets/weather.json')

//cros :origin recource sharing
//to give premission for who can sendme requst
 
// const cors=require('cors')npm i cors

// server.use(cors());  make it open to any client

// variable to store all method and proprites from express

let server=express()

require('dotenv').config(); // npm i dotenv

 // to solve conflict between react app and express server 
const PORT =process.env.PORT
// to recive requst 

server.listen(PORT,()=>{
    console.log(`listen on port ${PORT}`)
})
//http:localhost:3008/test
server.get('/test',(req,res)=>{
    res.send('my server is work')
})




// http:localhost:3008/weather?cityName=Seattle&lon=-122.33207&lat=47.60621
server.get('/weather',(req,res)=>{
    console.log(req.query)
let cityName=req.query.cityName
let lon=req.query.lon
let lat=req.query.lat
let selectData=DataWeather.find((item)=>{
    if(item.city_name==cityName && item.lon==lon && item.lat==lat )
    {

 
    return item

    }
})
    
for(let i=0;i<selectData.data.length;i++){
    new Forecast(selectData.data[i].weather.description,selectData.data[i].valid_date)


}



// console.log( array);
res.status(200).send( array)

})



// handel any error

server.get('*',(req,res)=>{
    res.status(404).send('the city not found')
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
