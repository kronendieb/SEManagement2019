const express = require("express");
const morgan = require("morgan");
const fs = require("fs");

let logStream = fs.createWriteStream("./log.json", {flags: "a"});
let app = express();

app.set("port", 80);

app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream: logStream}));
 
app.get("/version", function(req, res) {
	res.send("This is version 1 of the HotBurger service");
});
 
app.get("/getmenu", function(req, res) {
	res.send("Hotdog: $20\nHamburger: $35\nSoda: $4 \nCookie: $6 ");
});

//	: variable
app.post("/purchase/:item/:quantity", function(req, res) {
	//req.params.item;	gets an attribute of an item
	res.send(`Thanks for ordering ${req.params.quantity} ${req.params.item} `);
});
 
app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost/:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
