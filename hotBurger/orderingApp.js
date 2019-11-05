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
 
app.get("/", (req, res) => {
	res.send("Welcome to HotBurger.");
});
 
app.get("/version", (req, res) => {
	res.send("This is version 1 of the HotBurger service");
});
 
app.get("/getmenu", (req, res) => {
	res.send("Hotdog: $20\nHamburger: $35 \nSoda: $4\nCookie: $6");
});

app.all("/purchase/:item/:quantity", (req, res) => {
	
	let file = fs.readFileSync("./orderType.json", "utf8");
	orders = JSON.parse(file);
	
	orders.forEach(i => {
		if(i.name === req.params.item){
			i.quantity += parseInt(req.params.quantity, base);
		}
	});
	
	fs.writeFileSync("./orderType.json", JSON.stringify(orders));
	
	//req.params.item;	gets an attribute of an item
	res.send(`Thanks for ordering ${req.params.quantity} ${req.params.item} `);
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
