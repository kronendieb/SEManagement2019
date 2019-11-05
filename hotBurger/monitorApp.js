const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const json = require("morgan-json");

let logStream = fs.createWriteStream("./log.json", {flags: "a"});
const format = json({
	Method: ":method",
	Route: ":url",
	Status: ":status",
	Response: ":res[content-length]",
	Response_time: ":response-time ms"
});

const base = 10;
app.set("port", 80);

app.use(
	morgan(format, {stream: logStream})
);

app.use((req, res, next) => {
	res.send();
	next();
});

app.get("/gettotal", function(req, res) {
	let count = 0;
	orderStream.forEach(item => {
		total += item.quantity*item.price;
		res.send(`${total}`);
	});
});
 
app.get("/gettopseller", function(req, res) {
	let topSeller = orders[0];
	let topSellerAmount = 0;
	orderStream.forEach(item => {
		if(item.quantity > topSellerAmount.quantity)
		{
				topSeller = item;
		}
		res.send({topSeller});
	});	
});

app.get("/getrequestcount", function(req, res) {
	res.send("");
});

app.get("/getlastrequeststatus", function(req, res) {
	
	res.send("");
});

app.get("/getlastrequesttime", function(req, res) {
	res.send("");
});

app.use((req, res, next) => {
	res.status(404);
	res.send("404 - Could not find.");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost/:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
