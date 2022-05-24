// const { on } = require("events");
// const { json } = require("express");
const express = require ("express");
const https = require("https");
const bodyparser=require("body-parser");
// const urlencoded = require("body-parser/lib/types/urlencoded");

const app = express();
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});

app.post("/",function(req,res){
    var query = req.body.cityname;
    var appid = "1b82076fd40991872b361a5f7683ec48";
    var unit = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appid+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
         var wdata = JSON.parse(data);
         var icon = wdata.weather[0].icon;
         var imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
         res.write("<style>body{background-color: #947EC3}</style>")
        res.write("<h1>The temperature in "+query+" is "+wdata.main.temp+"</h1>");
        res.write("<h3>The weather is currently "+wdata.weather[0].description+"</h3>")
        res.write("<img src="+imageurl+">");
        res.send();
        });
    });
});

app.listen(2998,function(){
    console.log("server is running");
});