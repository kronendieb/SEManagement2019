const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const json = require("morgan-json");

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
const time = 4000;
app.set("port", 80);

app.use(
    morgan(format, {stream: logStream})
);

app.get("/getcount/:item", (req, res) => {
    let file = fs.readFileSync("./availability.js", "utf8");
    avl = JSON.parse(file);
    var quantityAvl;

    avl.forEach(i => {
        if(i.name === req.params.item){
            quantityAvl = i.quantity;
        }
    });
    res.send(quantityAvl);
});

app.post("/setcount/:item/:quantity", (req, res) => {
    let file = fs.readFileSync("./availability.js", "utf8");
    avl = JSON.parse(file);
    var quantityAvl;

    avl.forEach(i => {
        if(i.name === req.params.item){
            i.quantity = parseInt(req.params.quantity, base);
        }
    });

});

function timedRequest(){
    var item = ""
    axios.post('localhost:80/purchase/')
}

setTimeout(timedRequest, time);

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
