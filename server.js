var express = require ("express");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;
var app = express();
var methodOverride = require("method-override");

//serve static contnet for the app from public directory
app.use(express.static("public"));
//should this be the below
//app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));

//delete the below?
app.use (bodyParser.json());
//added below change 1 makes no difference that I can see
app.use(methodOverride("_method"));
//set handlebars
var exphbs = require("express-handlebars");


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//import routes
var routes = require("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("App listening at port: " + PORT);
});