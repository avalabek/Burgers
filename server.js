var express = require ("express");
var bodyParser = require("body-parser");
var methodOverride = require ("method-override");

var PORT = process.env.PORT || 3000;
var app = express();

//serve static contnet for the app from public directory
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: false}));
app.use (bodyParser.json());

//set handlebars
var exphbs = require ("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//import routes
var routes = require ("./controllers/burgers_controller.js");

app.use(routes);

app.listen(PORT, function(){
    console.log("App listening at port: "+ PORT);
});