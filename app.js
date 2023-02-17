const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));

const port = 4000;

app.get("/", (req,res)=> {
    res.sendFile(__dirname + "/index.html");    
});

app.post("/" , (req, res)=>{

    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=32f64913c27c2cec490c8a1c7e27ba57";

    https.get(url, (response)=>{
 
     response.on("data", (data)=>{
 
         const weatherData = JSON.parse(data);
 
         const description = weatherData.weather[0].description;
         const temperature = weatherData.main.temp;
 
         res.write("<h1> the weather has " + description + "</h1>");
         res.write("h1> the temperature is " + temperature + "</h1");
 
         res.send();
         
     });
 
    });     
 

});

app.listen(port, ()=>{
    console.log(`server is being loaded on port : ${port}`);
});