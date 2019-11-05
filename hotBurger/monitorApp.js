const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const json = require("morgan-json");
const file = fs.readFileSync("./orderType.json", "utf8");

let logStream = fs.createWriteStream("./log.json", {flags: "a"});

const format = json({
	Date: ":date[web]",
	Method: ":method",
	Route: ":url",
	Status: ":status",
	Response: ":res[content-length]",
	Response_time: ":response-time ms"
});

const base = 10;
app.set("port", 8080);

app.use( 
	morgan(format, {stream: logStream})
);

app.get("/gettotal", function(req, res) {
	let total = 0;
	orders = JSON.parse(file);
	
	orders.forEach(item => {
		total += item.quantity * item.price;
	});
	
	res.send(`The total is: \$${total}`);
});
 
app.get("/gettopseller", function(req, res) {
	orders = JSON.parse(file);
	let topSeller = orders[0];
	
	orders.forEach(item => {
		if(item.quantity * item.price > topSeller.quantity * topSeller.price)
		{
				topSeller = item;
		}
	});	
	res.send(`${topSeller.name} sold ${topSeller.quantity}`);
});

app.get("/getrequestcount", function(req, res) {
	let count = 0;
	let logs = fs.createReadStream("./log.json")
	.on("data", (chunk)=>{
		for(i = 0; i < chunk.length; i++)
			if(chunk[i] == 10)
				count++;
	})
	.on("end", () => {
		res.send(`We have had ${count} requests`);
	});
});

app.get("/getlastrequeststatus", function(req, res) {
	const readLastLines = require("read-last-lines");
	readLastLines.read("./log.json", 1).then(line => {
		result = JSON.parse(line);
		res.send(`${result.Status}`)
	});
});

app.get("/getlastrequesttime", function(req, res) {
	const readLastLines = require("read-last-lines");
	readLastLines.read("./log.json", 1).then(line => {
		result = JSON.parse(line);
		res.send(`${result.Date}`)
	});
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
