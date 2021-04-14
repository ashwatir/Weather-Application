const express= require("express");
const https= require("https");
const bodyParser = require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req,res){
	res.sendFile(__dirname + "/index.html");
	
	// res.send("server is up.")
});

app.post("/", function(req,res){
	// console.log(req.body.cityName);
	const query=req.body.cityName;
	const apiKey="1f0c363da4ab5e493b3055eeb5aca54b";
	const unit="metric";

	const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apiKey+"";


	https.get(url,function(response){
		console.log(response.statusCode);

		response.on("data", function(data){
			const weatherdata = JSON.parse(data);
			const temp = weatherdata.main.temp
			const desc = weatherdata.weather[0].description
			const icon = weatherdata.weather[0].icon
			const imgUrl= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
			console.log(desc);
			console.log(temp);
			res.write("<h1>Temperature in "+query+" is " + temp + " degrees Celcius </h1>");
			res.write("<h2>The weather is currently "+desc+"</h2>");
			res.write("<img src="+imgUrl+">");
			res.send();
		})
	})

})






app.listen(3000,function(){
	console.log("server is running on port 3000");
})