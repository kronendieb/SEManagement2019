const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
//Parse the log file
const dataFile = fs.readFileSync("./log.json", "utf8");
const orderStream = fs.JSON.parse(dataFile);

let logStream = fs.createWriteStream("./log.json", {flags: "a"});
let app = express();

app.set("port", 80);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: logStream}));
 
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

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost/:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
